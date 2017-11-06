var path = require('path');
var assert = require('assert');
var tester = require('gitbook-tester');

var pkg = require('../package.json');


describe('suit', function() {
  it('!S', function() {
    return tester.builder()
      .withContent('!S')
      .withLocalPlugin(path.join(__dirname, '..'))
      .create()
      .then(function(result) {
        assert.equal(result[0].content, '<p><span class="word-suit word-suit-spades">&#x2660;</span></p>')
      });
  });
});
