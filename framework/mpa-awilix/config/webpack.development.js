const CopyWebpackPlugin = require('copy-webpack-plugin');
const { 
    join 
} = require("path");
module.exports = {
    output: {
        filename: "scripts/[name].bundles.js"
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: join(__dirname, "../" + "/src/front/views/common/layout.html"),
            to: '../views/common/layout.html'
        }]),
        new CopyWebpackPlugin([{
            from: join(__dirname, "../" + "/src/front/components"),
            to: '../components'
        }], {
                copyUnmodified: true,
                ignore: ["*.js", "*.css", ".DS_Store"]
            })
    ]
};