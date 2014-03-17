!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.AmpersandRegistry=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
// Registry
// ---------------

// Global storage for models, seperate namespace
// storage from default to prevent collision of matching
// model type+id and namespace name
module.exports = Registry;


function Registry() {
    this._cache = {};
    this._namespaces = {};
}


Registry.prototype._getCache = function (ns) {
    if (ns) {
        this._namespaces[ns] || (this._namespaces[ns] = {});
        return this._namespaces[ns];
    }
    return this._cache;
};

// Find the cached model
Registry.prototype.lookup = function (type, id, ns) {
    var cache = this._getCache(ns);
    return cache && cache[type + id];
};

// Add a model to the cache if it has not already been set
Registry.prototype.store = function (model) {
    var cache = this._getCache(model._namespace),
        key = model.type + model.getId();
    // Prevent overriding a previously stored model
    cache[key] = cache[key] || model;
    return this;
};

// Remove a stored model from the cache, return `true` if removed
Registry.prototype.remove = function (type, id, ns) {
    var cache = this._getCache(ns);
    if (this.lookup.apply(this, arguments)) {
        delete cache[type + id];
        return true;
    }
    return false;
};

// Reset internal cache
Registry.prototype.clear = function () {
    this._cache = {};
    this._namespaces = {};
};

},{}]},{},[1])
(1)
});