import { prettierConfig } from '@planning-inspectorate/coding-standards';

export default {
	...prettierConfig,
	// disable 'prettier-plugin-prisma' & 'prettier-plugin-organize-imports' for now
	plugins: [],
	printWidth: 100
};
