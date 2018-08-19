const
    autoprefixer = require('autoprefixer'),
    path = require('path'),
    pkg = require('./package.json'),
    webpack = require('webpack'),
    SvgStorePlugin = require('webpack-svgstore-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env, options) => {
    const config = {
        devtool: options.mode === 'development' ? 'cheap-module-eval-source-map' : false,
        entry: {
            bundle: [
                'babel-polyfill',
                './source/index.jsx'
            ]
        },
        output: {
            path: path.join(__dirname, '/public'),
            filename: 'build/[name].min.js'
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
                        path.resolve(__dirname, 'source'),
                    ]
                },
                {
                    test: /\.less$/,
                    exclude: [
                        path.resolve(__dirname, 'node_modules')
                    ],
                    include: [
                        path.resolve(__dirname, 'source')
                    ],
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [{
                            loader: 'css-loader',
                            options: {
                                minimize: options.mode === 'production',
                                sourceMap: options.mode === 'development'
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers: ['last 2 versions']
                                    })
                                ],
                                sourceMap: options.mode === 'development' ? 'inline' : false
                            }
                        }, {
                            loader: 'less-loader',
                            options: {
                                sourceMap: options.mode === 'development',
                                sourceMapContents: options.mode === 'development'
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
                        path.resolve(__dirname, 'source')
                    ]
                },
                {
                    test: /\.(woff|woff2)$/,
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]',
                        publicPath: './'
                    }
                },
                {
                    test: /\.(jpeg|png|gif|svg)$/i,
                    use: 'url-loader'
                },
            ]
        },
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'all'
                    }
                }
            }
        },
        plugins: [
            new ExtractTextPlugin({
                allChunks: true,
                filename: 'build/bundle.min.css'
            }),
            new SvgStorePlugin({
                svgoOptions: {
                    plugins: [
                        {cleanupEnableBackground: true},
                        {removeAttrs: {attrs: ['stroke']}},
                        {removeComments: true},
                        {removeDoctype: true},
                        {removeMetadata: true},
                        {removeTitle: true},
                        {removeUselessStrokeAndFill: true},
                        {removeXMLNS: true}
                    ]
                },
                prefix: 'icon-'
            })
        ],
        resolve: {
            alias: {
                '~': path.resolve(__dirname, 'source')
            },
            extensions: ['.js', '.jsx']
        }
    };

    return config
};