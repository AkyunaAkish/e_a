const webpack = require('webpack');
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
const ENV = process.env.NODE_ENV;
const DEV = ENV === 'development';
const Notifier = require('webpack-notifier');
const ProgressBar = require('progress-bar-webpack-plugin');

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
        new ProgressBar(),
        new Notifier({
            alwaysNotify: true
        }),
        new ngAnnotatePlugin({
            add: true
        })
    ],
    module: {
        rules: [{
            test: /\.js/,
            exclude: /(node_modules | bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-1']
            }
        }, {
            test: /\.s?css/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
            exclude: /(node_modules | bower_components)/,
        }, {
            test: /\.html/,
            use: 'raw-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.js']
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
