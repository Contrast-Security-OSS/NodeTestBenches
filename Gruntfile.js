'use strict';

module.exports = function(grunt) {
  // Load the project's grunt tasks from a directory
  // eslint-disable-next-line node/no-unpublished-require
  require('grunt-config-dir')(grunt, {
    configDir: require('path').resolve('tasks')
  });

  // Register group tasks
  grunt.registerTask('build', ['dustjs', 'copyto']);
};
