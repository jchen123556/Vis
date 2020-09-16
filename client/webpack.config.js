const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/code/main.tsx',
    module: {
        rules: [
            {
                test: /\.html$/,
                use: { loader: "html-loader" }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins : [
        new HtmlWebPackPlugin({ template : "./src/index.html", filename : "./index.html" })
      ],
};