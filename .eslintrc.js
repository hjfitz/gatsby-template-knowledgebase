module.exports = {
    "env": {
        "browser": true,
        "es2020": true,
        "node": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        'no-restricted-syntax': 0,
        // 'no-console': 0,
        'global-require': 0,
        'semi': 0,
        'object-curly-spacing': ["error", "never"],
        "react/jsx-indent": [2, 'tab'],
        'no-tabs': 0,
        "indent": ["error", "tab"],
        "react/jsx-indent-props": [2, 'tab'],
        "react/prop-types": 0,
        "react/jsx-props-no-spreading": 0,
        "react/jsx-one-expression-per-line": 0,
    }
};


