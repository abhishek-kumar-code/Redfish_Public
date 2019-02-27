'use strict';
var mocha = require('mocha');
var Base = mocha.reporters.Base;
var color = mocha.reporters.Base.color;

module.exports = MyReporter;

function travisEncode(group) {
  return group.replace(/[^A-Za-z\d]+/g, '-').replace(/-$/, '');
}

function MyReporter(runner, options) {
  mocha.reporters.Base.call(this, runner);

  var self = this;
  var indents = 0;
  var n = 0;
  var foldAt = 2 || options.reporterOptions.foldAt;

  function indent() {
    return Array(indents).join('  ');
  }

  runner.on(mocha.Runner.constants.EVENT_RUN_BEGIN, function() {
    console.log();
  });

  runner.on(mocha.Runner.constants.EVENT_SUITE_BEGIN, function(suite) {
    ++indents;
    if(indents === foldAt && process.env.TRAVIS === true) {
      console.log('travis_fold:start:'+travisEncode(indent()+suite.title));
    }
    console.log(color('suite', '%s%s'), indent(), suite.title);
  });

  runner.on(mocha.Runner.constants.EVENT_SUITE_END, function() {
    if(indents === foldAt && process.env.TRAVIS === true) {
      console.log("\ntravis_fold:end:$1\r");
    }
    --indents;
    if (indents === 1) { 
      console.log();
    }
  });

  runner.on(mocha.Runner.constants.EVENT_TEST_PENDING, function(test) {
    var fmt = indent() + color('pending', '  - %s');
    console.log(fmt, test.title);
  });

  runner.on(mocha.Runner.constants.EVENT_TEST_PASS, function(test) {
    var fmt;
    if (test.speed === 'fast') {
      fmt =
        indent() +
        color('checkmark', '  ' + Base.symbols.ok) +
        color('pass', ' %s');
      console.log(fmt, test.title);
    } else {
      fmt =
        indent() +
        color('checkmark', '  ' + Base.symbols.ok) +
        color('pass', ' %s') +
        color(test.speed, ' (%dms)');
      console.log(fmt, test.title, test.duration);
    }
  });

  runner.on(mocha.Runner.constants.EVENT_TEST_FAIL, function(test) {
    console.log(indent() + color('fail', '  %d) %s'), ++n, test.title);
  });

  runner.once(mocha.Runner.constants.EVENT_RUN_END, self.epilogue.bind(self));
}

mocha.utils.inherits(MyReporter, mocha.reporters.Spec);
