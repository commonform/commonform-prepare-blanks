# commonform-prepare-blanks

combine values and directions to fill Common Form blanks

```javascript
var prepareBlanks = require('commonform-prepare-blanks')
var assert = require('assert')

assert.deepStrictEqual(
  prepareBlanks(
    [ { value: '$10', blank: [ 'content', 1 ] } ]
  ),
  [ { value: '$10', blank: [ 'content', 1 ] } ]
)

assert.deepStrictEqual(
  prepareBlanks(
    { price: '$10' },
    [ { label: 'price', blank: [ 'content', 1 ] } ]
  ),
  [ { value: '$10', blank: [ 'content', 1 ] } ]
)

assert.deepStrictEqual(
  prepareBlanks(
    { price: '$10' },
    [
      { label: 'price', blank: [ 'content', 1 ] },
      { label: 'deadline', blank: [ 'content', 4 ] }
    ]
  ),
  [ { value: '$10', blank: [ 'content', 1 ] } ]
)

assert.throws(function () {
  prepareBlanks('invalid')
}, /invalid values/)

assert.throws(function () {
  prepareBlanks([ 'invalid' ])
}, /invalid values/)

assert.throws(function () {
  prepareBlanks([ false ])
}, /invalid values/)

assert.throws(function () {
  prepareBlanks(
    [ { invalid: '$10', blank: [ 'content', 1 ] } ]
  )
}, /invalid values/)

assert.throws(function () {
  prepareBlanks(
    [ { value: '$10', blank: [ 'invalid', 1 ] } ]
  )
}, /invalid values/)

assert.throws(function () {
  prepareBlanks(
    [ { value: '$10', blank: [ 'content', 1, 'invalid' ] } ]
  )
}, /invalid values/)

assert.throws(function () {
  prepareBlanks(
    { price: '$10' }
  )
}, /missing directions/)

assert.throws(function () {
  prepareBlanks(
    { price: '$10' },
    [ { invalid: 'direction' } ]
  )
}, /invalid directions/)
```
