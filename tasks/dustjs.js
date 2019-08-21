'use strict';

const path = require('path');

module.exports = function dustjs(grunt) {
  // Load task
  grunt.loadNpmTasks('grunt-dustjs');

  // Options
  return {
    build: {
      files: [
        {
          expand: true,

          cwd: 'public/templates/',

          src: '**/*.dust',
          dest: '.build/templates',
          ext: '.js'
        }
      ],
      options: {
        fullname(filepath) {
          return path
            .relative('public/templates/', filepath)
            .replace(/[.]dust$/, '');
        }
      }
    }
  };
};
