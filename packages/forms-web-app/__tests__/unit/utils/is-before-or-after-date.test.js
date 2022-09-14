const {
	isBeforeNowUTC,
	isBeforeOrAfterDate
} = require('../../../src/utils/is-before-or-after-date');
const { falsyAndEmptyValues } = require('../mocks');

jest.mock('../../../src/utils/get-now', () => {
	const originalModule = jest.requireActual('../../../src/utils/get-now');
	return {
		__esModule: false,
		...originalModule,

		// getNow mocked to time: 2020-01-01T00:00:00.000Z
		getNow: () => new Date('2020-01-01')
	};
});

const callAndExpectedResult = (fn, expectedResult) => expect(fn).toBe(expectedResult);

const iterateCallAndExpectResult = (
	arr,
	fn,
	expectedResult,
	functionName,
	extraFunctionParam = false,
	extraFnParam
) => {
	arr.forEach((value, index) => {
		const expectedResultValue = Array.isArray(expectedResult)
			? expectedResult[index]
			: expectedResult;
		const params = extraFunctionParam ? [arr[index], extraFnParam[index]] : arr[index];

		it(`Run function: ${functionName}, pass value: ${JSON.stringify(
			value
		)} and expect: ${expectedResultValue}`, () => {
			callAndExpectedResult(
				extraFunctionParam ? fn.apply(null, params) : fn.call(null, params),
				expectedResultValue
			);
		});
	});
};

describe('All Test Cases', () => {
	const valuesObject = {
		expectedInput: {
			input1: '2019-01-01T01:00:00.000Z', // 1 year before 2020-01-01
			input2: '2019-12-31T23:59:59.999Z', // 1 second before 2020-01-01
			input3: '2020-01-01T00:00:00.000Z', // exact time as 2020-01-01
			input4: '2020-01-01T00:00:00.001Z', // 1 second after 2020-01-01
			input5: '2030-01-01T00:00:00.000Z', // 10 years after 2020-01-01
			input6: '2019-01-01', // 1 year before 2020-01-01
			input7: '2019-12-31', // 1 day before 2020-01-01
			input8: '2020-01-01', // exact time as 2020-01-01
			input9: '2020-01-02', // 1 day after 2020-01-01
			input10: '2030-01-01' // 10 years after 2020-01-01
		},
		expectResult: {
			input1: false,
			input2: false,
			input3: false,
			input4: true,
			input5: true,
			input6: false,
			input7: false,
			input8: false,
			input9: true,
			input10: true
		}
	};

	describe('isBeforeNowUTC', () => {
		describe('Pass falsy values to isBeforeNowUTC', () => {
			iterateCallAndExpectResult(falsyAndEmptyValues, isBeforeNowUTC, undefined, 'isBeforeNowUTC');
		});

		describe('Pass expected values to isBeforeNowUTC', () => {
			iterateCallAndExpectResult(
				Object.values(valuesObject.expectedInput),
				isBeforeNowUTC,
				Object.values(valuesObject.expectResult),
				'isBeforeNowUTC'
			);
		});
	});

	describe('isBeforeOrAfterDate', () => {
		describe('Pass falsy values to', () => {
			iterateCallAndExpectResult(
				falsyAndEmptyValues,
				isBeforeOrAfterDate,
				undefined,
				'isBeforeOrAfterDate'
			);
		});

		describe('Pass expected values to isBeforeOrAfterDate', () => {
			const expectedResult = {
				close: {
					output1: 'The examination closed on 1 January 2019',
					output2: 'The examination closed on 31 December 2019',
					output3: 'The examination closed on 1 January 2020',
					output4: 'The examination is expected to close on 1 January 2020',
					output5: 'The examination is expected to close on 1 January 2030',
					output6: 'The examination closed on 1 January 2019',
					output7: 'The examination closed on 31 December 2019',
					output8: 'The examination closed on 1 January 2020',
					output9: 'The examination is expected to close on 2 January 2020',
					output10: 'The examination is expected to close on 1 January 2030'
				},
				open: {
					output1: 'The examination opened on 1 January 2019',
					output2: 'The examination opened on 31 December 2019',
					output3: 'The examination opened on 1 January 2020',
					output4: 'The examination opens on 1 January 2020',
					output5: 'The examination opens on 1 January 2030',
					output6: 'The examination opened on 1 January 2019',
					output7: 'The examination opened on 31 December 2019',
					output8: 'The examination opened on 1 January 2020',
					output9: 'The examination opens on 2 January 2020',
					output10: 'The examination opens on 1 January 2030'
				}
			};

			const inputs = [
				{
					closes: `The examination is expected to close on`,
					closed: `The examination closed on`
				},
				{
					opens: `The examination opens on`,
					opened: `The examination opened on`
				}
			];

			const input1 = [...Array(10).fill(Object.values(inputs[0]))];
			const input2 = [...Array(10).fill(Object.values(inputs[1]))];

			iterateCallAndExpectResult(
				Object.values(valuesObject.expectedInput),
				isBeforeOrAfterDate,
				Object.values(expectedResult.close),
				'isBeforeOrAfterDate',
				true,
				input1
			);

			iterateCallAndExpectResult(
				Object.values(valuesObject.expectedInput),
				isBeforeOrAfterDate,
				Object.values(expectedResult.open),
				'isBeforeOrAfterDate',
				true,
				input2
			);
		});
	});
});

module.exports = { iterateCallAndExpectResult, callAndExpectedResult };
