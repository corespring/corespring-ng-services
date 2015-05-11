#Gruntfile.coffee
module.exports = (grunt) ->

  config =
    pkg: grunt.file.readJSON('package.json')
    clean: ["dist"]
    concat:
      options:
        separator: ';'
      dist:
        src: ['lib/**/*.js']
        dest: "dist/<%= pkg.name %>.js"
    uglify:
      options:
        banner: """/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n"""
      build:
        files:
          "dist/<%= pkg.name %>.min.js": ["dist/<%= pkg.name %>.js"]
    jasmine: 
      unit:
        src: 'dist/corespring-ng-services.js',
        options:
          specs: 'spec/*-test.js',
          helpers: 'spec/*-helper.js'
          template: 'spec/runner/angular-runner.tmpl'

  grunt.initConfig config
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'

  grunt.registerTask 'default', ['clean', 'concat', 'uglify']
  grunt.registerTask 'test', ['default', 'jasmine']