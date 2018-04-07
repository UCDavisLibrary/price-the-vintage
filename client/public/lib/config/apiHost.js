module.exports = function(config) {
  config.apiHost = config.apiHost[config.env.location][config.env.env];

  console.log('Current API ENV', envVars);
  console.log('API HOST', host);

  return host;
}