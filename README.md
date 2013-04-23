# [grunt-prettify v0.1.3](https://github.com/jonschlinkert/grunt-prettify) [![Build Status](https://travis-ci.org/jonschlinkert/grunt-prettify.png)](https://travis-ci.org/jonschlinkert/grunt-prettify)

> How your HTML looks after a six-pack.

## Getting started
_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with the following command:

```bash
npm install grunt-prettify --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-prettify');
```

If the plugin has been installed correctly, running `grunt --help` at the command line should list the newly-installed plugin's task or tasks. In addition, the plugin should be listed in package.json as a `devDependency`, which ensures that it will be installed whenever the `npm install` command is run.

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html


## The "prettify" task

### Overview
In your project's Gruntfile, add a section named `prettify` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  prettify: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    }
  }
});
```


## The "grunt-prettify" task
### Options

#### options.indent_size
Type: `Number`
Default value: `2`

The indentation size to be used on the output HTML.

#### options.indent_char
Type: `String`
Default value: `' '` (space)

Character with which to indent the output HTML. You may use `space` or `tab` (use an actual space or tab, not the word).

#### options.indent_scripts
Type: `String`
Default value: `normal` 

The indentation character to use to indent the output HTML. You may use the following options: `keep|separate|normal`.

#### options.brace_style
Type: `String`
Default value: `collapse`

You may use the following options:

* `collapse`: the default, puts braces on the same line as control statements
* `expand`: put all braces on their own lines (Allman / ANSI style)
* `end-expand`: put _end_ braces on their own line.

#### options.max_char
Type: `Number`
Default value: `0` (disabled)

Maximum characters allowed per line. Use `0` to disable. 

#### options.unformatted
Type: `String|Array`
Default value: `["pre", "code"]` 

Array of tags that should not be re-formatted in the output. Defaults to inline. 

_Attention:_ Make sure you play around with the settings and view the HTML in the browser. Pay special attention to whitespace around links and other inline elements, such as `<strong>` and `<span>`. If you specify a list of elements to remain `unformatted`, you will definitely need to make sure that whitepace is rendering the way you want it to. 


### Usage Examples

#### Default Options
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

And the options are set to:
``` json
{
  "indent_size": 2,
  "indent_char": " ",
  "indent_scripts": "normal",
  "brace_style": "expand",
  "max_char": 0,
  "unformatted": ["pre", "code"]
}
```

#### Custom Options
You can "internalize" the options in the task if you wish, like this:

```js
prettify: {
  options: {
    indent_size: 2,
    indent_char: ' ',
    max_char: 78,
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


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Use [Assemble][assemble] to build and maintain your gh-pages, blog or documentation. Lint and test your code using [Grunt](http://gruntjs.com/).




## Author

**Jon Schlinkert**

+ [twitter.com/jonschlinkert](http://twitter.com/jonschlinkert)  
+ [github.com/jonschlinkert](http://github.com/jonschlinkert)  


Also, this plugin is based on and uses [js-beautifier](http://jsbeautifier.org/). The authors and contributors of that project have my sincerest appreciation for their work:
 * Written by Nochum Sossonko, <nsossonko@hotmail.com>
 * Based on code initially developed by: [Einar Lielmanis](elfz@laacz.lv)
 * Many [other contributors](https://github.com/einars/js-beautify/contributors)
 * [Visit the project](https://github.com/einars/js-beautify)
    

## Release History
* 2013-04-21    v0.1.1    Create plugin, run tests.Add assemble task to generate test HTML from templates.
* 2013-04-21    v0.1.0    First commit.



---
_This file was generated using the [Assemble][] Grunt.js plugin, on Mon Apr 22 2013 21:50:04 GMT-0400 (Eastern Daylight Time)._

<!-- assemble links -->

[download]: https://github.com/assemble/assemble-examples-basic/archive/master.zip
[assemble]: https://github.com/assemble/assemble/
[assemble-examples]: https://github.com/assemble/assemble-examples

[wiki]: https://github.com/assemble/assemble/wiki
[data]: https://github.com/assemble/assemble/wiki/data
[layouts]: https://github.com/assemble/assemble/wiki/layouts
[markdown]: https://github.com/assemble/assemble/wiki/markdown
[options]: https://github.com/assemble/assemble/wiki/options
[partials]: https://github.com/assemble/assemble/wiki/partials


<!-- grunt links -->

[gruntfile]: http://gruntjs.com/sample-gruntfile
[configuring tasks]: http://gruntjs.com/configuring-tasks
[files-object]: http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
[tasks-and-targets]: http://gruntjs.com/configuring-tasks#task-configuration-and-targets