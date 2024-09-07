import globals from "globals";
import eslintjs from "@eslint/js";
import babelParser from "@babel/eslint-parser";
import react from "eslint-plugin-react";


export default [
  {
    files: ["apps/**/*.{js,mjs,cjs,jsx}"],
    plugins:{
      react,
    },
    languageOptions: {
      sourceType: "module",
      parser: babelParser,
      parserOptions: {
        ecmaFeatures:{
          jsx: true,
        },
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
          presets: ["@babel/preset-react"]
        }
      },

      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
        "THREE": false,
        "console": true
      }
    },
    rules: {
      "array-bracket-spacing": ["error", "always", { "singleValue": true, "arraysInArrays": false }],
      "block-spacing": ["error", "always"],
      "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
      "comma-spacing": ["error", { "before": false, "after": true }],
      "comma-style": [2, "last"],
      "computed-property-spacing": ["error", "always"],
      "eol-last": ["error", "always"],
      "func-call-spacing": ["error", "never"],
      "indent": ["error", 2],
      "key-spacing": ["error", { "beforeColon": false }],
      "new-parens": ["error"],
      "no-trailing-spaces": ["error", { "skipBlankLines": false }],
      "no-whitespace-before-property": ["error"],
      "object-curly-spacing": ["error", "always"],
      "padded-blocks": ["error", {
        "blocks": "always",
        "switches": "always",
        "classes": "always"
      }],
      "semi": ["error", "always", { "omitLastInOneLineBlock": true }],
      "semi-spacing": ["error", { "before": false, "after": true }],
      "space-before-blocks": ["error", { "functions": "always", "keywords": "always", "classes": "always" }],
      "space-before-function-paren": ["error", {
        "anonymous": "always",
        "named": "never",
        "asyncArrow": "ignore"
      }],
      "space-in-parens": ["off"],
      "space-infix-ops": ["error"],
      "space-unary-ops": ["off"],

      "keyword-spacing": ["error", { "before": true, "after": true }],
      "padding-line-between-statements": [
        "error",
        { "blankLine": "always", "prev": "block-like", "next": "*" }
      ],

      /* Best Practices */
      // "eqeqeq": 0,                               // Require === and !==

      "no-multi-spaces": 2,                         //  care if there's more than one space anywhere.
      "no-unused-expressions": 0,                   //  care if there are unused experssions. eg "flag && doThing();"
      // "consistent-return": 0,                    // Don't care if some returns return no value

      /* Variables */
      "no-undef": 1,
      "no-unused-vars": 1,

      /* Possible Errors */
      "no-extra-semi": 1,                         // Disallow extra semicolons. Example function foo() { };
      "no-mixed-spaces-and-tabs": 0,           // Disallow both spaces and tabs in the same line for indenting

      "yoda": 0,                   //  care if it's "if (1 == v)" or "if (v == 123)".
      "no-empty": 0,               //  care if we have empty blocks
      "no-shadow": 0,              //  care if the same variable name is used in an inner scope.
      "dot-notation": 0,           //  care if it's obj["prop"] instead of obj.prop
      "no-console": 0,             //  care the use of console
      "quotes": 0,                 //  care if quotes are double or single
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
    }
  },
  eslintjs.configs.recommended
];