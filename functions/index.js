const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.updatePageMarkCount = functions.database.ref('/price-the-vintage/marks/{pageId}')
    .onWrite(event => {

      var response = new Promise((resolve, reject) => {

        event.data.ref.once('value').then((ref) => {
            const data = ref.val();
            var count = 0;

            if( data ) {
              count = Object.keys(data).length;
            }

            console.log('Setting page count', event.params.pageId, count);

            admin
              .database()
              .ref(`/price-the-vintage/pages/${event.params.pageId}/markCount`)
              .set(count)
              .then(resolve)
              .catch(reject);
        });

      });

      return response;
    });