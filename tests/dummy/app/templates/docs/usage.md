# Usage

## Installing

```sh
ember install ember-lz-string
```

## Importing

```js
import LZString from 'lz-string';
```

See [the official documentation][1] for the lz-string utility.

[1]: http://pieroxy.net/blog/pages/lz-string/index.html

## Query-Params

Any route you with to support LZ-string serialization you will need to use the
{{docs-link "LZQueryParams mixin" "docs.api.item" "mixins/lz-query-params"}}.

Then define any `queryParams` as type `lz`:

{{#docs-snippet name="query-params-type-lz.js"}}
export default Route.extend({
  queryParams: {
    foobar: { type: 'lz' }
  }
});
{{/docs-snippet}}

If you would like to auto serialize `array`s and `object`s include this mixin
and then set the `autoSerializeArray` and `autoSerializeObject` (respectively)
in your `config/environment.js`:

{{#docs-snippet name="config-environment.js"}}
ENV: {
  'ember-lz-string': {
    autoSerializeArray: true,
    autoSerializeObject: true
  }
}
{{/docs-snippet}}

<aside>These are off by default</aside>

If using the auto serializing then your default values must `typeOf()` to
'array' or 'object'. To do that use a constant:

{{#docs-snippet name="auto-serialize-controller-example.js"}}
const DEFAULT_ARRAY = [];
const DEFAULT_OBJECT = {};

export default Controller.extend({
  queryParams: ['foo', 'bar'],
  foo: DEFAULT_ARRAY,
  bar: DEFAULT_OBJECT,

  actions: {
    clearAll() {
      this.set('foo', DEFAULT_ARRAY);
      this.set('bar', DEFAULT_OBJECT);
    }
  }
});
{{/docs-snippet}}
