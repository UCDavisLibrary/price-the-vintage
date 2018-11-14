const pgr = require('./lib/pgr');
const Crawler = require('./lib/crawl');

let DAMS_HOST = 'https://digital.ucdavis.edu';
let COLLECTION_ID = '/collection/sherry-lehmann';

(async function() {

  // insert collection into pgr
  let response = await pgr.insert('collections', {
    collection_id : COLLECTION_ID,
    name : 'Sherry Lehmann Wine Catalogs'
  });
  console.log(response.statusCode, COLLECTION_ID);

  // init crawler
  let crawler = new Crawler(DAMS_HOST, COLLECTION_ID);

  // when a crawler finds an item, insert into pgr
  crawler.onItem = async (item_id, parent_id, index) => {
    let item = {
      item_id,
      collection_id: COLLECTION_ID
    };

    if( parent_id ) {
      item.parent_id = parent_id;
      item.index = index;
    }

    let response = await pgr.insert('items', item);
    console.log(response.statusCode, item_id);
  }

  // start crawler
  await crawler.go();

})();