const { stripPrefixFromProposalType } = require('./get-page-data');

describe('projects/project-information/utils/get-page-data', () => {
	describe('#stripPrefixFromProposalType', () => {
		it('should remove the case prefix from proposal string', async () => {
			const test1 = stripPrefixFromProposalType('TR04 - Railways');
			const test2 = stripPrefixFromProposalType('BC03 - An Industrial Process or Processes');
			const test3 = stripPrefixFromProposalType('EN06 - Gas Transporter Pipe-lines');

			expect(test1).toBe('Railways');
			expect(test2).toBe('An Industrial Process or Processes');
			expect(test3).toBe('Gas Transporter Pipe-lines');
		});
	});
});
