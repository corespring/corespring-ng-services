#Gruntfile.coffee
module.exports = (grunt) ->

  config =
    pkg: grunt.file.readJSON('package.json')
    clean: ["dist"]
    coffee:
  	  compile: 
   	    files: 
   	      'dist/<%= pkg.name %>.js': ['lib/*.coffee'] #compile and concat into single file
      specs: 
        options:
          bare: true
        expand: true
        flatten: true
        src: ['spec/*.coffee']
        dest: 'spec'
        ext: '.js'
      
    uglify:
      options:
        banner: """/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n"""
      build:
        files:
          "dist/<%= pkg.name %>.min.js": ["dist/<%= pkg.name %>.js"]

    jasmine: 
      customTemplate: 
        src: 'dist/<%= pkg.name %>.js',
        options: 
          specs: 'spec/*-test.js',
          helpers: 'spec/*-helper.js'
          template: 'spec/runner/angular-runner.tmpl'
      
    
  

  grunt.initConfig config
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'

  grunt.registerTask 'default', ['clean', 'coffee', 'uglify']
  grunt.registerTask 'test', [ 'default', 'coffee:specs', 'jasmine']