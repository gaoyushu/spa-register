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
      files: {
        expand: true,
        src: ["css/*.css"],
        dest: "dist/"
      }
    },
    uglify: {
      files: {
        expand: true,
        src: ["js/*.js"],
        dest: "dist/"
      }
    },
    copy: {
      files: {
        expand: true,
        src: ["img/*"],
        dest: "dist/"
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-copy");

  grunt.registerTask("default", ["htmlmin", "cssmin", "uglify", "copy"]);
  grunt.registerTask("styleMin", ["cssmin", "rev", "usemin"]);
};
