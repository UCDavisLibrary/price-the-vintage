const express = require('express');
const path = require('path');
const spaMiddleware = require('@ucd-lib/spa-router-middleware');
const logger = require('../lib/logger');
const config = require('../config');

/**
 * How we load Webcomponent polyfills and Webpacked Polymer 3 application bundle.
 * The loader script is from @ucd-load/cork-app-load and expects the global
 * CORK_LOADER_VERSIONS which will load all required polyfills and application
 * js bundles with cache breaking version flags.
 */
const bundle = `
  <script>
    var CORK_LOADER_VERSIONS = {
      loader : '${config.client.versions.loader}',
      bundle : '${config.client.versions.bundle}'
    }
  </script>
  <script src="/loader/loader.js?_=${config.client.versions.loader}"></script>
`;

module.exports = (app) => {
  // set assets dir depending on our server environment 
  let assetsDir = path.join(__dirname, '..', 'client', config.client.assets);

  /**
   * Setup SPA app routes and template rendering
   */
  spaMiddleware({
    app: app,
    htmlFile : path.join(assetsDir, 'index.html'),
    isRoot : true,
    appRoutes : config.server.appRoutes,
    getConfig : async (req, res, next) => {
      let user = {
        session : {},
        data : null
      }
      
      next({
        appRoutes : config.server.appRoutes,
        env : config.env,
        firebase : config.firebase,
        damsApi : config.damsApi,
        pgrApi : config.pgrApi,
        suggestApi : config.suggestApi,
        auth0 : config.auth0,
      });
    },
    template : async (req, res, next) => next({
      bundle
    })
  });

  /**
   * Setup static asset dir
   */
  app.use(express.static(assetsDir, {
    immutable: true,
    maxAge: '1y'
  }));

  logger.info('Client ENV='+config.client.env, 'Serving '+assetsDir, 'Bundle Info:', config.client.versions);
}