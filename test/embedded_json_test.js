const vows = require('vows');
const glob = require('glob');
const join = require('path').join;
const jsonlint = require('jsonlint');
const fs = require('fs');
const assert = require('assert');
const execAll = require('./utils').execAll;

const files = glob.sync('*.md');

const suite = {}
files.forEach(function(file) {
  const data = fs.readFileSync(file, 'utf-8')
  const examples = execAll(/(?:~~~|```)(json|http)([\s\S]*?)(?:~~~|```)/gim, data);

  if (examples) {
    const exampleTests = {};

    examples.forEach(function(example) {
      let json = example[1] === 'http' ? example[2].split("\n\n")[1] : example[2];

      if(!json) return;

      // Replace surrounding ellipsis with actual braces
      if (/^\.\.\./.test(json)) {
        json = json.replace(/^\.\.\./, '{').replace(/,?\s*\.\.\.$/, '}')
      }

      // Replace any ellipsis in the body with nothingness
      json = json.replace(/(["\]}]),?\s*\.\.\./, '$1')

      const name = "line " + example.lineNumber + " example";
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
