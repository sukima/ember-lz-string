import Mixin from '@ember/object/mixin';
import { getOwner } from '@ember/application';
import { get } from '@ember/object';
import LZString from 'lz-string';

export default Mixin.create({
  serializeQueryParam(value, urlKey, defaultValueType) {
    if (defaultValueType === 'lz') {
      return LZString.compressToEncodedURIComponent(JSON.stringify(value));
    }
    let config = getOwner(this).resolveRegistration('config:environment');
    if (defaultValueType === 'array' && get(config, 'ember-lz-string.autoSerializeArray')) {
      return LZString.compressToEncodedURIComponent(JSON.stringify(value));
    }
    if (defaultValueType === 'object' && get(config, 'ember-lz-string.autoSerializeObject')) {
      return LZString.compressToEncodedURIComponent(JSON.stringify(value));
    }
    return this._super(...arguments);
  },

  deserializeQueryParam(value, urlKey, defaultValueType) {
    if (defaultValueType === 'lz') {
      return JSON.parse(LZString.decompressFromEncodedURIComponent(value));
    }
    let config = getOwner(this).resolveRegistration('config:environment');
    if (defaultValueType === 'array' && get(config, 'ember-lz-string.autoSerializeArray')) {
      return JSON.parse(LZString.decompressFromEncodedURIComponent(value));
    }
    if (defaultValueType === 'object' && get(config, 'ember-lz-string.autoSerializeObject')) {
      return JSON.parse(LZString.decompressFromEncodedURIComponent(value));
    }
    return this._super(...arguments);
  }
});
