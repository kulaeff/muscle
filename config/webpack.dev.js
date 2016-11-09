var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var helpers = require('./helpers');

var commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    },

    devtool: 'inline-source-map',

    output: {
        path: helpers.root('build'),
        publicPath: 'http://localhost:8080/',
        filename: '[name].min.js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify('development')
            }
        })
    ]
});