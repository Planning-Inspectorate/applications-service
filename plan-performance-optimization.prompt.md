## Plan: Applications Service Performance Optimization

This service experiences slow page loads due to multiple factors across the Express web and API layers, database access via Prisma/Azure SQL, session management with Redis, and frontend API communication. The plan identifies key performance bottlenecks and outlines diagnostic and remediation steps.

### Steps

1. **Profile and benchmark slow endpoints** - Add timing middleware in [app.js](packages/forms-web-app/src/app.js) and [api/app.js](packages/applications-service-api/src/app.js) to log request durations; use Azure Application Insights or custom logging to identify the slowest routes.

2. **Optimize Prisma database queries** - Review repositories like [project.backoffice.repository.js](packages/applications-service-api/src/repositories/project.backoffice.repository.js) and [document.backoffice.repository.js](packages/applications-service-api/src/repositories/document.backoffice.repository.js) for N+1 queries, excessive `contains` filters (string LIKE operations), and missing database indexes in [schema.prisma](packages/applications-service-api/prisma/schema.prisma).

3. **Add missing database indexes** - The Prisma schema has limited `@@index` declarations; add indexes on frequently queried/filtered columns (`stage`, `datePublished`, `publishStatus`, `applicantId`, `representationType`) to speed up `findMany` and search operations.

4. **Implement API response caching** - Add Redis or in-memory caching for frequently-accessed, slow-changing data (project lists, timetables, filters) in the web app's [application-api-wrapper.js](packages/forms-web-app/src/lib/application-api-wrapper.js) or API controller layer.

5. **Optimize session store configuration** - Review Redis session settings in [session.js](packages/forms-web-app/src/lib/session.js); ensure connection pooling, appropriate TTLs, and verify `pingInterval` isn't causing overhead.

6. **Reduce frontend payload sizes** - Audit API responses to return only necessary fields using Prisma `select` instead of full model retrieval; enable compression (already present) and consider pagination limits in document/representation queries.

---

## Database Query Analysis

### Critical Performance Issues Identified

#### 1. Excessive `contains` Filters (SQL LIKE '%term%')

The following repositories use `contains` filters which translate to `LIKE '%term%'` in SQL. These **cannot use indexes** and cause full table scans:

| Repository                                                                                                                            | Function                      | Fields Searched                                                                                                     | Severity   |
| ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------- | ---------- |
| [project.backoffice.repository.js](packages/applications-service-api/src/repositories/project.backoffice.repository.js)               | `getAllApplications`          | `projectName`, `projectNameWelsh`, `caseReference`, `applicant.organisationName`, `regions`, `sector`               | **HIGH**   |
| [document.backoffice.repository.js](packages/applications-service-api/src/repositories/document.backoffice.repository.js)             | `getDocuments`                | `description`, `descriptionWelsh`, `author`, `authorWelsh`, `representative`                                        | **HIGH**   |
| [representation.backoffice.repository.js](packages/applications-service-api/src/repositories/representation.backoffice.repository.js) | `getRepresentations`          | `representationComment`, `representative.organisationName`, `represented.organisationName`, `firstName`, `lastName` | **HIGH**   |
| [advice.backoffice.repository.js](packages/applications-service-api/src/repositories/advice.backoffice.repository.js)                 | `getAllAdviceByCaseReference` | `from`, `agent`, `enquiryDetails`, `enquiryDetailsWelsh`, `adviceDetails`, `adviceDetailsWelsh`                     | **MEDIUM** |

**Example problematic code** (`project.backoffice.repository.js` lines 59-79):

```javascript
if (searchTerm) {
	where['AND'].push({
		OR: [
			{ caseReference: { contains: options.searchTerm } },
			{ AND: terms.map((term) => ({ projectName: { contains: term } })) },
			{ AND: terms.map((term) => ({ projectNameWelsh: { contains: term } })) },
			{ AND: terms.map((term) => ({ applicant: { organisationName: { contains: term } } })) }
		]
	});
}
```

#### 2. Dual Query Pattern (findMany + count)

Every paginated query runs **two separate database calls**:

- `prismaClient.*.findMany(...)` - fetches data
- `prismaClient.*.count(...)` - fetches total count

This doubles database round-trips. Found in:

- `project.backoffice.repository.js` lines 127-128
- `document.backoffice.repository.js` lines 113-118
- `representation.backoffice.repository.js` lines 92-102
- `advice.backoffice.repository.js` lines 68-69

#### 3. Missing Database Indexes

Current indexes in [schema.prisma](packages/applications-service-api/prisma/schema.prisma):
| Model | Indexed Fields |
|-------|----------------|
| Document | `caseRef`, `representationId` |
| Representation | `caseReference` |
| ProjectUpdate | `caseReference` |
| ExaminationTimetable | `caseReference` |

**Missing indexes needed for common query patterns:**

| Model          | Column                | Reason                                                            |
| -------------- | --------------------- | ----------------------------------------------------------------- |
| Project        | `publishStatus`       | Filtered on every query (`publishStatus: 'published'`)            |
| Project        | `stage`               | Used in filters                                                   |
| Project        | `sector`              | Used in filters                                                   |
| Project        | `dateOfDCOSubmission` | Used in `excludeNullDateOfSubmission` filter                      |
| Project        | `applicantId`         | Foreign key, used in joins                                        |
| Document       | `stage`               | Filtered and grouped frequently                                   |
| Document       | `datePublished`       | Ordered by in every document query                                |
| Document       | `documentType`        | Used in `getDocumentsByType`                                      |
| Representation | `status`              | Filtered on every query (`status: in ['PUBLISHED', 'published']`) |
| Representation | `representationType`  | Used in filters and groupBy                                       |
| Representation | `dateReceived`        | Ordered by in queries                                             |
| Advice         | `caseReference`       | Filtered in `getAllAdviceByCaseReference`                         |
| Advice         | `caseId`              | Foreign key to Project                                            |

#### 4. Inefficient Related Entity Loading

**N+1 Query Risk** in `representation.backoffice.repository.js`:

```javascript
include: {
    represented: true,
    representative: true
}
```

This loads full `ServiceUser` records. If ServiceUser table is large, this adds overhead. Consider using `select` to fetch only needed fields.

#### 5. ExaminationTimetable Sub-query with `contains`

In `project.backoffice.repository.js` lines 111-118:

```javascript
ExaminationTimetable: {
    where: {
        OR: [
            { description: { contains: 'duty to complete' } },
            { type: 'Deadline For Close Of Examination' }
        ]
    },
    orderBy: { date: 'desc' }
}
```

The `description: { contains: 'duty to complete' }` performs a LIKE search on NText field for every included project.

---

### Recommended Fixes

#### Immediate (Index Additions)

Add to `schema.prisma`:

```prisma
model Project {
    // ...existing fields...
    @@index([publishStatus])
    @@index([stage])
    @@index([sector])
    @@index([dateOfDCOSubmission])
    @@index([applicantId])
}

model Document {
    // ...existing fields...
    @@index([stage])
    @@index([datePublished])
    @@index([documentType])
}

model Representation {
    // ...existing fields...
    @@index([status])
    @@index([representationType])
    @@index([dateReceived])
}

model Advice {
    // ...existing fields...
    @@index([caseReference])
    @@index([caseId])
}
```

#### Short-term (Query Optimization)

1. **Replace dual queries with `$transaction`** for atomic count+data:

```javascript
const [applications, count] = await prismaClient.$transaction([
	prismaClient.project.findMany(findOptions),
	prismaClient.project.count({ where })
]);
```

2. **Use `select` instead of full model retrieval** where possible:

```javascript
include: {
    applicant: {
        select: { organisationName: true, firstName: true, lastName: true }
    }
}
```

3. **Cache filter aggregations** (getFilters functions) - these rarely change.

#### Medium-term (Search Infrastructure)

1. **Implement Azure SQL Full-Text Search** for text fields:

   - Create full-text catalog and indexes on `description`, `projectName`, `representationComment`
   - Use raw SQL queries with `CONTAINS()` or `FREETEXT()` predicates

2. **Consider Elasticsearch/Azure Cognitive Search** for complex multi-field search scenarios.

3. **Enable Prisma query logging in production temporarily** to identify slowest queries:

```javascript
// In prisma.js - already conditionally enabled for non-production
const logOption = isProduction
	? [{ emit: 'event', level: 'query' }, 'warn', 'error'] // Add query logging
	: [{ emit: 'event', level: 'query' }, 'info', 'warn', 'error'];
```

---

## API Over-Fetching Analysis

The API retrieves full database records but the frontend only uses a subset of fields. This wastes database I/O, network bandwidth, and memory.

### Representation Model

**Database fields fetched** (via `include: { represented: true, representative: true }`):

| Model                        | Fields Fetched                                                                                                                                                                                                                                                    | Count         |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Representation               | `id`, `representationId`, `caseReference`, `caseId`, `referenceId`, `status`, `dateReceived`, `representationComment`, `representationFrom`, `representationType`, `registerFor`, `representedId`, `representativeId`, `attachmentIds`, `createdAt`, `modifiedAt` | 16            |
| ServiceUser (represented)    | `id`, `serviceUserId`, `caseReference`, `firstName`, `lastName`, `email`, `webAddress`, `phoneNumber`, `organisationName`, `role`, `serviceUserType`, `createdAt`, `modifiedAt`                                                                                   | 13            |
| ServiceUser (representative) | Same as above                                                                                                                                                                                                                                                     | 13            |
| **Total**                    |                                                                                                                                                                                                                                                                   | **42 fields** |

**Frontend fields actually used** ([get-representations-view-model.js](packages/forms-web-app/src/pages/projects/representations/index/_utils/get-representations-view-model.js)):

- `representationId` (ID)
- `caseReference` (CaseReference)
- `referenceId` (UniqueReference)
- `dateReceived` (DateRrepReceived)
- `representationComment` (RepresentationRedacted)
- `representationType` (RepFrom)
- `attachmentIds` (Attachments)
- `represented.firstName`, `represented.lastName`, `represented.organisationName`
- `representative.firstName`, `representative.lastName`, `representative.organisationName`

**Fields needed: 13 | Fields fetched: 42 | Over-fetch ratio: 3.2x**

**Recommended fix** in [representation.backoffice.repository.js](packages/applications-service-api/src/repositories/representation.backoffice.repository.js):

```javascript
// Replace:
include: {
    represented: true,
    representative: true
}

// With:
include: {
    represented: {
        select: { firstName: true, lastName: true, organisationName: true }
    },
    representative: {
        select: { firstName: true, lastName: true, organisationName: true }
    }
}
```

### Document Model

**Database fields fetched** (full Document model):

| Field                    | Used in Frontend          |
| ------------------------ | ------------------------- |
| `id`                     | ❌                        |
| `documentId`             | ❌                        |
| `caseId`                 | ❌                        |
| `caseRef`                | ✅ (case_reference)       |
| `representationId`       | ❌                        |
| `documentReference`      | ✅ (dataID, docReference) |
| `version`                | ❌                        |
| `examinationRefNo`       | ❌                        |
| `filename`               | ❌                        |
| `originalFilename`       | ❌                        |
| `size`                   | ✅                        |
| `mime`                   | ✅                        |
| `documentURI`            | ❌                        |
| `publishedDocumentURI`   | ✅ (path)                 |
| `virusCheckStatus`       | ❌                        |
| `fileMD5`                | ❌                        |
| `dateCreated`            | ✅                        |
| `lastModified`           | ✅                        |
| `caseType`               | ❌                        |
| `documentStatus`         | ❌                        |
| `redactedStatus`         | ❌                        |
| `publishedStatus`        | ❌                        |
| `datePublished`          | ✅                        |
| `documentType`           | ✅ (type)                 |
| `securityClassification` | ❌                        |
| `sourceSystem`           | ❌                        |
| `origin`                 | ❌                        |
| `owner`                  | ❌                        |
| `author`                 | ✅                        |
| `authorWelsh`            | ✅                        |
| `representative`         | ✅                        |
| `description`            | ✅                        |
| `descriptionWelsh`       | ✅                        |
| `stage`                  | ✅                        |
| `filter1`                | ✅                        |
| `filter1Welsh`           | ✅                        |
| `filter2`                | ✅                        |
| `createdAt`              | ✅                        |
| `modifiedAt`             | ✅                        |

**Fields needed: 19 | Fields fetched: 38 | Over-fetch ratio: 2x**

**Recommended fix** in [document.backoffice.repository.js](packages/applications-service-api/src/repositories/document.backoffice.repository.js):

```javascript
// Add select clause to getDocuments:
const rows = await prismaClient.document.findMany({
    where: whereClause,
    select: {
        caseRef: true,
        documentReference: true,
        size: true,
        mime: true,
        publishedDocumentURI: true,
        datePublished: true,
        documentType: true,
        author: true,
        authorWelsh: true,
        representative: true,
        description: true,
        descriptionWelsh: true,
        stage: true,
        filter1: true,
        filter1Welsh: true,
        filter2: true,
        createdAt: true,
        modifiedAt: true
    },
    skip: ...,
    take: ...,
    orderBy: ...
});
```

### Project/Application Model

**Database fields fetched**: Full Project model (50+ fields) + full ServiceUser applicant (13 fields)

**Frontend fields used** (from [application.mapper.js](packages/applications-service-api/src/utils/application.mapper.js) `mapBackOfficeApplicationToApi`):

- Core: `caseReference`, `projectName`, `projectNameWelsh`, `projectType`, `projectDescription`, `projectDescriptionWelsh`, `projectLocation`, `projectLocationWelsh`, `projectEmailAddress`
- Location: `easting`, `northing`, `mapZoomLevel`, `regions`
- Stage: `stage`, `sector`
- Dates: 20+ date fields
- Applicant: `organisationName`, `firstName`, `lastName`, `phoneNumber`, `email`, `webAddress`

**For list views** (getAllApplications), most date fields are not displayed but still fetched.

**Recommended fix** - Create separate queries for list vs. detail views:

```javascript
// List view - minimal fields
const listSelect = {
	caseReference: true,
	projectName: true,
	projectNameWelsh: true,
	stage: true,
	sector: true,
	regions: true,
	dateOfDCOSubmission: true,
	confirmedDateOfDecision: true,
	applicant: {
		select: { organisationName: true }
	}
};

// Detail view - full fields (current behavior)
```

### Summary of Over-Fetching Issues

| Endpoint                 | Fields Fetched | Fields Used | Over-fetch Ratio | Impact                          |
| ------------------------ | -------------- | ----------- | ---------------- | ------------------------------- |
| GET /representations     | 42             | 13          | 3.2x             | HIGH - large NText fields       |
| GET /documents           | 38             | 19          | 2x               | HIGH - NText description fields |
| GET /applications (list) | 63+            | ~15         | 4x+              | MEDIUM - many date fields       |
| GET /applications/:id    | 63+            | 40+         | 1.5x             | LOW - detail view needs most    |

### Payload Size Estimates

Assuming average field sizes:

- NText fields (description, representationComment): ~2KB each
- String fields: ~50 bytes each
- Date fields: ~25 bytes each

**Per representation record:**

- Current: ~4.5KB (with full ServiceUser × 2)
- Optimized: ~2.5KB
- **Savings: 44%**

**Per document record:**

- Current: ~5KB (with NText descriptions)
- Optimized: ~3KB (still need descriptions for display)
- **Savings: 40%**

**For a page of 25 representations:**

- Current: ~112KB
- Optimized: ~62KB
- **Savings: 50KB per page load**

---

### Further Considerations

1. **Are you experiencing slow cold starts?** Consider adding connection pooling via PgBouncer/Azure SQL connection pool settings, or investigate Prisma connection pool configuration (`connection_limit` in DATABASE_URL).

2. **Should we add query logging to production?** Enable Prisma query event logging (as in [prisma.js](packages/applications-service-api/src/lib/prisma.js)) temporarily to identify slow SQL queries and missing indexes.

3. **Is full-text search needed?** The `contains` filter pattern in search operations (e.g., document descriptions, project names) maps to SQL `LIKE '%term%'` which cannot use indexes - consider Azure SQL Full-Text Search or Elasticsearch.
