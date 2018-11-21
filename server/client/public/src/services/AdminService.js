var {BaseService} = require('@ucd-lib/cork-app-utils');
const crowdSourceJsConfig = require('@ucd-lib/crowd-source-js').config;

class AdminService extends BaseService {

  constructor() {
    super();
  }

  async clearTestMarks() {
    let query = await firestore.db
      .collection('crowd-inputs')
      .where('collectionId', '==', 'test-collection')
      .get()

    for( let doc of query.docs ) {
      await firestore.db
        .collection('crowd-inputs')
        .doc(doc.id)
        .delete()
    }
  }

  async getAllPageMarks() {
    let query = await firestore.db
      .collection('crowd-inputs')
      .where('appId', '==', crowdSourceJsConfig)
      .get()
    
    // TODO: generate summary
    return query.docs;
  }

}

module.exports = new AdminService();