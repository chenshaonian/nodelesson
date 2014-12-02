module.exports = function(grunt) {

	grunt.initConfig({
		watch:{
			js: {
				files:['test/*.js'],
				options:{
					livereload: true
				}
			}
		},
		nodemon:{
			dev:{
				script:'app.js',
				options:{
					file:'app.js',
					args:[],
					ignoredFiles:['README.md', 'node_modules/**', '.DS_Store'],
					watchedExtensions:['js'],
					watchedFolders:['./'],
					debug:true,
					delayTime:1,
					env:{
						PORT:3000
					},
					cwd:__dirname
				}
			}
		},
		concurrent:{
			tasks:['nodemon:dev'],
			options:{
				logConcurrentOutput: true
			}
		}

})

	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.option('force', true);
	grunt.registerTask('default',['concurrent']);
}