'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


var KvGenerator = yeoman.generators.Base.extend({
	init: function () {
		this.pkg = require('../package.json');

		this.on('end', function () {
			if (!this.options['skip-install']) {
				this.installDependencies();
			}
		});
	},


	askFor: function () {
		var done = this.async();

        this.log(yosay('Welcome to the maauvoulous Kv generator!'));

        var prompts = [{
	        name: 'libname',
			message: 'What will be the name your library?'
        }];

        this.prompt(prompts, function (props) {
	        this.libname = props.libname;

	        done();
        }.bind(this));
	},


	enforceFolderName: function () {
		if (this.libname !== this._.last(this.destinationRoot().split(path.sep))) {
			this.destinationRoot(this.libname);
		}
	},


	gitfiles: function () {
		this.copy('gitignore', '.gitignore');
	},


	app: function () {
		this.directory('build');
		this.directory('demo');
		this.directory('src');
		this.directory('test');

		this.copy('_bower.json', 'bower.json');
		this.copy('_contributing.md', 'contributing.md');
		this.copy('_Gruntfile.js', 'Gruntfile.js');
		this.copy('_license.txt', 'license.txt');
		this.copy('_package.json', 'package.json');
		this.copy('_readme.md', 'readme.md');
		this.copy('_travis.yml', '.travis.yml');
	},


	projectfiles: function () {
		this.copy('editorconfig', '.editorconfig');
		this.copy('jshintrc', '.jshintrc');
	}
});

module.exports = KvGenerator;