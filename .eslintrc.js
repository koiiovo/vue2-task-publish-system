module.exports = {
    env: {
      browser: true,
      node: true,
      es6: true,
    },
    extends: [
      // 'plugin:vue/vue3-recommended', // 如果使用 Vue 3
      'plugin:vue/essential', // 如果使用 Vue 2
      'eslint:recommended',
    ],
    rules: {
      'vue/multi-word-component-names': 'off', // 禁用多词组件名称规则
    },
  };
  