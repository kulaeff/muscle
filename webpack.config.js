const
    autoprefixer = require('autoprefixer'),
    package = require('./package.json'),
    path = require('path'),
    webpack = require('webpack'),
    SvgStorePlugin = require('webpack-svgstore-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    env = process.env.NODE_ENV;

module.exports = {
    devtool: env === 'development' ? 'cheap-module-eval-source-map' : false,
    entry: {
        bundle: [
            'babel-polyfill',
            './src/index.jsx'
        ]
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].min.js',
        publicPath: '/build/'
    },
    module: {
        rules: [
            {
                test: /\.(?:jsx?)$/,
                use: [
                    'eslint-loader'
                ],
                enforce: 'pre',
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                ],
                include: [
                    path.resolve(__dirname, 'src'),
                ]
            },
            {
                test: /\.less$/,
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: env === 'production',
                            sourceMap: env === 'development'
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: env === 'development' ? 'inline' : false
                        }
                    }, {
                        loader: 'less-loader',
                        options: {
                            sourceMap: env === 'development',
                            sourceMapContents: env === 'development'
                        }
                    }]
                })
            },
            {
                test: /\.(?:jsx?)$/,
                use: 'babel-loader',
                exclude: [
                    path.resolve(__dirname, 'node_modules'),
                ],
                include: [
                    path.resolve(__dirname, 'src')
                ]
            },
            {
                test: /\.(jpeg|png|gif|svg)$/i,
                use: 'url-loader'
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(env || 'development'),
                'VERSION': JSON.stringify(package.version)
            }
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    autoprefixer({
                        browsers: ['last 2 versions']
                    })
                ]
            }
        }),
        new ExtractTextPlugin({
            allChunks: true,
            filename: 'bundle.min.css'
        }),
        new SvgStorePlugin({
            svgoOptions: {
                plugins: [
                    { cleanupEnableBackground: true },
                    { removeAttrs: { attrs: ['stroke'] }},
                    { removeComments: true },
                    { removeDoctype: true },
                    { removeMetadata: true },
                    { removeTitle: true },
                    { removeUselessStrokeAndFill: true },
                    { removeXMLNS: true }
                ]
            },
            prefix: 'icon-'
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    }
}

if (env === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // this assumes your vendor imports exist in the node_modules directory
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        })
    )
    module.exports.plugins.push(
        //new webpack.NoEmitOnErrorsPlugin()
    )
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    )
}