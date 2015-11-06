/**
  Memory Backend (with RegExp support).
  
  In-memory implementation of the storage (with RegExp support).

  [That's a pity...]
  We cannot (fully) use inheritance here because `parent.union()` implementation would override the work done here:
    - https://github.com/OptimalBits/node_acl/blob/master/lib/memory-backend.js#L71

  Side effects:
    - We have to `require('./contract')` here (could be avoided)
    - We have to have an exact copy of `contract.js` file in this repo (could be avoided)
    - We have to copy most of the code of `parent.union()` method here (could be avoided)
*/
"use strict";

var 
  contract = require('./contract'),
  _ = require('lodash'),
  inherits = require('util').inherits,
  Acl = require('acl'),
  MemoryBackend = Acl.memoryBackend;

function MemoryRegexpBakend() {
  MemoryBackend.call(this);
}
inherits(MemoryRegexpBakend, MemoryBackend);

MemoryRegexpBakend.prototype.union = function(bucket, keys, cb) {
  var match;
  var re;

  // [That's a pity...]
  // We have to copy `parent` "contract" code...
  contract(arguments)
      .params('string', 'array', 'function')
      .end();

  if (!this._buckets[bucket]) {
    Object.keys(this._buckets).some(function(b) {
      re = new RegExp('^'+b+'$');
      match = re.test(bucket);
      if (match) bucket = b;
      return match;
    });
  }

  // [That's a pity...]
  // Should be:
  //   MemoryBackend.prototype.union.call(this, bucket, keys, cb);

  // But instead:
  //   We have to copy `parent` code...
  if (this._buckets[bucket]) {
    var keyArrays = [];
    for (var i=0,len=keys.length;i<len;i++) {
      if (this._buckets[bucket][keys[i]]) {
        keyArrays.push.apply(keyArrays, this._buckets[bucket][keys[i]]);
      }
    }
    cb(undefined, _.union(keyArrays));
  }else{
    cb(undefined, []);
  }
  // /End copy
};

exports = module.exports = MemoryRegexpBakend;
