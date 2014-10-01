node_acl-mem-regexp
===================

This replacement for the memory-backend that ships with node_acl supports regular expressions for the resource.

##Installation

Using npm:

```javascript
npm install acl-mem-regexp
```

```javascript
acl.allow([
	{
		roles:['someRole'], 
		allows:[
			{resources:'/resource(/[0-9]+$)?', permissions:['get', 'post', 'put']},
			{resources:'/resource/[0-9]+/subresource/[0-9]+', permissions:['get', 'post', 'put']}
		]
	}
])
```

Do not include ```^``` and ```$```. Those will be added for you.

You can also disallow access to the parent resource while allowing access to the subresource.

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

