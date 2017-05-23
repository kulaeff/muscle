const
    autoprefixer = require('autoprefixer'),
    path = require('path'),
    pkg = require('./package.json'),
    webpack = require('webpack'),
    SvgStorePlugin = require('webpack-svgstore-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
    const config = {
        devtool: env.development ? 'cheap-module-eval-source-map' : false,
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
                                minimize: env.production,
                                sourceMap: env.development
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers: ['last 2 versions']
                                    })
                                ],
                                sourceMap: env.development ? 'inline' : false
                            }
                        }, {
                            loader: 'less-loader',
                            options: {
                                sourceMap: env.development,
                                sourceMapContents: env.development
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
                    test: /\.(jpeg|png|gif|svg)$/i,
                    use: 'url-loader'
                },
            ]
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: function (module) {
                    return module.context && module.context.indexOf('node_modules') !== -1;
                }
            }),
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
            extensions: ['.js', '.jsx']
        }
    };

    if (env.production) {
        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env.VERSION': JSON.stringify(pkg.version)
            })
        );
        config.plugins.push(
            new webpack.NoEmitOnErrorsPlugin()
        );
    }

    return config
};