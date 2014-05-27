/*
 * grunt-prettify
 * https://github.com/jonschlinkert/grunt-prettify
 *
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT license.
 */
'use strict';

// node_modules
var format = require('js-beautify').html;
var _str   = require('underscore.string');
var _      = require('lodash');
var async  = require('async');


module.exports = function(grunt) {

  grunt.task.registerMultiTask('prettify', 'Prettify HTML.', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      // Custom options
      indent_size: 2,
      condense: true,
      padcomments: false,
      preserveBOM: false,

      // js-beautify options
      indent_char: " ",
      indent_inner_html: true,
      indent_scripts: "keep",
      brace_style: "expand",
      preserve_newline: false,
      max_preserve_newline: 0,
      wrap_line_length: 0
    });

    // Extend default options with options from specified .jsbeautifyrc file
    if (options.config) {
      options = grunt.util._.extend(options, grunt.file.readJSON(options.config));
    }

    // If user has used alias for indent_size
    if (!_.isUndefined(options.indent)) {
      options.indent_size = options.indent;
    }

    async.forEach(this.files, function(fp, cb) {

      var files = grunt.file.expand({nonull: true}, fp.src);

      // Concat specified files.
      var src = files.map(function(filepath) {
        // Warn if a source file/pattern was invalid.
        if (!grunt.file.exists(filepath)) {
          grunt.log.error('Source file "' + filepath + '" not found.');
          return '';
        }
        // Read file source.
        return grunt.file.read(filepath);
      }).join(options.separator);

      // Prettify HTML.
      var output = prettifyHTML(src, options);

      // Reduce multiple newlines to a single newline
      output = (options.condense === true) ? condense(output) : output;

      // Use at your own risk. This option will slow down the build.
      // What does "ocd" mean? Just look at the function, then lookup
      // ocd on wikipedia.
      output = (options.ocd === true) ? ocd(output) : output;

      // Add a single newline above code comments.
      if(options.padcomments === true) {
        output = padcomments(output, 1);
      }
      if(options.padcomments !== false && _.isNumber(options.padcomments)) {
        output = padcomments(output, options.padcomments);
      }

      // Preserve byte-order marks. Set to "false" by default.
      output = (options.preserveBOM === true) ? stripBOM(output) : output;

      if (output.length < 1) {
        grunt.log.warn('Destination not written because dest file was empty.');
      } else {
        // Write the destination file.
        grunt.file.write(fp.dest, output);
        // Print a success message.
        grunt.log.ok('File "' + fp.dest + '" prettified.');
      }
      cb();
    });
  });

  var stripBOM = function(content) {
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
    }
    return content;
  };

  // Normalize and condense all newlines
  var condense = function(str) {
    return str.replace(/(\r\n|\n\r|\n|\r){2,}/g, '\n');
  };

  // fix multiline, Bootstrap-style comments
  var padcomments = function(str, num) {
    var nl = _str.repeat('\n', (num || 1));
    return str.replace(/(\s*)(<!--.+)\s*(===.+)?/g, nl + '$1$2$1$3');
  };

  var ocd = function(str) {
    str = str
      // Remove any empty lines at the top of a file.
      .replace(/^\s*/g, '')
      // make <li><a></li> on one line, but only when li > a
      .replace(/(<li>)(\s*)(<a .+)(\s*)(<\/li>)/g, '$1 $3 $5')
      // make <a><span></a> on one line, but only when a > span
      .replace(/(<a.+)(\s*)(<span.+)(\s*)(<\/a>)/g, '$1 $3 $5')
      // Put labels and inputs on one line
      .replace(/(\s*)(<label>)(\s*)(.+)(\s*)(.+)\s*(.+)\s*(<\/label>)/g, '$1$2$4$6$7$8')
      // Fix newlines when <p> has child elements
      // .replace(/(\s*)(<p.+)(\s*)(<.+)(\s*)(.+)(<\/p>)/g, '$1$2$3$4$5$6$1$7')
      // Make <p>text</p> on one line.
      .replace(/(<p.+)(\s*)(<\/p>)/gm, '$1$3')
      // Adjust spacing for span > input
      .replace(/(\s*)(<(?:span|strong|button).+)(\s*)(<.+)(\s*)(<\/(?:span|strong|button)>)/g, '$1$2$1  $4$1$6')
      // Add a newline for tags nested inside <h1-6>
      .replace(/(\s*)(<h[0-6](?:.+)?>)(.*)(<(?:small|span|strong|em)(?:.+)?)(\s*)(<\/h[0-6]>)/g, '$1$2$3$1  $4$1$6')
      // Bring closing comments up to the same line as closing tag.
      .replace(/\s*(<!--\s*\/.+)/g, '$1');
    return str;
  };

  var prettifyHTML = function(source, options) {
    try {
      return format(source, options);
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn('HTML prettification failed.');
    }
  };
};
