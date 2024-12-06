module.exports = {
  env: {
    browser: true,
    es2021: true,
		node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  settings: {
    react: {
      version: "detect",
    },
  },
	rules: {
		'@typescript-eslint/no-non-null-assertion': 'off',
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
			},
			{
				usePrettierrc: true,
			},
		],
		'react/react-in-jsx-scope': 'off',
		'react/no-children-prop': 'off',
	},
};
