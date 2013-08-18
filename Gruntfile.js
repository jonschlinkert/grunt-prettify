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

    // Assemble test HTML pages.
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
      options: {config: '.jsbeautifyrc'},
      one: {
        src: 'test/actual/ugly/index.html',
        dest: 'test/actual/pretty/index.html'
      },
      all: {
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
  grunt.loadNpmTasks('assemble-internal');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Tests to be run.
  grunt.registerTask('test', ['jshint']);

  // Generate the README.
  grunt.registerTask('docs', ['assemble-internal']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test', 'clean', 'assemble', 'prettify']);

};
