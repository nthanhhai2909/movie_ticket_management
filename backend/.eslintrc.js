module.exports = {
	'env': {
		"browser": true,
		"es6": true,
		"jest": true,
		"node": true
 
	},
	'extends': 'eslint:recommended',
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaVersion': 2018,
		'sourceType': 'module'
	},
	'rules': {
		'semi': ['error', 'always'],
		'quotes': ['error', 'single'],
		'callback-return': ['error', ['callback', 'cb', 'next']],
		'handle-callback-err':['error', '^.*(e|E)rr'],
		'no-path-concat': ['error'],
		'no-process-env': ['warn'],
		'no-process-exit': ['warn'],
		'no-empty': ['warn'],
		'no-extra-semi': ['error'],
		'default-case': ['warn'],
		'eqeqeq': ['error', 'always'],
		'no-else-return': ['warn'],
		'require-await': ['error'],
		'array-bracket-spacing': ['warn', 'always'],
		'comma-spacing': ['warn'],
		'camelcase': ['warn', { "properties": "always" } ],
		'no-console':['warn'],
		'no-warning-comments': ['warn']
	
	}
}