module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //concat files
    concat: {
      options: {
        separator: '\n\n'
      },
      app : {
        src: ['public/js/plugins.js', 'public/js/trains.js', 'public/js/events.js'],
        dest: 'public/js/packed/app.js'
      }
    },
    //uglify files
    uglify: {
      options: {
        banner: '/* <%= pkg.name %> <%= grunt.template.today("mm.dd.yyyy") %> */\n'
      },
      dist: {
        files: {
          'public/js/packed/app.min.js': ['<%= concat.app.dest %>']
        }
      }
    },
    //lint
    jshint: {
      files: ['<%= concat.app.src %>']
    },
    //watch files
    watch: {
      files: ['<%= concat.app.src %>', '<%= concat.plugins.src %>'],
      tasks: ['concat', 'uglify']
    }
  });

  //Dependencies
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');

  //Tasks  
  grunt.registerTask('hint', ['jshint']);
  grunt.registerTask('default', ['concat', 'uglify', 'jshint']);
  grunt.registerTask('production', ['concat', 'uglify']);

  return grunt;

};