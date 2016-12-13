var path = require('path');
var webpack = require('webpack');
var svgStore = require('webpack-svgstore-plugin');

module.exports = {
    devServer: {
        historyApiFallback: {
            index: '/',
        },
    },
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        'babel-polyfill',
        './src/index.jsx'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    module: {
        preLoaders: [
            {
                test: /\.(?:jsx?)$/,
                loaders: [
                    'eslint'
                ],
                include: [
                    path.resolve(__dirname, "src"),
                ],
            }
        ],
        loaders: [
            {
                test: /\.less$/,
                loader: 'style!css!less',
            },
            {
                loaders: [
                    'react-hot',
                    'babel-loader'
                ],
                include: [
                    path.resolve(__dirname, "src")
                ],
                test: /\.(?:jsx?)$/,
                plugins: [
                    'transform-runtime'
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new svgStore({
            svgoOptions: {
                plugins: [
                    { removeTitle: true }
                ]
            },
            prefix: 'icon-'
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}