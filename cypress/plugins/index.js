/// <reference types="cypress" />

let clipboardy;

(async function () {
  clipboardy = await (await import('clipboardy')).default;
  console.log("clipboardy: ", clipboardy);
})();

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
 
  const { playwright } = require('../../playright/demo');
 
  on('task', {
    // Clipboard test plugin
    getClipboard: async() => {
      const clipboard = await clipboardy.read()
      return clipboard
    },
    pwGetClipboardData: async () => {   
        return await playwright()
    },
  })
}
