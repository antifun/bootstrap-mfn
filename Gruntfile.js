module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    aws: grunt.file.readJSON("../grunt-aws.json"),

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
    },

    s3: {
      options: {
        key: '<%= aws.mfn.key %>',
        secret: '<%= aws.mfn.secret %>',
        bucket: '<%= aws.mfn.bucket %>',
        access: 'public-read'
      },
      publish: {
        upload: [
          {
            src: 'dist/**',
            dest: '/',
            rel: 'dist/'
          }
        ]
      }
    }
  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  grunt.registerTask("default", ["less", "copy", "s3:publish"]);
};
