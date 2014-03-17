# ampersand-registry

Global model registry for tracking instantiated models accross collections.

This isn't necessary for most apps, but sometimes it's useful to create a global registry of all or a subset of instantiated models in your application. This can be useful when realtime applications where you're getting incoming events with IDs and model types and need some global way to look up models in your application.

## install

```
npm install ampersand-registry
```

## example

```javascript
var Registry = require('ampersand-registry');
var Model = require('ampersand-model');

// a singleton model registry
window.registry = new Registry();

// then whenever we're defining models for our application
// if we're using ampersand-model or it's lower level cousin
// ampersand-state we can pass it the registry as part of the
// definition.

var MyModel = Model.extend({
    props: {
        name: 'string'
    },
    // Pass the registry you want all the instances of this model
    // to be included in.
    registry: window.registry

    // can also be a function in case it's not defined yet
    registry: function () {
        return window.registry;
    } 
});
```

At this point any models you

## credits

If you like this follow [@HenrikJoreteg](http://twitter.com/henrikjoreteg) on twitter.

## license

MIT

