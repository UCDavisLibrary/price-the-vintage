const BaseService = require('@ucd-lib/cork-app-utils').BaseService;

class ServiceUtils extends BaseService {

  constructor() {
    super();
    this.store = {};
  }

  // txtInfo in format: 10-20/196
  /**
   * Helper for extracting the pagging information from the
   * response header.
   */
  setResultInfo(txtInfo, result) {
    result.start = 0;
    result.stop = 0;
    result.total = 0;

    if( !txtInfo ) return;

    try {
      var p2 = txtInfo.split('/');
      var p1 = p2[0].split('-');

      result.start = parseInt(p1[0].replace(/\D/, '') || 0);
      result.stop = parseInt(p1[1] || 0);
      result.total = parseInt(p2[1] || 0);
    } catch(e) {
      console.error(e);
    }
  }

  /**
   * @method escapeTSVector
   * @description escape a string so it can be used in pg's
   * ts vector query.
   * 
   * @param {String} text text string to escape
   * 
   * @returns {Promise} resolves to escaped text
   */
  async escapeTSVector(text) {
    let {body} = await this.request({
      url : `/rpc/strto_tsquery`,
      fetchOptions : {
        method : 'POST',
        body : JSON.stringify({str: text})
      }
    });

    text = body ? body[0].phrase : text;
    return `@@.${text}`;
  }
}

module.exports = new ServiceUtils();