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
	parserOptions: {
		tsconfigRootDir: __dirname,
	},
	plugins: [
		'@typescript-eslint',
		'import',
	],
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			extends: [
				'plugin:@typescript-eslint/recommended',
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
		'@typescript-eslint/ban-ts-comment': ['warn', {'ts-ignore': 'allow-with-description'}],
		'@typescript-eslint/no-unsafe-assignment': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'valid-jsdoc': 0,
		'require-jsdoc': 0,
		'no-unused-vars': 0,
		'no-tabs': 0,
		'no-floating-promises': 0,
		'linebreak-style': 0
	},
};
