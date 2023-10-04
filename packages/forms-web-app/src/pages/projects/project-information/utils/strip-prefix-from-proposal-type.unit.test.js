const { stripPrefixFromProposalType } = require('./strip-prefix-from-proposal-type');

describe('projects/project-information/utils/strip-prefix-from-proposal-type', () => {
	describe('#stripPrefixFromProposalType', () => {
		it("should return unchanged string if prefix doesn't match the pattern", async () => {
			const test1 = stripPrefixFromProposalType('TRA04 - Railways');
			const test2 = stripPrefixFromProposalType('BC033 - An Industrial Process or Processes');
			const test3 = stripPrefixFromProposalType('EN06 Gas Transporter Pipe-lines');

			expect(test1).toBe('TRA04 - Railways');
			expect(test2).toBe('BC033 - An Industrial Process or Processes');
			expect(test3).toBe('EN06 Gas Transporter Pipe-lines');
		});

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
