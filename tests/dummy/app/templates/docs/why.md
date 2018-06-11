# But&hellip; Why?

> [`lz-string`][1] was designed to fulfill the need of storing large amounts of
> data in `localStorage`, specifically on mobile devices. `localStorage` being
> usually limited to 5MB, all you can compress is that much more data you can
> store. <cite>~ [LZString][1] Author</cite>

This addon will allow an Ember application to easily import the [LSString][1]
utility and use it to encode/decode data for `localStorage`. But it doesn't end
there.

The default `queryParams` serialization that Ember provides for complex values
like `Array` and `Object` is to use `encodeURIComponent(JSON.stringify(...))`.
If the value being stored is large enough this can become unreasonable in a
URL.

A great example of such a use case is the [Babel REPL][2] which will store the
code you enter in a query param (`code_lz`) compressed with [`lz-string`][1].

This addon offers that ability. You can designate some `queryParams` as type
`lz` and they will be serialized through [`lz-string`][1]. You can also auto
serialize `queryParams` of type `array` or `object` (opt-in setting).

[1]: http://pieroxy.net/blog/pages/lz-string/index.html
[2]: https://babeljs.io/repl/
