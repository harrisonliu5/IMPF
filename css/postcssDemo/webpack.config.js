const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['style-loader',
                {
                    loader: MiniCssExtractPlugin.loader,
                },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            // modules: true,
                            // localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
}