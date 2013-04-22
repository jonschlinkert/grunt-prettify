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

    // Before generating any new files, 
    // remove any previously-created files.
    clean: {
      dest: {
        pages: ['dist/*.html', 'index.html']
      }
    },

    // Assemble test HTML pages.
    assemble: {
      options: {flatten: true},
      pages: {
        options: {
          assets: 'test/actual/assets',
          layout: 'test/fixtures/layouts/default.hbs',
          partials: 'test/fixtures/partials/*.hbs',
          data: 'test/fixtures/data/*.{json,yml}'
        },
        src: ['test/fixtures/pages/*.hbs'],
        dest: 'test/actual/ugly/'       
      },
      // Build readme.
      readme: {
        options: {
          pkg: grunt.file.readJSON('package.json'),
          partials: ['docs/*.hbs'],
          data: 'docs/readme.yml',
          ext: ''
        },
        src:  'docs/README.md.hbs',
        dest: './'
      }
    },

    // Prettify test HTML pages from Assemble task.
    prettify: {
      options: {prettifyrc: '.prettifyrc'},
      one: {
        src: 'test/actual/ugly/index.html',
        dest: 'test/actual/pretty/index.html'
      },
      all: {
        expand: true, 
        cwd: 'test/actual/ugly/', 
        ext: '.html',
        src: ['*.html'],
        dest: 'test/actual/pretty/'
      }
    },

    // Lint.
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },


  });

  // Actually load this plugin.
  grunt.loadTasks('tasks');

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Whenever the "test" task is run, first clean previously created files,
  // then run this plugin's task(s), and then test the result.
  grunt.registerTask('test', ['prettify']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'clean', 'assemble', 'test']);

};
