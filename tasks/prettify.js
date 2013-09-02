/*
 * grunt-prettify
 * https://github.com/jonschlinkert/grunt-prettify
 *
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var htmlprettify = require('js-beautify').html;

  // Please see the grunt documentation for more information regarding task
  // creation: https://github.com/gruntjs/grunt/blob/devel/docs/toc.md

  grunt.task.registerMultiTask('prettify', 'Prettify HTML.', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      condense: true,
      padcomments: false,
      indent: 2,
      indent_char: " ",
      indent_inner_html: true,
      indent_scripts: "keep",
      brace_style: "expand",
      preserve_newline: false,
      max_preserve_newline: 0,
      wrap_line_length: 0
    });

    // Alias indent_size
    options.indent_size = options.indent;

    // Extend default options with options from specified jsbeautifyrc file
    if (options.config) {
      options = grunt.util._.extend(grunt.file.readJSON(options.config), options);
    }

    // Iterate over all specified file groups.
    this.files.forEach(function(fp) {
      var srcFile = fp.src.filter(function(filepath) {
        // Verify that files exist. Warn if a source file/pattern was invalid.
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(grunt.file.read).join(grunt.util.normalizelf(grunt.util.linefeed)); // Read source files.

      // Prettify HTML.
      var prettify = prettifyHTML(srcFile, options);

      // Reduce multiple newlines to a single newline
      if(options.condense === true) {
        prettify = condense(prettify);
      }
      // Add a single newline above code comments.
      if(options.padcomments === true) {
        prettify = padcomments(prettify);
      }

      if (prettify.length < 1) {
        grunt.log.warn('Destination not written because beautified HTML was empty.');
      } else {

        // Write the destination file.
        grunt.file.write(fp.dest, prettify);

        // Print a success message.
        grunt.log.ok('File "' + fp.dest + '" beautified.');
      }
    });
  });

  var condense = function(str) {
    return str.replace(/(\n|\r){2,}/g, '\n');
  };

  var padcomments = function(str) {
    return str.replace(/(\s*<!--\s)/g, '\n$1');
  };

  var prettifyHTML = function(source, options) {
    try {
      return htmlprettify(source, options);
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn('HTML beautification failed.');
    }
  };
};
