'use strict';
var glob = require('glob');
var yamllint = require('yaml-lint');
var fs = require('fs');
var yaml = require('js-yaml');
var SwaggerParser = require('swagger-parser');

describe('OpenAPI/YAML', () => {
  const files = glob.sync('openapi/*.yaml');

  files.forEach((file) => {
    describe(file, () => {
      let txt = null;
      before((done) => {
        fs.readFile(file, (err, data) => {
          if(err) {
            throw err;
          }
          txt = data;
          done();
        });
      });
      it('Is Valid YAML', function() {
        return yamllint.lint(txt);
      });
      if(file.includes('openapi.yaml')) {
        it('Is Valid OpenAPI', function() { 
          this.retries(2); //Retry in case of HTTP errors
          let doc = yaml.safeLoad(txt);
          return SwaggerParser.validate(doc, {resolve: {custom: customOpenAPIResolver}});
        });
      }
    });
  });
});

let customOpenAPIResolver = {
  order: 1,

  canRead: function(file) {
    let index = file.url.lastIndexOf('/');
    if(index === -1) {
      //Fallback to other resolvers...
      return false;
    }
    return true;
  },

  read: function(file) {
    return new Promise((resolve, reject) => {
      let index = file.url.lastIndexOf('/');
      if(index === -1) {
        reject(new Error('URL is not well formed'));
        return;
      }
      let filename = file.url.substring(index+1);
      fs.readFile('openapi/'+filename, (err, data) => {
        if (err) {
          reject(new Error(err, 'Error opening file '+filename));
        }
        else {
          resolve(data);
        }
      });
    });
  }
};
