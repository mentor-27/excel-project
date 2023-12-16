module.exports = {
    parser: '@babel/eslint-parser',
    parserOptions: {
        babelOptions: {
            configFile: './src/babel.config.json'
        }
    },
    env: {
        browser: true,
        node: true,
        es6: true
    },
    extends: ['eslint:recommended', 'google'],
    rules: {
        'semi': 0,
        'comma-dangle': 0,
        'require-jsdoc' : 0,
        'linebreak-style': 0,
        'arrow-parens': 0,
        'quotes': 0,
        'no-unused-vars': 0,
        'object-curly-spacing': 0,
        'eol-last': 0,
        'operator-linebreak': 0,
        'max-len': 0,
        'indent': 0
    }
}