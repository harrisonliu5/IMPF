const HtmlWebpackPlugin = require('html-webpack-plugin');

// 用来获取 process.argv.slice(2) 里面的 mode 即当前的开发环境
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _modeflag = _mode == "production";
const _modeConfig = require(`./config/webpack.${_mode}.js`);

// 用来合并webpackConfig
const merge = require('webpack-merge');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { resolve} = require('path');

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const CleanWebpackPlugin = require('clean-webpack-plugin');
const loading = {
    html: require('./loading.html'),
}
let config ={
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    // options: {
                    //     publicPath: '../'
                    // }
                },
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[name]__[local]--[hash:base64:5]'
                    }
                }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'my project',
            filename: 'index.html',
            template: 'src/index.html',
            xhtml: true,
            loading,
            minify: {
                // 移出注释
                removeComments: _modeflag,
                collapseWhitespace: _modeflag
            }
        }),
        new MiniCssExtractPlugin({
            filename: _modeflag ? "style/[name].[contenthash:5].css" : "style/[name].css",
            chunkFilename: _modeflag ? "style/[id].[contenthash:5].css" : "style/[id].css",
        }),
        new ProgressBarPlugin({
            // format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
            // clear: false
        }),
        new WebpackBuildNotifierPlugin({
            title: "webpack Build success",
            logo: resolve("./favicon.png"),
            suppressSuccess: true
        })
    ]
};
// hash全部变，chunkhash关联变，contenthash内容变
module.exports = smp.wrap(merge(_modeConfig, config));
