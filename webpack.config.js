import path from 'path'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const TerserPlugin = require('terser-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

module.exports = {
    context: path.resolve(__dirname, 'src/'),
    mode: 'development',
    entry: {
        main: './js/main.js',
    },
    devtool: isDev ? 'source-map' : false,
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'build/js'),
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                },
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [new CleanWebpackPlugin()],
}
