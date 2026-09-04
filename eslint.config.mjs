import { defineConfig, globalIgnores } from 'eslint/config';
import { eslintConfig } from '@planning-inspectorate/coding-standards';
import jest from 'eslint-plugin-jest';
import globals from 'globals';

export default defineConfig([
	...eslintConfig,
	globalIgnores([
		'packages/applications-service-api/prisma/client/**/*.js',
		'packages/back-office-subscribers/lib/prisma-client/**/*.js',
		'packages/e2e_tests/**/*.js',
		'webpack.**',
		'packages/forms-web-app/src/public/scripts/*'
	]),
	{
		files: [
			'**/*.test.js',
			'**/__tests__/**/*.js',
			'packages/common/src/functional.spec.js',
			'packages/forms-web-app/src/pages/examination/process-submission/utils/testHelper.js'
		],
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest
			}
		},
		plugins: {
			jest
		}
	},
	{
		files: ['packages/forms-web-app/src/scripts/**/*.js'],
		languageOptions: {
			globals: {
				...globals.browser
			}
		}
	},
	{
		files: [
			// allow these special folder names
			'**/__{data,test,tests,mocks}__/**/*.{ts,js}',
			'**/_{common,fixtures,mocks,middleware,services,session,translations,utils,validators}/**/*.{ts,js}',
			'packages/forms-web-app/.jest/*.{ts,js}'
		],
		rules: {
			'check-file/folder-naming-convention': 'off'
		}
	},
	{
		files: [
			// allow existing camelCase or non-compliant files names
			'packages/applications-service-api/__tests__/__data__/interestedParty.js',
			'packages/applications-service-api/__tests__/__data__/projectUpdates.js',
			'packages/applications-service-api/__tests__/__data__/serviceUser.js',
			'packages/applications-service-api/src/database/test/test_connection.js',
			'packages/applications-service-api/src/error/apiError.js',
			'packages/applications-service-api/src/lib/blobStorage.js',
			'packages/applications-service-api/src/lib/eventClient.js',
			'packages/applications-service-api/src/middleware/apiErrorHandler.js',
			'packages/applications-service-api/src/middleware/fileUploadLimitHandler.js',
			'packages/applications-service-api/src/middleware/normaliseRequestFileData.js',
			'packages/applications-service-api/src/middleware/parseFormDataProperties.js',
			'packages/applications-service-api/src/middleware/parseParamProperties.js',
			'packages/applications-service-api/src/repositories/interestedParty.ni.repository.js',
			'packages/applications-service-api/src/repositories/projectUpdate.repository.js',
			'packages/applications-service-api/src/services/interestedParty.ni.service.js',
			'packages/applications-service-api/src/services/interestedParty.service.js',
			'packages/applications-service-api/src/utils/interestedParty.mapper.js',
			'packages/applications-service-api/src/utils/mapLocation.js',
			'packages/forms-web-app/__tests__/setupTests.js',
			'packages/forms-web-app/src/controllers/utils/queryMode.js',
			'packages/forms-web-app/src/pages/examination/_session/deadlineItems-session.js',
			'packages/forms-web-app/src/pages/examination/_utils/file-upload/fileManagement.js',
			'packages/forms-web-app/src/pages/examination/_utils/file-upload/fileSessionManagement.js',
			'packages/forms-web-app/src/pages/examination/add-another-deadline-item/utils/hasMoreDeadlineItemsToSubmit.js',
			'packages/forms-web-app/src/pages/examination/add-another-deadline-item/utils/mapSubmissionItems.js',
			'packages/forms-web-app/src/pages/examination/personal-information-which/utils/getOptions.js',
			'packages/forms-web-app/src/pages/examination/personal-information-which/utils/getPageData.js',
			'packages/forms-web-app/src/pages/examination/personal-information-which/utils/savePersonalInformationFlags.js',
			'packages/forms-web-app/src/pages/examination/process-submission/utils/fromDataMappers.js',
			'packages/forms-web-app/src/pages/examination/process-submission/utils/testHelper.js',
			'packages/forms-web-app/src/pages/examination/select-deadline/utils/markActiveDeadlineItemAsChecked.js',
			'packages/forms-web-app/src/pages/examination/select-file/utils/errors/fileValidation.js',
			'packages/forms-web-app/src/pages/examination/select-file/utils/errors/handleMultipleFileUploadsWithErrors.js',
			'packages/forms-web-app/src/pages/examination/submission-error/utils/handleProcessSubmissionRetry.js',
			'packages/forms-web-app/src/pages/projects/_utils/pagination/documentsPerPage.js',
			'packages/forms-web-app/src/pages/projects/documents/_utils/common/buildQuerySring.js',
			'packages/forms-web-app/src/pages/projects/documents/_utils/documents/body/getBody.js',
			'packages/forms-web-app/src/pages/projects/documents/_utils/documents/body/mapQueryToFilterBody.js',
			'packages/forms-web-app/src/pages/projects/documents/_utils/documents/getDocuments.js',
			'packages/forms-web-app/src/pages/projects/documents/_utils/documents/searchDocuments.js',
			'packages/forms-web-app/src/pages/projects/documents/_utils/filters/checkBoxMapper.js',
			'packages/forms-web-app/src/pages/projects/documents/_utils/filters/convertFiltersToPageView.js',
			'packages/forms-web-app/src/pages/projects/documents/_utils/filters/getFilters.js',
			'packages/forms-web-app/src/pages/projects/register/_common/address/_utils/addressHandler.js'
		],
		rules: {
			'check-file/filename-naming-convention': 'off'
		}
	}
]);
