#Gruntfile.coffee
module.exports = (grunt) ->

  config =
    pkg: grunt.file.readJSON('package.json')
    clean: ["dist"]
    coffee: 
  	  compile: 
  	    files: 
  	      'dist/<%= pkg.name %>.js': ['lib/*.coffee'] #compile and concat into single file

    uglify:
      options:
        banner: """/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n"""
      build:
        files:
          "dist/<%= pkg.name %>.min.js": ["dist/<%= pkg.name %>.js"]

  grunt.initConfig config
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-copy'

  grunt.registerTask 'default', ['clean', 'coffee', 'uglify']