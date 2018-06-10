import EmberObject from '@ember/object';
import LZQueryParamsMixin from 'ember-lz-string/mixins/lz-query-params';
import { setupTest } from 'ember-qunit';
import { module, test } from 'qunit';

const MockRoute = EmberObject.extend({
  '_super#serializeQueryParam': 0,
  '_super#deserializeQueryParam': 0,
  serializeQueryParam() {
    this.incrementProperty('_super#serializeQueryParam');
  },
  deserializeQueryParam() {
    this.incrementProperty('_super#deserializeQueryParam');
  }
});

module('Unit | Mixin | lz query params', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('route:test', MockRoute.extend(LZQueryParamsMixin));
  });

  test('does not serialize by default', function(assert) {
    let LZQueryParamsMixinRoute = this.owner.factoryFor('route:test');
    let subject = LZQueryParamsMixinRoute.create();
    subject.serializeQueryParam('test', 'foo', 'string');
    assert.equal(subject.get('_super#serializeQueryParam'), 1);
  });

  test('serializes params of type "lz"', function(assert) {
    let LZQueryParamsMixinRoute = this.owner.factoryFor('route:test');
    let subject = LZQueryParamsMixinRoute.create();
    let result = subject.serializeQueryParam('test', 'foo', 'lz');
    assert.equal(subject.get('_super#serializeQueryParam'), 0);
    assert.equal(result, 'EQFwpgzixA');
  });

  test('serializes params of type "array" when autoSerializeArray is true', function(assert) {
    this.owner.register('config:environment', {
      'ember-lz-string': { autoSerializeArray: true }
    });
    let LZQueryParamsMixinRoute = this.owner.factoryFor('route:test');
    let subject = LZQueryParamsMixinRoute.create();
    let result = subject.serializeQueryParam(['test'], 'foo', 'array');
    assert.equal(subject.get('_super#serializeQueryParam'), 0);
    assert.equal(result, 'NoIgLgpgzmILpA');
  });

  test('serializes params of type "object" when autoSerializeObject is true', function(assert) {
    this.owner.register('config:environment', {
      'ember-lz-string': { autoSerializeObject: true }
    });
    let LZQueryParamsMixinRoute = this.owner.factoryFor('route:test');
    let subject = LZQueryParamsMixinRoute.create();
    let result = subject.serializeQueryParam({ bar: 'test' }, 'foo', 'object');
    assert.equal(subject.get('_super#serializeQueryParam'), 0);
    assert.equal(result, 'N4IgRghgTiBcIBcCmBnBIC+Q');
  });

  test('does not deserialize by default', function(assert) {
    let LZQueryParamsMixinRoute = this.owner.factoryFor('route:test');
    let subject = LZQueryParamsMixinRoute.create();
    subject.deserializeQueryParam('test', 'foo', 'string');
    assert.equal(subject.get('_super#deserializeQueryParam'), 1);
  });

  test('deserializes params of type "lz"', function(assert) {
    let LZQueryParamsMixinRoute = this.owner.factoryFor('route:test');
    let subject = LZQueryParamsMixinRoute.create();
    let result = subject.deserializeQueryParam('EQFwpgzixA', 'foo', 'lz');
    assert.equal(subject.get('_super#deserializeQueryParam'), 0);
    assert.equal(result, 'test');
  });

  test('deserializes params of type "array" when autoDeserializeArray is true', function(assert) {
    this.owner.register('config:environment', {
      'ember-lz-string': { autoSerializeArray: true }
    });
    let LZQueryParamsMixinRoute = this.owner.factoryFor('route:test');
    let subject = LZQueryParamsMixinRoute.create();
    let result = subject.deserializeQueryParam('NoIgLgpgzmILpA', 'foo', 'array');
    assert.equal(subject.get('_super#deserializeQueryParam'), 0);
    assert.deepEqual(result, ['test']);
  });

  test('deserializes params of type "object" when autoDeserializeObject is true', function(assert) {
    this.owner.register('config:environment', {
      'ember-lz-string': { autoSerializeObject: true }
    });
    let LZQueryParamsMixinRoute = this.owner.factoryFor('route:test');
    let subject = LZQueryParamsMixinRoute.create();
    let result = subject.deserializeQueryParam('N4IgRghgTiBcIBcCmBnBIC+Q', 'foo', 'object');
    assert.equal(subject.get('_super#deserializeQueryParam'), 0);
    assert.deepEqual(result, { bar: 'test' });
  });
});
