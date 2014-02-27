module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
	    watch: {
		    dev: {
			    files: [ 'sass/**/*.scss', 'js/compiled/**/*.js', 'js/internal/**/*.js', 'js/vendor/**/*.js', 'js/plugins/**/*.js', 'index.html' ],
			    tasks: ['dev'],
			    options: {
				    livereload: '<%= pkg.port %>',
				    atBegin: true
			    }
		    },
		    prod: {
			    files: [ 'sass/**/*.scss', 'js/compiled/**/*.js', 'js/internal/**/*.js', 'js/vendor/**/*.js', 'js/plugins/**/*.js', 'index.html' ],
			    tasks: ['prod']
		    },
		    release: {
			    files: [ 'sass/**/*.scss', 'js/compiled/**/*.js', 'js/internal/**/*.js', 'js/vendor/**/*.js', 'js/plugins/**/*.js', 'index.html' ],
			    tasks: ['release'],
			    options: {
				    livereload: '<%= pkg.port %>',
				    atBegin: true
			    }
		    }
	    },
        clean: {
            normal: [ '<%= pkg.outputFolder %>', '<%= pkg.pluginName %>-<%= pkg.pluginVersion %>/' ],
            cleanup: [ '<%= pkg.pluginName %>-<%= pkg.pluginVersion %>.zip', '<%= pkg.pluginName %>-<%= pkg.pluginVersion %>' ]
        },
	    copy: {
		    dev: {
			    files: [
				    {src: ['index.html'], dest: '<%= pkg.outputFolder %>/index.html'},
				    {src: ['images/**'], dest: '<%= pkg.outputFolder %>/'},
				    {src: ['css/**'], dest: '<%= pkg.outputFolder %>/'},
				    {src: ['js/internal/**'], dest: '<%= pkg.outputFolder %>/'},
				    {src: ['js/plugins/**'], dest: '<%= pkg.outputFolder %>/'},
				    {src: ['js/vendor/**'], dest: '<%= pkg.outputFolder %>/'},
				    {src: ['js/compiled/**'], dest: '<%= pkg.outputFolder %>/'}
			    ]
		    },
		    prod: {
			    files: [
				    {src: ['index.html'], dest: '<%= pkg.outputFolder %>/index.html'},
				    {src: ['images/**'], dest: '<%= pkg.outputFolder %>/'},
				    {src: ['css/'], dest: '<%= pkg.outputFolder %>/css'},
				    {src: ['js/'], dest: '<%= pkg.outputFolder %>/js'},
				    {src: ['js/compiled/<%= pkg.outputName %>-<%= pkg.version %>.js'], dest: '<%= pkg.outputFolder %>/js/<%= pkg.outputName %>-<%= pkg.version %>.js'},
                    {src: ['js/compiled/<%= pkg.pluginName %>-<%= pkg.pluginVersion %>.js'], dest: '<%= pkg.outputFolder %>/js/<%= pkg.pluginName %>-<%= pkg.pluginVersion %>.js'},
                    {src: ['js/compiled/<%= pkg.pluginName %>-<%= pkg.pluginVersion %>.min.js'], dest: '<%= pkg.outputFolder %>/js/<%= pkg.pluginName %>-<%= pkg.pluginVersion %>.min.js'},
				    {src: ['css/compiled/<%= pkg.outputName %>-<%= pkg.version %>.css'], dest: '<%= pkg.outputFolder %>/css/<%= pkg.outputName %>-<%= pkg.version %>.css'}
			    ]
		    },
		    release: {
			    files: [
				    {src: ['index.html'], dest: '<%= pkg.outputFolder %>/index.html'},
				    {src: ['images/**'], dest: '<%= pkg.outputFolder %>/'},
				    {src: ['css/'], dest: '<%= pkg.outputFolder %>/css'},
				    {src: ['js/'], dest: '<%= pkg.outputFolder %>/js'},
				    {src: ['js/compiled/<%= pkg.outputName %>-<%= pkg.version %>.min.js'], dest: '<%= pkg.outputFolder %>/js/<%= pkg.outputName %>-<%= pkg.version %>.min.js'},
                    {src: ['js/compiled/<%= pkg.pluginName %>-<%= pkg.pluginVersion %>.js'], dest: '<%= pkg.outputFolder %>/js/<%= pkg.pluginName %>-<%= pkg.pluginVersion %>.js'},
                    {src: ['js/compiled/<%= pkg.pluginName %>-<%= pkg.pluginVersion %>.min.js'], dest: '<%= pkg.outputFolder %>/js/<%= pkg.pluginName %>-<%= pkg.pluginVersion %>.min.js'},
                    {src: ['css/compiled/<%= pkg.outputName %>-<%= pkg.version %>.min.css'], dest: '<%= pkg.outputFolder %>/css/<%= pkg.outputName %>-<%= pkg.version %>.min.css'}
                ]
		    },
            zipup: {
                files: [
                    { expand: true, flatten: true, src: [ 'js/compiled/<%= pkg.pluginName %>-<%= pkg.pluginVersion %>.js' ], dest: '<%= pkg.pluginName %>-<%= pkg.pluginVersion %>/js' },
                    { expand: true, flatten: true, src: [ 'js/compiled/<%= pkg.pluginName %>-<%= pkg.pluginVersion %>.min.js' ], dest: '<%= pkg.pluginName %>-<%= pkg.pluginVersion %>/js' }
                ]
            },
            movezip: {
                files: [
                    { expand: true, flatten: true, src: '<%= pkg.pluginName %>-<%= pkg.pluginVersion %>.zip', dest: '<%= pkg.outputFolder %>/download/' }
                ]
            }
	    },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'css/main.css': 'sass/main.scss',
                    'css/<%= pkg.name %>.css': 'sass/<%= pkg.name %>.scss'
                }
            }
        },
	    concat: {
		    options: {
			    // define a string to put between each file in the concatenated output
                stripBanners: true,
			    separator: '\n\n/* \'use strict\' */\n\n'
		    },
		    jsconcat: {
			    src: [
				    'js/plugins/jquery-1.9.1.js',
                    'js/plugins/<%= pkg.pluginName %>-<%= pkg.pluginVersion %>.js',
				    'js/vendor/knockout-2.2.1.js',
				    'js/vendor/TweenMax.min.js',
				    'js/internal/Crivas.Main.js',
				    'js/internal/Crivas.Documentation.js',
				    'js/internal/Crivas.ImageData.js',
				    'js/internal/Crivas.ViewModel.js',
				    'js/internal/Crivas.Init.js'
			    ],
			    dest: 'js/compiled/<%= pkg.outputName %>-<%= pkg.version %>.js'
		    },
            pluginconcat: {
                src: [
                    'js/plugins/<%= pkg.pluginName %>-<%= pkg.pluginVersion %>.js'
                ],
                dest: 'js/compiled/<%= pkg.pluginName %>-<%= pkg.pluginVersion %>.js'
            },
		    cssconcat: {
			    src: [
				    'css/reset.css',
				    'css/main.css',
				    'css/<%= pkg.name %>.css'
			    ],
			    dest: 'css/compiled/<%= pkg.outputName %>-<%= pkg.version %>.css'
		    }
	    },
	    uglify: {
		    options: {
			    report: 'min',
                stripBanners: true
		    },
		    dist: {
			    files: {
				    'js/compiled/<%= pkg.outputName %>-<%= pkg.version %>.min.js': [
					    'js/compiled/<%= pkg.outputName %>-<%= pkg.version %>.js'
				    ]
			    }
		    },
            plugin: {
                files: {
                    'js/compiled/<%= pkg.pluginName %>-<%= pkg.pluginVersion %>.min.js': [
                        'js/compiled/<%= pkg.pluginName %>-<%= pkg.pluginVersion %>.js'
                    ]
                }
            }
	    },
	    cssmin: {
		    compress: {
			    options: {
                    stripBanners: true
			    },
			    files: {
				    'css/compiled/<%= pkg.outputName %>-<%= pkg.version %>.min.css': [
					    'css/compiled/<%= pkg.outputName %>-<%= pkg.version %>.css'
				    ]
			    }
		    }
	    },
        connect: {
            dev: {
                options: {
                    port: '<%= pkg.port %>',
                    base: '<%= pkg.outputFolder %>',
                    livereload: '<%= pkg.port %>'
                }
            },
            prod: {
                options: {
                    port: '<%= pkg.port %>',
                    base: '<%= pkg.outputFolder %>',
                    livereload: '<%= pkg.port %>'
                }
            },
            release: {
                options: {
                    port: '<%= pkg.port %>',
                    base: '<%= pkg.outputFolder %>',
                    livereload: '<%= pkg.port %>'
                }
            }
        },
	    env: {
	    	options : {
		    	LIVE_RELOAD: false
		    },
		    dev: {
			    NODE_ENV: 'DEV'
		    },
		    prod: {
			    NODE_ENV: 'PROD'
		    },
		    release: {
			    NODE_ENV: 'RELEASE'
		    },
		    watching: {
		    	LIVE_RELOAD: true
		    }
	    },
	    preprocess: {
            options: {
                context: {
                    name: '<%= pkg.name %>',
                    title: '<%= pkg.title %>',
                    outputName: '<%= pkg.outputName %>',
                    version: '<%= pkg.version %>',
                    pluginName: '<%= pkg.pluginName %>',
                    pluginVersion: '<%= pkg.pluginVersion %>',
                    packageFileName: 'download/<%= pkg.pluginName %>-<%= pkg.pluginVersion %>.zip',
                    port: '<%= pkg.port %>'
                }
            },
		    dev: {
			    src: 'index.html',
			    dest: '<%= pkg.outputFolder %>/index.html'
		    },
		    prod: {
			    src: 'index.html',
			    dest: '<%= pkg.outputFolder %>/index.html'
		    },
		    release: {
			    src: 'index.html',
			    dest: '<%= pkg.outputFolder %>/index.html'
		    }
	    },
        'ftp-deploy': {
            build: {
                auth: {
                    host: 's141590.gridserver.com',
                    port: 21,
                    authKey: 'key1'
                },
                src: '<%= pkg.outputFolder %>',
                dest: '/domains/crivas.net/html/git/<%= pkg.name %>'
            }
        },
        compress: {
            main: {
                options: {
                    archive: '<%= pkg.pluginName %>-<%= pkg.pluginVersion %>.zip'
                },
                files: [
                    {
                        expand: false,
                        flatten: false,
                        src: [ '<%= pkg.pluginName %>-<%= pkg.pluginVersion %>/**' ]
                    }
                ]
            }
        }
    });

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-ftp-deploy');

    // Default task(s).
	grunt.registerTask('watchdev', [ 'connect:dev', 'env:watching', 'watch:dev' ]);
	grunt.registerTask('watchprod', [ 'connect:prod', 'env:watching', 'watch:prod' ]);
	grunt.registerTask('watchrelease', [ 'connect:release', 'env:watching', 'watch:release' ]);
	grunt.registerTask('dev', [ 'env:dev', 'sass', 'clean:normal', 'concat:pluginconcat', 'copy:dev', 'preprocess:dev' ]);
	grunt.registerTask('prod', [ 'env:prod', 'sass', 'clean:normal', 'concat', 'copy:prod', 'preprocess:prod' ]);
    grunt.registerTask('release', [ 'env:release', 'sass', 'clean:normal', 'concat', 'uglify', 'cssmin', 'copy:release', 'copy:zipup', 'compress', 'copy:movezip', 'clean:cleanup', 'preprocess:release' ]);
    grunt.registerTask('deploy', [ 'ftp-deploy' ]);
    grunt.registerTask('launch', [ 'release', 'deploy' ]);
    grunt.registerTask('default', ['dev']);

};