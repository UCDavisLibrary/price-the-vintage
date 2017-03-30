const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.updatePageMarkCount = functions.database.ref('/price-the-vintage/marks/{pageId}/{markId}')
    .onWrite(event => {

      var response = new Promise((resolve, reject) => {
        var mark = event.data.val();
        var oldMark = event.data.previous.val();

        // tmp marks are noop here.
        if( mark && mark.isTemp ) return resolve();

        event.data.ref.parent.once('value').then((ref) => {
            const data = ref.val();
            var count = 0;

            if( data ) {
              for( var key in data ) {
                if( !data[key].isTemp ) count++;
              }
            }

            console.log('Setting page count', event.params.pageId, count);

            admin
              .database()
              .ref(`/price-the-vintage/pages/${event.params.pageId}/markCount`)
              .set(count)
              .then(() => {
                // mark has been deleted
                if( !mark ) {
                  admin
                    .database()
                    .ref(`/price-the-vintage/pending-marks/${event.params.markId}`)
                    .set(null)
                    .then(resolve)
                    .catch(reject);
                  return;
                }

                bookkeeping(mark, oldMark, event.params, resolve, reject);
              })
              .catch(reject);
        });

      });

      return response;
    });

function bookkeeping(mark, oldMark, params, resolve, reject) {

  getScore(mark, oldMark, params, (score) => {

    var search = {
      pageId : params.pageId,
      created : mark.created || Date.now(),
      updated : mark.updated || Date.now(),
      score : score
    }

    admin
      .database()
      .ref(`/price-the-vintage/users/${mark.user}/marks/${params.markId}`)
      .set(search)
      .then((snapshot) => {

        admin
          .database()
          .ref(`/price-the-vintage/pending-marks/${params.markId}`)
          .set(search)
          .then((snapshot) => {
            resolve();
          })
          .catch(reject);
      })
      .catch(reject);
  });
}

function getScore(mark, oldMark, params, callback) {
  // this is a new mark
  if( !oldMark ) return callback(0);

  var currentVotes = mark.votes || {};
  var oldVotes = oldMark.votes || {};

  // see if a new vote was cast
  var newVote;
  var newVoteUser;
  for( var key in currentVotes ) {
    if( !oldVotes[key] ) {
      newVoteUser = key;
      newVote = currentVotes[key];
    } else if( oldVotes[key].type !== currentVotes[key].type ) {
      newVoteUser = key;
      newVote = currentVotes[key];
    }
  }

  // nothing to do
  if( !newVote ) {
    return callback(calcScore(currentVotes));
  }

  admin
    .database()
    .ref(`/price-the-vintage/users/${newVoteUser}/scoreFactor`)
    .once('value')
    .then((snapshot) => {
      var scoreFactor = snapshot.val() || 1;
      newVote.factor = scoreFactor;

      // save the users score factor with the mark
      admin
        .database()
        .ref(`/price-the-vintage/marks/${params.pageId}/${params.markId}/votes/${newVoteUser}/factor`)
        .set(scoreFactor)
        .then(() => {
          callback(calcScore(currentVotes));
        })
        .catch((error) => {
          throw error;
        });
    })
    .catch((error) => {
      throw error;
    });
}

function calcScore(votes) {
  var score = 0;
  for( var key in votes ) {
    if( typeof votes[key] !== 'object' ) continue;
    if( votes[key].type === 'up' ) {
      score += votes[key].factor;
    } else {
      score -= votes[key].factor;
    }
  }

  return score;
}