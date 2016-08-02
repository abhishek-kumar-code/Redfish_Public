const vows = require('vows');
const glob = require('glob');
const fs = require('fs');
const assert = require('assert');
const marked = require('marked');
const cheerio = require('cheerio');

const files = glob.sync('*.md');

const suite = {}
files.forEach(file => {
  suite[file] = {
    topic: function() {
      fs.readFile(file, 'utf-8', (err, data) => {
        if (err) { return this.callback(err) }
        marked(data, (err2, html) => {
          if (err2) { return this.callback(err2) };
          this.callback(err2, cheerio.load(`<body>${html}</body>`));
        });
      });
    },
    'has valid internal document links': function($) {
      const targets = new Set();
      $('[id]').each((i, el) => {
        targets.add($(el).attr('id'));
      });

      $('a[href^="#"]').each((i, el) => {
        const $el = $(el);
        const link = $el.attr('href').slice(1);
        let parent = $el;
        do {
          parent = parent.parent();
        } while (!parent.parent().is('body'));
        const section = parent.prevAll('h1, h2, h3, h4, h5, h6').first().text();

        assert(targets.has(link), `Link "${$el.text()}" targets non-existant id "${link}" in document. Link is in section "${section}".`);
      });
    },
  };
});

vows.describe('Markdown Internal Cross-References').addBatch(suite).export(module);
