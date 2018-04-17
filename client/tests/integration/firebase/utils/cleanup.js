require('./firebase'); // this injects the admin instance
var firebase = require('sport-stream/firebase')();

module.exports = function cleanup(path, callback) {
  firebase
    .database()
    .ref(path)
    .orderByChild('_test_')
    .equalTo(true)
    .once('value', function(snapshot) {

      var data = snapshot.val();

      if( !data ) {
        console.log(`No data to clean for: ${path}`);
        return callback();
      }

      var remove = {};
      for( var id in data ) {
        remove[`path/${id}`] = null
      }

      console.log(`Cleaning up ${Object.keys(remove).length} objects`);

      firebase
        .database()
        .ref()
        .update(remove)
          .then(() => {
            console.log('Test Objects Removed');
            return callback();
          })
          .catch((error) => {
            console.error('Failed to cleanup');
            console.error(error);
            return callback();
          });
    });
}