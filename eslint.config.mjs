import withNuxt from "./.nuxt/eslint.config.mjs";
import vueParser from "vue-eslint-parser";

export default withNuxt({
  languageOptions: {
    parser: vueParser,

    parserOptions: {
      ecmaVersion: "latest",
      parser: "@typescript-eslint/parser",
      sourceType: "module",
    },
  },

  // https://eslint.org/docs/latest/rules
  // https://eslint.vuejs.org/rules
  // https://typescript-eslint.io/rules
  rules: {
    /**
     * Ошибки
     */
    "@typescript-eslint/no-shadow": "error",
    "vue/block-lang": ["error", { script: { lang: "ts" } }],
    "vue/prefer-prop-type-boolean-first": "error",
    "vue/require-macro-variable-name": "error",
    "vue/valid-define-options": "error",
    "vue/no-duplicate-attr-inheritance": "error",
    "vue/no-irregular-whitespace": "error",

    /**
     * Предупреждения
     */
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      { disallowTypeAnnotations: false },
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "warn",
      {
        allowExpressions: true,
        // allowTypedFunctionExpressions: true,
        // allowHigherOrderFunctions: true,
        // allowDirectConstAssertionInArrowFunctions: true,
        // allowConciseArrowFunctionExpressionsStartingWithVoid: false,
        allowFunctionsWithoutTypeParameters: true,
        // allowedNames: [],
        // allowIIFEs: false,
      },
    ],
    "@typescript-eslint/naming-convention": [
      "warn",
      { selector: "interface", format: ["PascalCase"], prefix: ["I"] },
      { selector: "typeAlias", format: ["PascalCase"], prefix: ["T"] },
      { selector: "enum", format: ["PascalCase"] },
      { selector: "enumMember", format: ["PascalCase"] },
    ],
    "@typescript-eslint/no-inferrable-types": "warn",
    curly: ["warn", "multi-line", "consistent"],
    "spaced-comment": [
      "warn",
      "always",
      {
        //-+-+-+-+-+-+-+-+
        // Пример баннера
        //-+-+-+-+-+-+-+-+

        //----------------
        // Пример баннера
        //----------------
        line: {
          markers: ["/"],
          exceptions: ["-", "-+"],
        },

        /*****************
         * Пример баннера
         *****************/
        block: {
          markers: ["!"],
          exceptions: ["*"],
          balanced: true,
        },
      },
    ],
    "vue/block-order": [
      "warn",
      {
        order: [
          "script:not([setup])",
          "script[setup]",
          "template",
          "style:not([scoped])",
          "style[scoped]",
        ],
      },
    ],
    "vue/component-api-style": "warn",
    "vue/custom-event-name-casing": [
      "warn",
      "camelCase",
      {
        ignores: ["/^[a-z]+:[a-z]+(?:[A-Z][a-z]+)*$/u"], // Пример: $emit('change:itemQuantity', $event)
      },
    ],
    "vue/define-emits-declaration": "warn",
    "vue/define-macros-order": [
      "warn",
      {
        order: [
          "defineOptions",
          "defineEmits",
          "defineProps",
          "defineSlots",
          "defineModel",
        ],
        defineExposeLast: true,
      },
    ],
    "vue/define-props-declaration": "warn",
    "vue/html-button-has-type": "warn",
    "vue/html-comment-content-spacing": "warn",
    "vue/no-multiple-objects-in-class": "warn",
    "vue/no-required-prop-with-default": "warn",
    "vue/no-static-inline-styles": "warn",
    "vue/no-useless-v-bind": "warn",
    "vue/padding-line-between-blocks": "warn",
    "vue/padding-line-between-tags": "warn",
    "vue/padding-lines-in-component-definition": "warn",
    "vue/prefer-define-options": "warn",
    "vue/prefer-true-attribute-shorthand": "warn",
    "vue/require-emit-validator": "warn",
    "vue/require-typed-object-prop": "warn",
    "vue/require-typed-ref": "warn",
    "vue/v-for-delimiter-style": "warn",
    /**
     * Отключены
     */
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-this-alias": "off",
    "no-prototype-builtins": "off",
    "no-shadow": "off", // В ошибках указано правило '@typescript-eslint/no-shadow' (https://typescript-eslint.io/rules/no-shadow/#how-to-use)
    "vue/multi-word-component-names": "off",
    "vue/html-self-closing": "off",
    "vue/no-v-html": "off",
  },
});
