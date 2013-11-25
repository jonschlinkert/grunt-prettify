/*
 * grunt-prettify
 * https://github.com/jonschlinkert/grunt-prettify
 *
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Lint.
    jshint: {
      options: {jshintrc: '.jshintrc'},
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ]
    },

    // Build HTML for tests.
    assemble: {
      options: {
        flatten: true,
        assets: 'test/actual/assets',
        layout: 'test/fixtures/layouts/default.hbs',
        partials: 'test/fixtures/includes/*.hbs',
        data: 'test/fixtures/data/*.{json,yml}'
      },
      pages: {
        src: ['test/fixtures/pages/*.hbs'],
        dest: 'test/actual/ugly/'
      }
    },

    prettify: {
      options: {
        config: '.jsbeautifyrc',
        padcomments: true,
        condense: true
      },
      one: {
        options: {
          indent: 6
        },
        src: 'test/actual/ugly/index.html',
        dest: 'test/actual/index.html'
      },
      all: {
        options: {
          indent: 2
        },
        files: [
          {expand: true, cwd: 'test/actual/ugly/', ext: '.html', src: ['*.html'], dest: 'test/actual/pretty/'}
        ]
      }
    },

    // Before generating any new files,
    // remove files from previous build.
    clean: {
      dest: {
        pages: ['dist/*.html', 'index.html']
      }
    }
  });

  // Actually load this plugin.
  grunt.loadTasks('tasks');

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-readme');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'clean', 'assemble', 'prettify', 'readme']);

};
