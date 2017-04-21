const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.onPendingMarkUpdate = functions.database.ref('/marks/{pageId}/{markId}')
    .onWrite(event => {

      var response = new Promise((resolve, reject) => {
        var mark = event.data.val();
        var oldMark = event.data.previous.val();

        // tmp marks are noop here.
        if( mark && mark.isTemp ) return resolve();

        event.data.ref.parent.once('value').then((ref) => {
            const data = ref.val();

            // mark has been deleted
            if( !mark ) {
              return removeMark(oldMark.user, event.params.markId, resolve, reject);
            }

            bookkeeping(mark, oldMark, event.params, resolve, reject);
        });

      });

      return response;
    });

function removeMark(userId, markId, resolve, reject) {
  admin
    .database()
    .ref(`/users/${userId}/marks/${markId}`)
    .set(null)
    .then((snapshot) => {
      admin
        .database()
        .ref(`/pending-marks/${markId}`)
        .set(null)
        .then(resolve)
        .catch(reject);
    })
    .catch(reject);
}

function bookkeeping(mark, oldMark, params, resolve, reject) {

  getScore(mark, oldMark, params, (score) => {

    var search = {
      pageId : params.pageId,
      created : mark.created || Date.now(),
      updated : mark.updated || Date.now(),
      score : score
    }

    if( mark.section === 'test' ) {
      search.test = true;
    }

    admin
      .database()
      .ref(`/users/${mark.user}/marks/${params.markId}`)
      .set(search)
      .then((snapshot) => {

        admin
          .database()
          .ref(`/pending-marks/${params.markId}`)
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
    .ref(`/users/${newVoteUser}/scoreFactor`)
    .once('value')
    .then((snapshot) => {
      var scoreFactor = snapshot.val() || 1;
      newVote.factor = scoreFactor;

      // save the users score factor with the mark
      admin
        .database()
        .ref(`/marks/${params.pageId}/${params.markId}/votes/${newVoteUser}/factor`)
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