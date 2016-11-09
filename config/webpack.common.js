var webpack = require('webpack');
var HtmlPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var SvgStorePlugin = require('webpack-svgstore-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },

    resolve: {
        extensions: ['', '.js', '.ts']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['ts', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
             test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
             loader: 'file?name=assets/[name].[ext]'
             },
            {
                test: /\.less$/,
                exclude: helpers.root('src', 'app'),
                loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
            },
            {
                test: /\.less$/,
                include: helpers.root('src', 'app'),
                loader: 'raw!less'
            }
        ]
    },

    output: {
        path: helpers.root('build'),
        publicPath: 'http://localhost:8080/',
        filename: '[name].min.js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new ExtractTextPlugin('[name].min.css'),

        new HtmlPlugin({
            template: 'src/index.html'
        }),

        new SvgStorePlugin({
            prefix: '',
            svgoOptions: {
                plugins: [
                    { removeDimensions: true },
                    { removeTitle: true },
                ]
            }
        })
    ],

    postcss: function () {
        return [
            require('autoprefixer')({
                browsers: ['last 2 versions']
            })
        ];
    },
};