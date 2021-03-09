module.exports = {
    "env": {
        "node": true,
        "jest": true,
        "commonjs": true,
        "es2021": true,
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 12
    },
    "rules": {
        "no-console": "off",
    },
};