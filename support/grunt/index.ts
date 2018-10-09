import * as config from './config';
import { basename, extname, join } from 'path';
import { readdirSync } from 'fs';
import { initConfig } from 'grunt-dojo2';

export = function (grunt: any) {
	require('load-grunt-tasks')(grunt);
	grunt.loadNpmTasks('webserv');
	grunt.loadNpmTasks('intern');
	grunt.loadNpmTasks('grunt-dojo2-extras');

	const tasksDirectory = join(__dirname, 'tasks');
	readdirSync(tasksDirectory).filter(function (path) {
		return extname(path) === '.ts';
	}).forEach(function (file) {
		const mid = join(tasksDirectory, basename(file, '.ts'));
		require(mid)(grunt);
	});

	// grunt.initConfig(config);
	
	initConfig(grunt, config);

	grunt.registerTask('default', ['hexoClean', 'clean', 'sync', 'concurrent:build']);
	grunt.registerTask('generate', ['hexo']);
	// grunt.registerTask('test', ['clean:compiledFiles', 'tslint', 'shell:build-ts', 'intern']);
	grunt.registerTask('test', ['tslint']);
	grunt.registerTask('init', ['prompt:github', 'initAutomation']);
	grunt.registerTask('ci', ['prebuild', 'default']);
	grunt.registerTask(
		'dist',
		(grunt.config.get('distTasks') as string[]).concat([
			'postcss:modules-dist',
			'postcss:variables',
			'copy:distFonts'
		])
	);
};