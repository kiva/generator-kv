
module.exports = function(grunt) {
	'use strict';


	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
		, src: 'src'
		, dist: 'dist'


		, meta: {
			version: '<%%= pkg.version %>'
			, banner: '/**\n * <%%= pkg.name %> - v<%%= meta.version %> \n' +
				' * Copyright (c) <%%= grunt.template.today("yyyy") %> Kiva Microfunds\n' +
				' * \n' +
				' * Licensed under the MIT license.\n' +
				' * <%%= pkg.licenses[0].url %>\n' +
				' */\n'

		}


		, buster: {
			dev: {
				test: {
					reporter: 'specification'
				}
			}
		}


		// @todo %manually-configure% only open source libraries get free hosting with coveralls
		, coveralls: {
			options: {
				src: 'test/coverage/lcov.info'
				, force: true
			}
		}


		, jshint: {
			options: {
				jshintrc: '.jshintrc'
			}
			, all: ['src/*.js', 'test/spec/**/*.js']
		}


		, rig: {
			compile: {
				options: {
					banner: '<%%= meta.banner %>'
				}
				, files: {
					// @todo %manually-configure% for now, <filename> will need to be set manually
					'<%%= dist %>/iife/<filename>': ['build/_iife.js']
					, '<%%= dist %>/amd/<filename>': ['build/_amd.js']
				}
			}
		}


		, shell: {
			'rm-dist': {
				options: {
					stderr: false
				},
				command: 'rm -rf dist/*'
			}
		}


		, uglify: {
			target: {
				options: {
					banner: '<%%= meta.banner %>'
				}
				// @todo %manually-configure% for now, <filename> will need to be set manually
				, files: {
					'<%%= dist %>/iife/<filename>.min.js': ['<%%= dist %>/iife/<filename>.js']
					, '<%%= dist %>/amd/<filename>.min.js': ['<%%= dist %>/amd/<filename>.js']
				}
			}
		}
	});


	grunt.loadNpmTasks('grunt-buster');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-coveralls');
	grunt.loadNpmTasks('grunt-rigger');
	grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask('test', ['jshint', 'buster']);
	grunt.registerTask('build', ['shell:rm-dist', 'rig', 'uglify']);
};