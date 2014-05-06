module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    clean: {
      dist: ['dist']
    },

    less: {
      compile: {
        options: {
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: 'dist/css/<%= pkg.name %>.css.map'
        },
        files: {
          'dist/css/<%= pkg.name %>.css': 'src/less/styles.less'
        }
      },
    },

    copy: {
      html: {
        expand: true,
        cwd: 'src/',
        src: ["**/*.html"],
        dest: "dist/"
      },
      images: {
        expand: true,
        cwd: 'src/',
        src: ["images/**"],
        dest: "dist/"
      }
    }

  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  grunt.registerTask("default", ["less", "copy"]);
};
