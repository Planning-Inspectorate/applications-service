import { defineConfig } from 'prisma/config';
import path from 'node:path';

// load .env file into process.env
// prettier-ignore
try { require('node:process').loadEnvFile(); } catch {/* ignore errors*/}

export default defineConfig({
	schema: path.join('prisma', 'schema.prisma'),
	migrations: {
		path: path.join('prisma', 'migrations'),
		seed: 'node prisma/seed.js'
	},
	datasource: {
		url: process.env.DATABASE_URL || ''
	}
});
