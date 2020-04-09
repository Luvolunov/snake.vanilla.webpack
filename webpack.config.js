const path = require("path"),
      HtmlWebpackPlugin = require("html-webpack-plugin"),
      MiniCssExtractPlugin = require("mini-css-extract-plugin"),
      { CleanWebpackPlugin } = require("clean-webpack-plugin");


module.exports = (env) => {
    const isProd = env.NODE_ENV === "production";

    return {
            entry: path.resolve(__dirname, "src/index"),
            output: {
                filename: isProd ? "[name].[contenthash].js": "[name].js",
                path: path.resolve(__dirname, "build")
            },
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: "babel-loader"
                    },
                    {
                        test: /\.scss/,
                        use: [
                            'style-loader',
                            MiniCssExtractPlugin.loader,
                            'css-loader',
                            {
                                loader: "postcss-loader",
                                options: {
                                    plugins: () => [
                                        require("cssnano"),
                                        require("autoprefixer")
                                    ]
                                }
                            },
                            'sass-loader'
                        ]
                    }
                ]
            },
            plugins: [
                new HtmlWebpackPlugin({template: path.resolve(__dirname, "src/index.html")}),
                new MiniCssExtractPlugin({filename: isProd ? "[name].[contenthash].css": "[name].css"}),
                new CleanWebpackPlugin({})
            ]
        }
}