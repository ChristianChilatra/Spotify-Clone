const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");



module.exports = {
    entry: "./src/index.js",
    output: {
        clean: true,
        path: path.resolve(__dirname, "build"),
        filename: "build.js",
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"],
                    plugins: [
                        '@babel/transform-runtime'
                    ]
                },
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.css$/i,
                type: "asset/resource",
                generator: {
                    filename: "style/[contenthash][ext][query]",
                },
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.png$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/img/[contenthash][ext][query]",
                },
            },
            {
                test: /\.svg$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/svg/[contenthash][ext][query]",
                },
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/fonts/[contenthash][ext][query]",
                },
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            inject: true,
            template: "./src/public/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "./style/[name].css",
        }),
    ],
}