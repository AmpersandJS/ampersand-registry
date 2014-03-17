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
