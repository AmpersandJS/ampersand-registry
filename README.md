# ampersand-registry

Global model registry for tracking instantiated models across collections.

This isn't necessary for most apps, but sometimes it's useful to create a global registry of all or a subset of instantiated models in your application. This can be useful when realtime applications where you're getting incoming events with IDs and model types and need some global way to look up models in your application.

The code is quite short and simple it's only ~50 lines. It may be easiest to just read the code for documetation. But some examples/explanations are included below.

<!-- starthide -->
Part of the [Ampersand.js toolkit](http://ampersandjs.com) for building clientside applications.
<!-- endhide -->

## install

```
npm install ampersand-registry
```

## browser support

[![testling badge](https://ci.testling.com/AmpersandJS/ampersand-registry.png)](https://ci.testling.com/AmpersandJS/ampersand-registry)

## example

```javascript
var Registry = require('ampersand-registry');
var Model = require('ampersand-model');

// a singleton model registry
window.registry = new Registry();

// then whenever we're defining models for our application
// if we're using ampersand-model (or its lower level cousin
// ampersand-state) we can store that model in the registry 
// in the initialize method

var MyModel = Model.extend({
    modelType: 'user',
    props: {
        name: 'string'
    },
    initialize : function(){
        window.registry.store(this);
        this.on('destroy', function(){
            window.registry.remove(this.getType(), this.getId());
        }, this);
        
    }
});
```

After doing this all instantiated models will be put into the registry based on their `modelType` property and be removed when destroyed.

Then the registry can be used to look up models as follows:

```javascript
// explicitly storing a model
// this will use the models `type`, `getId`, and `namespace` 
// properties to store this accordingly.
registry.store(model);

// get a model
registry.lookup('{{model type}}', '{{ model id }}', '{{ optional namespace }}');

// remove a stored model from the store by type, id and optionally namespace
registry.remove('{{model type}}', '{{ model id }}', '{{ optional namespace }}');

// de-reference all models
registry.clear();
```

<!-- starthide -->

## credits

If you like this follow [@HenrikJoreteg](http://twitter.com/henrikjoreteg) on twitter.

## license

MIT

<!-- endhide -->
