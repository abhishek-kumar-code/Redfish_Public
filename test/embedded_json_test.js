var vows = require('vows');
var glob = require('glob');
var join = require('path').join;
var jsonlint = require('jsonlint');
var fs = require('fs');
var assert = require('assert');

function execAll(regex, str) {
  var match = null;
  var matches = [];

   while (match = regex.exec(str)) {
     var matchArray = [];
     for (var i in match) {
       if (parseInt(i) == i) {
         matchArray.push(match[i].trim());
       }
     }
     matchArray.lineNumber = str.substr(0, match.index).split("\n").length + 1;
     matches.push(matchArray);
   }

   return matches.length > 0 ? matches : null;
}

var files = glob.sync('*.md');

var suite = {}
files.forEach(function(file) {
  var data = fs.readFileSync(file, 'utf-8')
  var examples = execAll(/(?:~~~|```)(json|http)([\s\S]*?)(?:~~~|```)/gim, data);

  if (examples) {
    var exampleTests = {};

    examples.forEach(function(example) {
      var json = example[1] === 'http' ? example[2].split("\n\n")[1] : example[2];

      if(!json) return;

      // Replace surrounding ellipsis with actual braces
      if (/^\.\.\./.test(json)) {
        json = json.replace(/^\.\.\./, '{').replace(/,?\s*\.\.\.$/, '}')
      }

      // Replace any ellipsis in the body with nothingness
      json = json.replace(/(["\]}]),?\s*\.\.\./, '$1')

      var name = "line " + example.lineNumber + " example";
      exampleTests[name + ' is valid syntax'] = function() {
        try {
          jsonlint.parse(json);
        } catch(e) {
          assert(false, 'Failed to parse\n' + e.message.replace(/(lines? )(\d+):/, function(_, l, m) {
            // Massage the error to be the actual line number in markdown
            return l + (example.lineNumber + parseInt(m, 10)) + ':';
          }));
        }
      }
    });

    suite[file] = exampleTests;
  }
});

vows.describe('Markdown Example Code').addBatch(suite).export(module);
