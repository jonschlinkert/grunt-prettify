# Usage Examples

## Default Options
The default setup in this project's Gruntfile uses an external `.prettifyrc` file for controlling the task's options.

```js
grunt.initConfig({
  prettify: {
    options: {
      prettifyrc: '.prettifyrc'
    },
    files: {
      'pretty/index.html': ['ugly/index.html']
    }
  }
});
```

The default options are set to:

``` json
{
  "indent": 2,
  "indent_char": " ",
  "indent_scripts": "normal",
  "wrap_line_length": 0,
  "brace_style": "collapse",
  "preserve_newlines": true,
  "max_preserve_newlines": 1,
  "unformatted": [
    "a",
    "code",
    "pre"
  ]
}
```

## Custom Options

You can also specify the options in the Gruntfile if you wish, like this:

```js
prettify: {
  options: {
    indent: 2,
    indent_char: ' ',
    wrap_line_length: 78,
    brace_style: 'expand',
    unformatted: ['a', 'sub', 'sup', 'b', 'i', 'u']
  },
  ...
}
```

Example configurations for prettifying one file at a time, or entire directories of files:

```js
prettify: {
  options: {
    prettifyrc: '.prettifyrc'
  },
  // Prettify a directory of files
  all: {
    expand: true,
    cwd: 'test/actual/ugly/',
    ext: '.html',
    src: ['*.html'],
    dest: 'test/actual/pretty/'
  },
  // Or prettify one file at a time using the "files object" format
  files: {
    'pretty/index.html': ['ugly/index.html']
  },
  // Or the "compact" src-dest format
  one: {
    src: 'test/actual/ugly/index.html',
    dest: 'test/actual/pretty/index.html'
  }
}
```

See the [grunt][] docs for more information about task configuration.


[grunt]: http://gruntjs.com/


## Author

**Jon Schlinkert**

+ [twitter.com/jonschlinkert](http://twitter.com/jonschlinkert)
+ [github.com/jonschlinkert](http://github.com/jonschlinkert)

## Thanks!

Also, this plugin is based on and uses [js-beautifier](http://jsbeautifier.org/).
"Thank you" to authors and contributors of that project!

 * Written by Nochum Sossonko, <nsossonko@hotmail.com>
 * Based on code initially developed by: [Einar Lielmanis](elfz@laacz.lv)
 * Many [other contributors](https://github.com/einars/js-beautify/contributors)
 * [Visit the project](https://github.com/einars/js-beautify)

