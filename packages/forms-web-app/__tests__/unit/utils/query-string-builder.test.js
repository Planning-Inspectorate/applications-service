const { queryStringBuilder } = require('../../../src/utils/query-string-builder');

describe('utils/query-string-builder', () => {
	const valueToExpect = {
		input1: {
			params: null,
			includedParams: []
		},
		input2: {
			params: {},
			includedParams: null
		},
		input3: {
			params: {
				caseRef: null,
				classification: null,
				page: null
			},
			includedParams: ['caseRef', 'classification', 'page']
		},
		input4: {
			params: {
				caseRef: 'EN010009',
				classification: 'all',
				page: '1',
				searchTerm: 'test search term',
				stage: ['stage 1', 'stage 2'],
				type: ['type 1', 'type 2']
			},
			includedParams: ['caseRef', 'classification', 'page', 'searchTerm', 'stage', 'type']
		},
		input5: {
			params: {
				caseRef: 'EN010009',
				classification: 'all',
				page: '1',
				searchTerm: null,
				stage: 'stage 1',
				type: 'type 1'
			},
			includedParams: ['caseRef', 'classification', 'page', 'searchTerm', 'stage', 'type']
		},
		input6: {
			params: {
				caseRef: 'EN010009',
				classification: 'all',
				page: '1',
				searchTerm: 'test search term',
				stage: ['stage 1', 'stage 2'],
				type: ['type 1', 'type 2']
			},
			includedParams: ['caseRef', 'classification', 'page']
		},
		input7: {
			params: {
				caseRef: 'EN010009',
				classification: 'all',
				page: '1',
				searchTerm: null,
				stage: null,
				type: null
			},
			includedParams: ['caseRef', 'classification', 'page', 'searchTerm', 'stage', 'type']
		}
	};

	const valueToEqual = {
		input1: '',
		input2: '',
		input3: '',
		input4:
			'?caseRef=EN010009&classification=all&page=1&searchTerm=test%20search%20term&stage=stage%201&stage=stage%202&type=type%201&type=type%202',
		input5: '?caseRef=EN010009&classification=all&page=1&stage=stage%201&type=type%201',
		input6: '?caseRef=EN010009&classification=all&page=1',
		input7: '?caseRef=EN010009&classification=all&page=1'
	};

	Object.keys(valueToExpect).forEach((value) => {
		test(`valueToExpect ${value} to equal valueToEqual ${value}`, () => {
			expect(
				queryStringBuilder(valueToExpect[value].params, valueToExpect[value].includedParams)
			).toEqual(valueToEqual[value]);
		});
	});
});
