/*
 * grunt-prettify
 * https://github.com/jonschlinkert/grunt-prettify
 *
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var formatHTML = require('js-beautify').html;
  grunt.task.registerMultiTask('prettify', 'Prettify HTML.', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      condense: true,
      padcomments: false,
      preserveBOM: false,
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

    // Extend default options with options from specified .jsbeautifyrc file
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
      var output = prettifyHTML(srcFile, options);

      // Reduce multiple newlines to a single newline
      output = (options.condense === true) ? condense(output) : output;
      // Add a single newline above code comments.
      output = (options.padcomments === true) ? padcomments(output) : output;
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
    });
  });

  var stripBOM = function(content) {
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.slice(1);
    }
    return content;
  };

  var condense = function(str) {
    return str.replace(/(\n|\r){2,}/g, '\n');
  };

  var padcomments = function(str) {
    return str.replace(/(\s*<!--\s)/g, '\n$1');
  };

  var prettifyHTML = function(source, options) {
    try {
      return formatHTML(source, options);
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn('HTML prettification failed.');
    }
  };
};
