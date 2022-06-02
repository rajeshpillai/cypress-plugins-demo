const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: false,
  env: {
    browserPermissions: {
      notifications: 'allow',
      geolocation: 'allow',
      camera: 'allow',
      microphone: 'allow',
      images: 'allow',
      javascript: 'allow',
      popups: 'allow',
      plugins: 'allow',
      cookies: 'allow',
    },
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    experimentalSessionAndOrigin: false,
  },
})
