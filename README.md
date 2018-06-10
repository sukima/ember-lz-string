# ember-lz-string

Ember wrapper for lz-string module, original here: http://pieroxy.net/blog/pages/lz-string/index.html

## Usage

Use in your app with:

```console
ember install ember-lz-string
```

Import via:

```js
import LZString from 'lz-string';
```

## QueryParams Mixin

In cases where you would like your 'queryParams' to use this (The [Babel REPL][1] does this) use this mixin and set the type to `lz`:

```js
import Route from '@ember/routing/route';
import { LZQueryParamsMixin } from 'ember-lz-string';

export default Route.extend(LZQueryParamsMixin, {
  queryParams: {
    foo: { type: 'lz' }
  }
});
```

[1]: https://babeljs.io/repl/

### Auto serialization of Arrays/Objects

If you wish to also have all arrays/objects serialized via lz-string set the `autoSerializeArray` and `autoSerializeObject` (respectively) options in your app's `config/environment.js`:

```js
ENV = {
  'ember-lz-string': {
    autoSerializeArray: true,
    autoSerializeObject: true
  }
}
```

These are both **off** by default. And remember if using the auto serializing then your default values must `typeOf()` to 'array' or 'object'. To do that use a constant:

```js
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
```

## Installation

* `git clone <repository-url>` this repository
* `cd ember-lz-string`
* `yarn install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `yarn test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
