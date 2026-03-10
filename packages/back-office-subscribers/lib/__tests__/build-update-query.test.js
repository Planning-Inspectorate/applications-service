const buildUpdateQuery = require('../build-update-query');

describe('#buildUpdateQuery', () => {
	it('throws error if required parameters are missing', () => {
		expect(() => buildUpdateQuery(undefined, 'representationId', {}, '2023-01-01')).toThrow(
			'tableName, keyColumn, entity and dateToCompare are required'
		);
		expect(() => buildUpdateQuery('representation', undefined, {}, '2023-01-01')).toThrow(
			'tableName, keyColumn, entity and dateToCompare are required'
		);
		expect(() =>
			buildUpdateQuery('representation', 'representationId', undefined, '2023-01-01')
		).toThrow('tableName, keyColumn, entity and dateToCompare are required');
		expect(() => buildUpdateQuery('representation', 'representationId', {}, undefined)).toThrow(
			'tableName, keyColumn, entity and dateToCompare are required'
		);
	});

	it('builds correct UPDATE statement with parameterised SET and WHERE clauses', () => {
		const entity = {
			representationId: 123,
			status: 'published',
			modifiedAt: new Date('2023-01-01T09:00:00.000Z')
		};
		const { statement, parameters } = buildUpdateQuery(
			'representation',
			'representationId',
			entity,
			'2023-01-01T09:00:00.000Z'
		);

		const lines = statement.split('\n');
		expect(lines[0].trim()).toBe('UPDATE [representation]');
		expect(lines[1].trim()).toBe('SET [status] = @P1, [modifiedAt] = @P2');
		expect(lines[2].trim()).toBe('WHERE [representationId] = @P3');
		expect(lines[3].trim()).toBe("AND '2023-01-01 09:00:00' >= DATEADD(MINUTE, -1, [modifiedAt]);");

		// Parameters: non-key values first, then key value
		expect(parameters).toEqual(['published', new Date('2023-01-01T09:00:00.000Z'), 123]);
	});

	it('handles null values as NULL in SET clause without consuming a parameter', () => {
		const entity = {
			representationId: 123,
			status: null,
			comment: 'some comment',
			modifiedAt: new Date('2023-01-01T09:00:00.000Z')
		};
		const { statement, parameters } = buildUpdateQuery(
			'representation',
			'representationId',
			entity,
			'2023-01-01T09:00:00.000Z'
		);

		const lines = statement.split('\n');
		expect(lines[1].trim()).toBe('SET [status] = NULL, [comment] = @P1, [modifiedAt] = @P2');
		expect(lines[2].trim()).toBe('WHERE [representationId] = @P3');

		expect(parameters).toEqual(['some comment', new Date('2023-01-01T09:00:00.000Z'), 123]);
	});

	it('handles undefined values as NULL in SET clause without consuming a parameter', () => {
		const entity = {
			representationId: 123,
			status: undefined,
			modifiedAt: new Date('2023-01-01T09:00:00.000Z')
		};
		const { statement, parameters } = buildUpdateQuery(
			'representation',
			'representationId',
			entity,
			'2023-01-01T09:00:00.000Z'
		);

		const lines = statement.split('\n');
		expect(lines[1].trim()).toBe('SET [status] = NULL, [modifiedAt] = @P1');
		expect(lines[2].trim()).toBe('WHERE [representationId] = @P2');

		expect(parameters).toEqual([new Date('2023-01-01T09:00:00.000Z'), 123]);
	});

	it('formats dateToCompare correctly', () => {
		const entity = {
			id: 1,
			name: 'test'
		};
		const { statement } = buildUpdateQuery(
			'myTable',
			'id',
			entity,
			'Sun, 01 Jan 2023 09:00:00 GMT'
		);
		expect(statement).toContain("'2023-01-01 09:00:00'");
	});
});
