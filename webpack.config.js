const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');

/** @type {webpack.Configuration} */
module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.scss']
    },
    module: {
        rules: [
            { test: /\.(js|jsx)/, use: 'babel-loader' },
            { test: /\.scss/, use: ['style-loader', 'css-loader', 'sass-loader'] }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlPlugin()
    ]
}