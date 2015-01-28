// See http://docs.busterjs.org/en/latest/modules/buster-configuration/
var config = module.exports;

config['Dev tests'] = {
	environment: 'browser'
	, rootPath: '../'
	, deps: []
	, src: ['src/**/*.js']
	, specs: ['test/spec/**/*.js']
	, extensions: [
		require('buster-istanbul')
	]
	, 'buster-istanbul': {
		outputDirectory: 'test/coverage',
		format: 'lcov'
	}
};