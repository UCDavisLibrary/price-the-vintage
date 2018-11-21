const {config} = require('@ucd-lib/crowd-source-js');
config.appId = 'price-the-vintage-dev';
if( typeof APP_CONFIG !== 'undefined' && APP_CONFIG.appId ) {
  config.appId = APP_CONFIG.appId;
}



module.exports = {
  ActivityModel : require('./lib/activity'),
  CatalogsModel : require('./lib/catalogs'),
  MarksModel : require('./lib/marks'),
  PagesModel : require('./lib/pages'),
  SuggestModel : require('./lib/suggest'),
  AdminModel : require('./models/AdminModel'),
  AppStateModel : require('./models/AppStateModel'),
  AuthModel : require('./models/AuthModel'),
  InterestedPartyModel : require('./models/InterestedPartyModel')
}