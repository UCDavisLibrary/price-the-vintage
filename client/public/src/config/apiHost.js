module.exports = function(config) {
  config.apiHost = config.apiHost[config.env.location][config.env.env];
  return config.apiHost;
}