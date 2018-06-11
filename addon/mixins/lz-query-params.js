import Mixin from '@ember/object/mixin';
import { getOwner } from '@ember/application';
import { get } from '@ember/object';
import LZString from 'lz-string';

/**
 * Ipsum unde nulla beatae cum blanditiis perspiciatis Blanditiis repudiandae
 * fuga adipisci eos doloremque! Optio libero iste modi hic odio. Deserunt
 * dignissimos ab veritatis voluptatem ipsa quisquam. Saepe quo illo sapiente?
 *
 * ```js
 * export default Route.extends(LZQueryParams, {
 *   queryParams: {
 *     foobar: { type: 'lz' }
 *   }
 * });
 * ```
 *
 * @class LZQueryParams
 * @public
 */
export default Mixin.create({
  /**
   * Will serialize query params of type `lz`.
   * @method serializeQueryParam
   * @param {Any} value the deserialized value of the parameter
   * @param {String} urlKey the query param key
   * @param {String} defaultValueType the type of the param
   * @return {String} the serialized value
   * @private
   */
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

  /**
   * Will deserialize query params of type `lz`.
   * @method deserializeQueryParam
   * @param {String} value the serialized value of the parameter
   * @param {String} urlKey the query param key
   * @param {String} defaultValueType the type of the param
   * @return {Any} the deserialized value
   * @private
   */
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
