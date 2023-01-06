module.exports = {
	root: true,
	env: {
		es6: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
		'google',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint',
		'import',
	],
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			extends: [
				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
			],
			parserOptions: {
				project: ['./tsconfig.json'],
				sourceType: 'module',
			},
		},
	],
	ignorePatterns: [
		'/node_modules/**/*',
	],
	rules: {
		'indent': ['error', 'tab'],
		'quotes': ['error', 'single'],
		'import/no-unresolved': 0,
		'max-len': 0,
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'valid-jsdoc': 0,
		'require-jsdoc': 0,
		'no-unused-vars': 0,
		'no-tabs': 0,
		'no-floating-promises': 0,
	},
};
