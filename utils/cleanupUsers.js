/**
 * Cleanup anonymous user accounts
 */

var admin = require('firebase-admin');
var config = require('app/config').firebase;
var serviceAccount = require('app/config/price-the-vintage-firebase-adminsdk');

config = {
  databaseURL: config.databaseURL,
  credential: admin.credential.cert(serviceAccount)
};
admin.initializeApp(config);

admin
  .database()
  .ref('/users')
  .on('child_added', (snapshot) => {
    checkUser(snapshot.key, snapshot.val());
  });

admin
  .database()
  .ref('/activity')
  .on('child_added', (snapshot) => {
    cleanActivity(snapshot.key, snapshot.val());
  });

var doneTimer = -1;
function checkDone() {
  if( doneTimer !== -1 ) clearTimeout(doneTimer);

  doneTimer = setTimeout(() => {
    console.log('No updates for 5 seconds.  Assuming done');
    process.exit();
  }, 5000);
}

function removePath(path) {
  console.log(`Cleaning path: ${path}`);
  admin
    .database()
    .ref(path)
    .set(null)
    .then(checkDone);
}

function checkUser(uid, user) {
  if( user.anonymous ) {
    console.log(`Deleting anonymous user account: ${uid}`);
    admin
      .auth()
      .deleteUser(uid)
      .then(() => {
        removePath(`users/${uid}`)
      });
  }

  var expired = Date.now() - (60 * 60 * 1000);

  if( user.activity ) {
    for( var key in user.activity) {
      if( user.activity[key] < expired ) {
        removePath(`users/${uid}/activity/${key}`);
      }
    }
  }
}

function cleanActivity(id, activity) {
  var expired = Date.now() - (60 * 60 * 1000);

  for( var uid in activity) {
    if( activity[uid] < expired ) {
      removePath(`acitvity/${id}/${uid}`);
    }
  }
}