
module.exports = function(grunt,dirname) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-chmod');
  grunt.loadNpmTasks('grunt-ng-annotate');

  // Gruntfile.js

  grunt.initConfig({

      // configure jshint to validate js files -----------------------------------
      jshint: {
        options: {
          reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
        },

        // when this task is run, lint the Gruntfile and all js files in src
        build: ['Gruntfile.js', 'src/angular/**/*.js']
      },

      // get the configuration info from package.json ----------------------------
      // this way we can use things like name and version (pkg.name)
      pkg: grunt.file.readJSON('package.json'),

      // configure uglify to minify js files -------------------------------------
      uglify: {
        options: {
          banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
        },
        min: {
          files: [{
              expand: true,
              cwd: 'src/angular/',
              src: '**/*.js',
              dest: 'dist/angular'
          },{
              expand: true,
              cwd: 'src/',
              src: '**/*.js',
              dest: 'dist/'
          }]
        }
      },

      ngAnnotate: {
          build: {
            files: [{
                expand: true,
                src: 'src/angular/**/*.js'
            }
          ]
        }
      },

      copy: {
        main: {
          files: [{
              expand: true,
              cwd: 'src/angular/',
              src: ['**'],
              dest: 'dist/angular',
              options: {
                mode: '0777'
              }
          },{
              expand: true,
              src: 'src/lenguages.js',
              dest: 'dist/',
              options: {
                mode: '0777'
              }
          }, {
              expand: true,
              cwd: 'src/css/',
              src: ['**'],
              dest: 'dist/css',
              options: {
                mode: '0777'
              }
          }],
        },
      },

      // configure uglify to minify css files -------------------------------------
      cssmin: {
        options: {
          banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
        },
        min: {
          files: [{
              expand: true,
              cwd: 'src/css',
              src: '*.css',
              dest: 'dist/css'
          }]
        }
      },

      watch: {
        css: {
          files: ['src/css/*.css'],
          tasks: ['cssmin']
        },
        js: {
          files: ['src/angular/**/*.js'],
          tasks: ['ngAnnotate','uglify']
        },
        dev: {
          files: ['src/angular/**/*.js','src/css/*.css'],
          tasks: ['copy',]
        },
        options: {
          nospawn: true,
        }
      },

      clean: {
        build: {
          src: ["dist/angular/*.js", "dist/css/*.css"]
        }
      },

      chmod: {
        options: {
          mode: '755'
        },
        target: {
          // Target-specific file/dir lists and/or options go here.
          src: ['dist/']
        }
      }

  });

};



