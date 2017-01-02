const webpack = require('webpack');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
const ENV = process.env.NODE_ENV;
const DEV = ENV === 'development';

const config = {
    entry: [
        './client/app.js'
    ],
    output: {
        path: `${__dirname}/dist/`,
        filename: 'bundle.js'
    },
    devtool: DEV ? 'source-map' : null,
    plugins: [
        new ngAnnotatePlugin({
            add: true
        })
    ],
    module: {
        loaders: [{
            test: /\.js/,
            exclude: /(node_modules | bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-1']
            }
        }, {
            test: /\.s?css/,
            loaders: ['style', 'css', 'sass'],
            exclude: /(node_modules | bower_components)/,
        }, {
            test: /\.html/,
            loader: 'raw-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['', '.js']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './dist'
    }
};

if (!DEV) {
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            mangle: false,
            compressor: {
                drop_console: true,
                warnings: true
            }
        })
    );
} else {
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    );
};

module.exports = config;
