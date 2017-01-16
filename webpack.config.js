const
    path = require('path'),
    webpack = require('webpack'),
    svgStore = require('webpack-svgstore-plugin');

module.exports = {
    devServer: {
        historyApiFallback: {
            index: '/',
        },
    },
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : null,
    entry: process.env.NODE_ENV === 'prototyping' ? [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        'babel-polyfill',
        './src/index.jsx'
    ] : [
        'babel-polyfill',
        './src/index.jsx'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    module: {
        preLoaders: [
            {
                test: /\.(?:jsx?)$/,
                loaders: [
                    'eslint'
                ],
                include: [
                    path.resolve(__dirname, 'src'),
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
                    path.resolve(__dirname, 'src')
                ],
                test: /\.(?:jsx?)$/,
                plugins: [
                    'transform-runtime'
                ]
            },
            {
                test: /\.(jpeg|png|gif|svg)$/i,
                loader: 'url'
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.VERSION': JSON.stringify('1.0.0')
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new svgStore({
            svgoOptions: {
                plugins: [
                    { cleanupEnableBackground: true },
                    { removeAttrs: { attrs: ['fill', 'stroke'] }},
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
        extensions: ['', '.js', '.jsx']
    }
}