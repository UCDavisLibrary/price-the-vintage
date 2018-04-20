const assert = require('assert');
const suggest = require('../../public/src/lib/suggest');
const marks = require('../../public/src/lib/marks');

describe('suggest library', function() {

  it('should suggest a wine name', async () => {
    let result = await suggest.wineName('cha');
    assert.equal(result.state, suggest.store.STATE.LOADED);
    assert.equal(typeof result.query, 'object');
    assert.equal(result.text, 'cha');
    assert.equal(result.payload.length > 0, true);
  });

  it('should handle empty wine name search', async () => {
    let result = await suggest.wineName('asldkj123890');
    assert.equal(result.state, suggest.store.STATE.LOADED);
    assert.equal(typeof result.query, 'object');
    assert.equal(result.text, 'asldkj123890');
    assert.equal(result.payload.length, 0);
  });

  it('should suggest a country name', async () => {
    let result = await suggest.country('fr');

    assert.equal(result.state, suggest.store.STATE.LOADED);
    assert.equal(typeof result.query, 'object');
    assert.equal(result.text, 'fr');
    assert.equal(result.payload.length > 0, true);
  });

  it('should handle emptry country name search', async () => {
    let result = await suggest.country('adsoi34234');

    assert.equal(result.state, suggest.store.STATE.LOADED);
    assert.equal(typeof result.query, 'object');
    assert.equal(result.text, 'adsoi34234');
    assert.equal(result.payload.length, 0);
  });

  it('should return page sections from store marks ', () => {
    // add some fake sections
    marks.store.data.byId = {};
    marks.store.data.byId['1234'] = {
      pageId : '123',
      payload : {section : 'foo'}
    }
    marks.store.data.byId['2345'] = {
      pageId : '123',
      payload : {section : 'bar'}
    }
    marks.store.data.byId['3456'] = {
      pageId : '123',
      payload : {section : 'foo'}
    }

    let result = suggest.pageSection('123');
    
    assert.equal(result.state, suggest.store.STATE.LOADED);
    assert.equal(result.payload.length, 2);
    assert.equal(result.pageId, '123');

    // cleanup
    marks.store.data.byId = {};
  });

});