module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-recommended'],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'vue/multi-word-component-names': 'off',
  },
}
