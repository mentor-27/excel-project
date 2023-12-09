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
        'semi': 1,
        'comma-dangle': 0,
        "require-jsdoc" : 0
    }
}