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
      indent_size: 2,
      indent_char: " ",
      indent_inner_html: true,
      indent_scripts: "keep",
      brace_style: "expand",
      preserve_newline: false,
      max_preserve_newline: 0,
      wrap_line_length: 0,
      unformatted: []
    });

    // Extend default options with options from specified prettifyrc file
    if (options.prettifyrc) {
      options = grunt.util._.extend(options, grunt.file.readJSON(options.prettifyrc));
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

      // Handle options.
      var prettify = prettifyHTML(srcFile, options);
      if(options.condense === true) {
        prettify = prettify.replace(/(\n|\r){2,}/g, '\n');
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

  var prettifyHTML = function(source, options) {
    try {
      return htmlprettify(source, options);
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn('HTML beautification failed.');
    }
  };
};
