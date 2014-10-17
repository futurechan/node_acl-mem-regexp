Memory Backend with RegExp support for NODE ACL
===================

This replacement for the memory-backend that ships with [acl](https://github.com/OptimalBits/node_acl "node_acl") supports regular expressions for the resource.

##Status

[![BuildStatus](https://secure.travis-ci.org/futurechan/node_acl-mem-regexp.png?branch=master)](https://travis-ci.org/futurechan/node_acl-mem-regexp)


##Installation

Using npm:

```javascript
npm install acl-mem-regexp
```

##Examples

Explicitly allow access to a resource and its subresource.
```javascript
var acl = require('acl')
    , Backend = require('acl-mem-regexp')
    , acl = new acl(new Backend())
;

acl.allow([
	{
		roles:['someRole'], 
		allows:[
			{resources:'/resource(/[0-9]+)?', permissions:['get', 'post', 'put']},
			{resources:'/resource/[0-9]+/subresource/[0-9]+', permissions:['get', 'post', 'put']}
		]
	}
])
```

Do not include ```^``` and ```$```. Those will be added for you.

You can also omit access to the parent resource while allowing access to the subresource.
```javascript
acl.allow([
	{
		roles:['someOtherRole'], 
		allows:[
			{resources:'/resource/[0-9]+/subresource/[0-9]+', permissions:['get', 'post', 'put']}
		]
	}
])
```

