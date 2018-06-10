import Route from '@ember/routing/route';
import { LZQueryParamsMixin } from 'ember-lz-string';

export default Route.extend(LZQueryParamsMixin, {
  queryParams: {
    foo: { type: 'lz' }
  }
});
