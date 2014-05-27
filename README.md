# grunt-prettify [![NPM version](https://badge.fury.io/js/grunt-prettify.png)](http://badge.fury.io/js/grunt-prettify)  [![Build Status](https://travis-ci.org/jonschlinkert/grunt-prettify.png?branch=master)](https://travis-ci.org/jonschlinkert/grunt-prettify)

> HTML prettifier with a number of options for formatting HTML the way you like it.

This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-prettify --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-prettify');
```


## Prettify task
_Run this task with the `grunt prettify` command._

### Overview
In your project's Gruntfile, add a section named `prettify` to the data object passed into `grunt.initConfig()`.

```javascript
grunt.initConfig({
  prettify: {
    options: {
      // Task-specific options go here.
    },
    html: {
      // Target-specific file lists and/or options go here.
    }
  }
});
```


### Options
#### config
Type: `String`
Default value: `null`

Path to `.jsbeautifyrc`. If this option is specified, options defined therein will be used. The `.jsbeautifyrc` file must be valid JSON and looks something like this:

```json
{
  "indent": 4,
  "condense": true,
  "indent_inner_html": true,
  "unformatted": [
    "a",
    "pre"
  ]
}
```

Note that options defined in `.jsbeautifyrc` override the default options, and options defined in the Gruntfile override all other options.

#### condense
Type: `Boolean`
Default value: `true`

Removes extra newlines and retains indenting.

#### preserveBOM
Type: `Boolean`
Default value: `false`

Preserve byte-order marks that might exist. Also see the [Grunt.js source](https://github.com/gruntjs/grunt/blob/master/lib/grunt/file.js#L217).

#### padcomments
Type: `Boolean|Number`
Default value: `false`

Add newlines above each code comment. For backwards compatibility, you may set to `true` to add a single newline, or specify the number of newlines you want to add.

#### indent
Type: `Number`
Default value: `2`

The indentation size to be used on the output HTML. This is an alias for `indent_size`. So either `indent` or `indent_size` may be used.

#### indent_char
Type: `String`
Default value: `' '` (space)
Options: `space`|`tab` (use an actual space or tab, not the word)

Character with which to indent the output HTML.

#### indent_scripts
Type: `String`
Default value: `keep`
Options: `keep`|`separate`|`normal`

The indentation character to use to indent the output HTML.

#### indent_inner_html
Type: `Boolean`
Default value: `true`

Indent `<body></body>` and `<head></head>` sections.

#### brace_style
Type: `String`
Default value: `expand`

Options:

* `collapse`: (default) puts braces on the same line as control statements
* `expand`: put all braces on their own lines (Allman / ANSI style)
* `end-expand`: put _end_ braces only on their own line.

#### wrap_line_length
Type: `Number`
Default value: `0` (disabled)

Maximum characters per line. `0` disables, max is `250`.

#### preserve_newlines
Type: `Boolean`
Default value: `false`

Preserve existing line-breaks.

#### max_preserve_newlines
Type: `Number`
Default value: `unlimited`

Maximum number of consecutive line-breaks to be preserved.

#### unformatted
Type: `String|Array`
Default value: `["pre", "code"]`

Array of tags that should not be re-formatted in the output. Defaults to inline.

_Attention:_ Make sure you play around with the settings and view the HTML in the browser. Pay special attention to whitespace around links and other inline elements, such as `<strong>` and `<span>`. If you specify a list of elements to remain `unformatted`, you will definitely need to make sure that whitepace is rendering the way you want it to.


## Usage Examples
### Default Options
The default setup in this project's Gruntfile uses an external `.prettifyrc` file for controlling the task's options.

```js
grunt.initConfig({
  prettify: {
    options: {
      config: '.prettifyrc'
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

### Custom Options

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
    config: '.prettifyrc'
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


## Release History

 * 2013-11-25   v0.3.0   Adds option to preserve byte-order marks in output. General task improvements
 * 2013-08-18   v0.2.7   Options updated to use new config option from js-beautify.
 * 2013-04-21   v0.1.1   Create plugin, run tests. Add assemble task to generate test HTML from templates.
 * 2013-04-21   v0.1.0   First commit.

## Author

**Jon Schlinkert**

+ [twitter.com/jonschlinkert](http://twitter.com/jonschlinkert)
+ [github.com/jonschlinkert](http://github.com/jonschlinkert)

## Thanks!
Also, this plugin requires [js-beautifier](http://jsbeautifier.org/). A sincere **thank you** to the authors and contributors of that project!
 * Written by Nochum Sossonko, <nsossonko@hotmail.com>
 * Based on code initially developed by: [Einar Lielmanis](elfz@laacz.lv)
 * Many [other contributors](https://github.com/einars/js-beautify/contributors)
 * [Visit the project](https://github.com/einars/js-beautify)

## License
Copyright (c) 2014 jonschlinkert, contributors.
Released under the MIT license

***

_This file was generated by [grunt-readme](https://github.com/assemble/grunt-readme) on Tuesday, May 27, 2014._


[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html
