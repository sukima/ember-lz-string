{{docs-hero
    logo="ember"
    slimHeading="lz-string"
    byline="An LZ-based compression algorithm for Ember"}}

# Introduction

This plugin brings the power of the infamous [lz-string
library](http://pieroxy.net/blog/pages/lz-string/index.html) to your ember
apps.

We also provide built-in support for using LZ-Compressed strings in your
`queryParams`.

{{#docs-demo as |demo|}}
  {{#demo.example name="index-query-param-foobar.hbs"}}
    <p>
      Try changing the <code>foobar</code> query param.
      (Uncompressed size: <num>{{foobar.length}}</num> chars)
    </p>

    <p><pre>{{textarea class="border" cols=50 rows=5 value=foobar}}</pre></p>

    <p>
      Examples:
      {{link-to "Clear" "docs.index" (query-params foobar="")}}
      {{link-to "The quick brown fox" "docs.index" (query-params foobar="The quick brown fox jumped over the lazy dog.")}}
      {{link-to "Turtles all the way down" "docs.index" (query-params foobar="turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle turtle")}}
      {{link-to "Code" "docs.index" (query-params foobar=codeExample)}}
      {{link-to "Emojis" "docs.index" (query-params foobar="👪🎣🔧🐅🐐📩🌻 💛🕕🌒🐀🎡📫 🐣💘📏🍬🔠🌕 🔥🌟🗻👹 🐦💝📈📅🐋📡📃 🔓🌍💀🍦🎢 🔥🏯🐆🐤 📁🎈💑📠 🍠📍📺🔙🐸 📧💡🌊🕝🎹 📦🐨🕁🕐🐛 🕃🎺📘🎊🏧🌳.")}}
    </p>
  {{/demo.example}}

  {{demo.snippet "index-query-param-foobar.hbs"}}
{{/docs-demo}}
