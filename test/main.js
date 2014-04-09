var test = require('tape');
var Registry = require('../ampersand-registry');
var State = require('ampersand-state');


test('should throw if no type attribute', function (t) {
    var r = new Registry();
    var S = State.extend({
        props: {
            id: 'string'
        }
    });
    var model = new S({id: '1'});
    t.throws(function () {
        r.store(model);
    });
    t.end();
});

test('should store/retrieve with a type and an id (for backward compat)', function (t) {
    var r = new Registry();
    var S = State.extend({
        type: 'thing',
        props: {
            id: 'string'
        }
    });
    var model = new S({id: '1'});
    r.store(model);
    t.equal(r.lookup('thing', '1'), model);
    t.notEqual(r.lookup('thing', '2'), model);
    t.notEqual(r.lookup('', '1'), model);
    t.end();
});

test('should store/retrieve with default type attribute', function (t) {
    var r = new Registry();
    var S = State.extend({
        modelType: 'thing',
        props: {
            id: 'string'
        }
    });
    var model = new S({id: '1'});
    r.store(model);
    t.equal(r.lookup('thing', '1'), model);
    t.notEqual(r.lookup('thing', '2'), model);
    t.notEqual(r.lookup('', '1'), model);
    t.end();
});

test('should store/retrieve with custom type attribute', function (t) {
    var r = new Registry();
    var S = State.extend({
        customType: 'thing',
        typeAttribute: 'customType',
        props: {
            id: 'string'
        }
    });
    var model = new S({id: '1'});
    r.store(model);
    t.equal(r.lookup('thing', '1'), model);
    t.notEqual(r.lookup('thing', '2'), model);
    t.notEqual(r.lookup('', '1'), model);
    t.end();
});

test('should be able to use namespaces to group further', function (t) {
    var r = new Registry();
    var S = State.extend({
        type: 'thing',
        props: {
            id: 'string',
            teamId: 'string'
        },
        namespaceAttribute: 'teamId'
    });
    var model1 = new S({id: '1', teamId: '1'});
    var model2 = new S({id: '1', teamId: '2'});
    r.store(model1);
    r.store(model2);
    t.notOk(r.lookup('thing', '1'), 'should fail with no namespace');
    t.equal(r.lookup('thing', '1', '1'), model1);
    t.equal(r.lookup('thing', '1', '2'), model2);
    t.end();
});

test('should be able to pass array of models to `store`', function (t) {
    var r = new Registry();
    var S = State.extend({
        type: 'thing',
        props: {
            id: 'string'
        }
    });
    var model1 = new S({id: '1'});
    var model2 = new S({id: '2'});
    var model3 = new S({id: '3'});
    r.store([model1, model2, model3]);
    t.equal(r.lookup('thing', '1'), model1);
    t.equal(r.lookup('thing', '2'), model2);
    t.equal(r.lookup('thing', '3'), model3);
    t.end();
});

test('should be able remove sans namespace', function (t) {
    var r = new Registry();
    var S = State.extend({
        type: 'thing',
        props: {
            id: 'string'
        }
    });
    var model = new S({id: '1'});
    r.store(model);
    t.equal(r.lookup('thing', '1'), model);
    r.remove('thing', '1');
    t.notEqual(r.lookup('thing', '1'), model);
    t.end();
});

test('should be able remove with namespace', function (t) {
    var r = new Registry();
    var S = State.extend({
        type: 'thing',
        props: {
            id: 'string',
            teamId: 'string'
        },
        namespaceAttribute: 'teamId'
    });
    var model = new S({id: '1', teamId: '1'});
    r.store(model);
    t.equal(r.lookup('thing', '1', '1'), model);
    r.remove('thing', '1', '1');
    t.notEqual(r.lookup('thing', '1', '1'), model);
    t.end();
});
