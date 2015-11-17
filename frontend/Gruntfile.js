module.exports = function (grunt) {
  grunt.initConfig({


    //jade: {
    //    development: {
    //        options: {
    //            data: {
    //                debug: false,
    //                env: 'development'
    //            }
    //        },
    //        files: [{
    //            cwd: "app",
    //            src: ["**/*.jade",'!scripts-dev.jade','!scripts-prod.jade'],
    //            dest: "public",
    //            ext: ".html",
    //            expand: true
    //        }]
    //    },
    //    production: {
    //        options: {
    //            data: {
    //                debug: false,
    //                env: 'production'
    //            }
    //        },
    //        files: [{
    //            cwd:"app",
    //            src: ["**/*.jade",'!scripts-dev.jade','!scripts-prod.jade','!development/**/*.jade'],
    //            dest: "public",
    //            ext: ".html",
    //            expand: true
    //        }]
    //    }
    //
    //},
    //concat: {
    //    options: {
    //        separator: ';'
    //    },
    //    development: {
    //        src: ['app/app.js', 'app/**/*.js', '!app/config.js'],
    //        dest: 'public/app.js'
    //    },
    //    production: {
    //        src: ['app/app.js', 'app/**/*.js', '!app/config.js', '!app/development/**/*.js'],
    //        dest: 'temp/app.concat.js'
    //    }
    //},
    //ngAnnotate: {
    //    options: {
    //        singleQuotes: true
    //    },
    //    app: {
    //        expand: true,
    //        src: ['temp/*.js'],
    //        ext: ".annotated.js"
    //    }
    //},
    //uglify: {
    //    production: {
    //        files: {
    //            'public/js/app.min.js': ['temp/app.annotated.js']
    //        }
    //    }
    //},
    //clean: {
    //    public: ['public'],
    //    temp: ['temp']
    //},
    //copy: {
    //    development: {
    //        files: [
    //            {expand: true, cwd: 'app/css/', src: '*.css', dest: 'public/css'},
    //            {expand: true, cwd: 'app/img/', src: '*.*', dest: 'public/img'},
    //
    //            {expand: true, cwd: 'app', src: 'config.js', dest: 'public'},
    //
    //            {expand: true, cwd: 'bower_components/angular', src: 'angular.js', dest: 'public/vendor/js'},
    //            {expand: true, cwd: 'bower_components/ui-router/release', src: 'angular-ui-router.js', dest: 'public/vendor/js'},
    //            {expand: true, cwd: 'bower_components/lodash', src: 'lodash.js', dest: 'public/vendor/js'},
    //            {expand: true, cwd: 'bower_components/restangular/dist', src: 'restangular.js', dest: 'public/vendor/js'},
    //            {expand: true, cwd: 'bower_components/angular-cookies', src: 'angular-cookies.js', dest: 'public/vendor/js'},
    //            {expand: true, cwd: 'bower_components/angular-loading-bar/build', src: 'loading-bar.js', dest: 'public/vendor/js'},
    //            {expand: true, cwd: 'bower_components/angular-loading-bar/build', src: 'loading-bar.css', dest: 'public/vendor/css'},
    //            {expand: true, cwd: 'bower_components/angular-bootstrap', src: 'ui-bootstrap-tpls.min.js', dest: 'public/vendor/js'},
    //            {expand: true, cwd: 'bower_components/bootstrap/dist/fonts', src: '*.*', dest: 'public/vendor/fonts'},
    //            {expand: true, cwd: 'bower_components/bootstrap/dist/css', src: ['bootstrap.min.css','bootstrap.css.map'], dest: 'public/vendor/css'},
    //            {expand: true, cwd: 'bower_components/jquery/dist', src: 'jquery.js', dest: 'public/vendor/js'},
    //            {expand: true, cwd: 'bower_components/bootstrap/dist/js', src: 'bootstrap.js', dest: 'public/vendor/js'},
    //            {expand: true, cwd: 'bower_components/bootstrap/js', src: 'dropdown.js', dest: 'public/vendor/js'}]
    //    },
    //    production: {
    //        files: [
    //            //{expand: true, cwd: 'app/css/', src: '*.css', dest: 'distrib/css'},
    //            //{expand: true, cwd: 'app/', src: 'img/*.*', dest: 'distrib'},
    //            //{expand: true, cwd: 'app/', src: 'config.js', dest: 'distrib/js'}
    //        ]
    //    }
    //},

    watch: {
      scr: {
        files: ['app/**/*.*', 'index.html'],
        tasks: ['default']
      },
      options: {
        livereload: true
      }
    }
  });
  /*
   grunt.loadNpmTasks('grunt-contrib-jade');
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-ng-annotate');
   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   */
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['clean:public', 'jade:development', 'concat:development', 'copy:development']);
};
