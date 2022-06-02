/// <reference types="cypress" />

const { cypressBrowserPermissionsPlugin } = require('cypress-browser-permissions');


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
  config = cypressBrowserPermissionsPlugin(on, config)

  const { playwright } = require('../../playright/demo');
 
  const items = {};

  on('task', {
    // Clipboard test plugin
    getClipboard: async() => {
      const clipboard = await clipboardy.read()
      return clipboard
    },

    pwGetClipboardData: async () => {   
        return await playwright()
    },
    
    setItem ({ name, value }) {
      console.log('setting %s', name)
      if (typeof value === 'undefined') {
        // since we cannot return undefined from the cy.task
        // let's not allow storing undefined
        throw new Error(`Cannot store undefined value for item "${name}"`)
      }

      items[name] = value

      return null
    },

    getItem (name) {
      if (name in items) {
        console.log('returning item %s', name)

        return items[name]
      }

      const msg = `Missing item "${name}"`

      console.error(msg)
      throw new Error(msg)
    },
  })

  return config;
}
