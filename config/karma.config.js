var webpackConfig = require('./webpack.test');

module.exports = function (config) {
    var _config = {
        basePath: '',
        browsers: ['PhantomJS'],
        colors: true,
        frameworks: ['jasmine'],
        files: [
            {pattern: './karma-test-shim.js', watched: false}
        ],
        preprocessors: {
            './karma-test-shim.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            stats: 'errors-only'
        },
        webpackServer: {
            noInfo: true
        },
        singleRun: true
    };

    config.set(_config);
};