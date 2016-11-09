var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

var commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    },

    devtool: 'source-map',

    htmlLoader: {
        minimize: 'false'
    },

    output: {
        path: helpers.root('build'),
        publicPath: '/',
        filename: '[name].min.js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                keep_fnames: true
            }
        }),
        new ExtractTextPlugin('[name].min.css'),
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify('production')
            }
        })
    ]
});