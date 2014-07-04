// See http://docs.busterjs.org/en/latest/modules/buster-configuration/
var config = module.exports;

config['Dev tests'] = {
	environment: 'browser'
	, rootPath: '../'
	, src: ['src/**/*.js']
	, specs: ['test/spec/**/*.js']
};