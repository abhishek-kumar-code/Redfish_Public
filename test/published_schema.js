const request = require('request');
const jsdom = require("jsdom");

module.exports.getPublishedSchemaVersionList = function(uri, callback) {
  let obj = {'callback': callback};
  let tmpCallback = processDirectoryListFile.bind(obj); 
  request({url: uri, timeout: 5000}, tmpCallback);
}

function processDirectoryListFile(error, response, body) {
  let callback = this.callback;
  if (!error && response.statusCode == 200) {
    jsdom.env(body, ["http://code.jquery.com/jquery.js"], function(err, window) {
      let list = {};
      let links = window.$('a');
      for(let i = 0; i < links.length; i++) {
        if(links[i].href.indexOf('.json') !== -1 && links[i].href.indexOf('.v') !== -1) {
          let parts = links[i].href.split('.');
          if(list[parts[0]] === undefined) {
            list[parts[0]] = {};
          }
          addVersionToList(list[parts[0]], parts[1]);
        }
      }
      callback(null, list);
    });
  }
  else {
    callback('Unable to read directory listing!', null);
  }
}

function addVersionToList(listEntry, version) {
  let parts = version.split('_');
  if(listEntry[parts[0]] === undefined) {
    listEntry[parts[0]] = {};
  }
  let subEntry = listEntry[parts[0]];
  if(subEntry[parts[1]] === undefined) {
    subEntry[parts[1]] = [];
  }
  subEntry[parts[1]].push(parts[2]+'');
}
