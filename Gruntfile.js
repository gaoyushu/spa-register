module.exports = function(grunt) {
  grunt.initConfig({
    htmlmin: {
      options: {
        collapseWhitespace: true,
        preserveLineBreaks: false
      },
      files: {
        src: "./index.html",
        dest: "dist/index.html"
      }
    },
    cssmin: {
        files:{
            src: ["src/*.css"],
            dest: "dist/"
        }
    },
    uglify: {
      release: {
        files:{
            src: ["src/*.js"],
            dest: "dist/"
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask(['htmlmin', 'cssmin', 'uglify:release']);

};
