const fin = require('@ucd-lib/fin-node-api');


const BASE_PATH = '/fcrepo/rest'
const HAS_PART = 'http://schema.org/hasPart';
const ASSOCIATED_MEDIA = 'http://schema.org/associatedMedia';
const ENCODING_FORMAT = 'http://schema.org/encodingFormat';
const POSITION = 'http://schema.org/position';
const IMAGE_LIST = 'ImageList';

class Crawler {

  constructor(host, collectionId) {
    this.host = host;
    fin.setConfig({host});
    this.collectionId = collectionId;
  }

  async go() {
    let root = await this.getPath(this.collectionId);
    let catalogs = this.getProperty(root, HAS_PART);

    for( let catalog of catalogs ) {
      await this.walkCatalog(catalog['@id']);
    }
  }

  async walkCatalog(catalogId) {
    catalogId = this.getId(catalogId);
    await this.onItem(catalogId);

    let catalog = await this.getPath(catalogId);
    let medias = this.getProperty(catalog, ASSOCIATED_MEDIA);

    for( let media of medias ) {
      media = await this.getPath(media['@id']);
      let format = this.getProperty(media, ENCODING_FORMAT);

      if( format.findIndex(item => item['@value'] === IMAGE_LIST) > -1 ) {
        let pages = this.getProperty(media, HAS_PART);
        for( let page of pages ) {
          page = await this.getPath(page['@id']+'/fcr:metadata');

          let position = this.getProperty(page, POSITION);
          if( position.length > 0 ) position = parseInt(position[0]['@value']);
          else position = -1;

          await this.onItem(
            this.getId(page['@id']),
            catalogId,
            position
          );
        }

        break;
      }
    }
  }

  async getPath(path) {
    path = this.getId(path);

    let response = await fin.head({
      path,
      headers : {
        accept : fin.RDF_FORMATS.JSON_LD
      }
    });

    if( !fin.isRdfContainer(response.last) ) {
      return {};
    }

    response = await fin.get({
      path,
      headers : {
        accept : fin.RDF_FORMATS.JSON_LD
      }
    });
    let body = JSON.parse(response.last.body);
    
    if( Array.isArray(body) ) return body[0];
    return body;
  }

  getProperty(object, property) {
    if( !object[property] ) return [];
    if( !Array.isArray(object[property]) ) {
      return [object[property]];
    }
    return object[property];
  }

  getId(id) {
    return id.replace(this.host+BASE_PATH, '');
  }

  async onItem(id, parentId) {
    // implement me!
  }

}

module.exports = Crawler;