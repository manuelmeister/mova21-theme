module.exports = function (grunt) {

    grunt.file.defaultEncoding = 'utf-8';

    // Project configuration
    grunt.initConfig({
        // the package file
        pkg: grunt.file.readJSON('package.json'),

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        // App Config
        //
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        app: {
            banner: '\n/*\n <%= pkg.title || pkg.name %> - <%= grunt.template.today("dd.mm.yyyy, H:MM:ss") %>\n*/\n',

            paths: {
                build: 'dist',
                build_temp: '<%=app.paths.build%>/temp'
            },

            build_file_names: {
                styles_temp: 'style.scss',
                styles: 'style.css',
                scripts: 'script.js',
                scripts_min: 'script.min.js'
            },

            sources: {
                styles: [
                    'node_modules/bootstrap/dist/css/bootstrap.min.css',
                    'node_modules/font-awesome/css/font-awesome.min.css',
                    'css/*.{scss,css}'
                ],
                scripts: [
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
                    'js/*.js'
                ]
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        // Tasks Config
        //
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%=app.paths.build%>/css/<%=app.build_file_names.styles%>': '<%=app.paths.build_temp%>/css/<%=app.build_file_names.styles_temp%>'
                }
            },
            watch: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '<%=app.paths.build%>/css/<%=app.build_file_names.styles%>': '<%=app.paths.build_temp%>/css/<%=app.build_file_names.styles_temp%>'
                }
            }
        },


        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // [grunt-postcss] postcss

        postcss: {
            build: {
                options: {
                    map: false,
                    processors: [
                        require('autoprefixer')({browsers: '> 0.25%'}) // add vendor prefixes
                    ]
                },
                files: {
                    '<%=app.paths.build%>/css/<%=app.build_file_names.styles%>': '<%=app.paths.build_temp%>/css/<%=app.build_file_names.styles%>'
                }
            },
            prod: {
                options: {
                    map: false,
                    processors: [
                        require('autoprefixer')({browsers: '> 0.25%'}) // add vendor prefixes
                    ]
                },
                files: {
                    '<%=app.paths.build%>/css/<%=app.build_file_names.styles%>': '<%=app.paths.build%>/css/<%=app.build_file_names.styles%>'
                }
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // [grunt-contrib-concat] Scripts Concatination

        concat: {
            scripts: {
                options: {
                    banner: '<%=app.banner%>'
                },
                src: ['<%=app.sources.scripts%>'],
                dest: '<%=app.paths.build%>/js/<%=app.build_file_names.scripts%>'
            },
            styles: {
                options: {
                    banner: '<%=app.banner%>'
                },
                src: ['<%=app.sources.styles%>'],
                dest: '<%=app.paths.build_temp%>/css/<%=app.build_file_names.styles_temp%>'
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // [grunt-contrib-clean] Clean Temp file
        clean: {
            temp_folder: {
                src: ['<%=app.paths.build_temp%>']
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // [grunt-concurrent] Concurrent Task Running

        concurrent: {
            build: ['build-styles', 'build-scripts'],
            prod: ['build-styles-prod', 'build-scripts-prod'],
        },

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // [grunt-contrib-watch] Watch Changes

        watch: {
            scripts: {
                files: '<%=app.sources.scripts%>',
                tasks: ['build-scripts']
            },

            styles: {
                files: ['<%=app.sources.styles%>'],
                tasks: ['build-styles']
            }
        },

        ////////////////////////////////////////////////////////////////////////////////////
        // SFTP Upload
        'sftp-deploy': {
            dev: {
                auth: {
                    host: 'dev.bula21.ch',
                    port: 22,
                    authKey: 'bula-dev'
                },
                src: './',
                dest: 'www/dev.bula21.ch/wp-content/themes/bula21/',
                exclusions: [
                    'css/**',
                    'temp/**',
                    'node_modules',
                    'js/**',
                    '.*',
                    'Gruntfile.js',
                    'package.json',
                    'package-lock.json',
                    'README.md'
                ],
                progress: true
            },
            prod: {
                auth: {
                    host: 'bula21.ch',
                    port: 22,
                    authKey: 'bula-prod'
                },
                src: './',
                dest: 'www/bula21.ch/wp-content/themes/bula21/',
                exclusions: [
                    'css/**',
                    'dev',
                    'temp/**',
                    'node_modules',
                    'js/**',
                    '.*',
                    'Gruntfile.js',
                    'package.json',
                    'package-lock.json',
                    'README.md'
                ],
                progress: true
            },
        }

    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Tasks from modules
    //
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sftp-deploy');

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Sub Tasks
    //

    // Styles Tasks
    grunt.registerTask('build-styles', ['concat:styles', 'sass:watch']);
    grunt.registerTask('build-styles-prod', ['concat:styles', 'sass:dist', 'postcss:prod', 'clean:temp_folder']);

    // Script Tasks
    grunt.registerTask('build-scripts', ['concat:scripts']);
    grunt.registerTask('build-scripts-prod', ['concat:scripts']);
    grunt.registerTask('npmi', function(){
        var exec = require('child_process').exec;
        exec('npm install');
    });

    // deploy tasks: $ grunt deploy-dev
    grunt.registerTask('deploy-dev', ['concurrent:prod', 'clean:temp_folder', 'sftp-deploy:dev']);
    grunt.registerTask('deploy-prod', ['concurrent:prod', 'sftp-deploy:prod']);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Manually call the guild task: $ grunt build
    grunt.registerTask('build', ['concurrent:build', 'clean:temp_folder']);
    grunt.registerTask('prod', ['concurrent:prod', 'clean:temp_folder']);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Set Default Task
    grunt.registerTask('default', ['npmi', 'concurrent:build', 'watch']);
};
