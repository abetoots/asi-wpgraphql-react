const path = require("path");
const webpack = require("webpack");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new webpack.DefinePlugin({
      //Your XAMPP url
      BASE_URL: JSON.stringify("http://localhost/asi-headless/"), //Should have leading slash
      BASE_API_URL: JSON.stringify(
        "http://localhost/asi-headless/wp-json/wp/v2/"
      ), //Should have leading slash
      GRAPHQL_URL: JSON.stringify("http://localhost/asi-headless/graphql")
    })
  ],
  module: {
    rules: [
      {
        test: /\.module\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true
            }
          },
          // Compiles Sass to CSS
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-resources-loader",
            options: {
              resources: [
                "./src/sass/util/_variables.scss",
                "./src/sass/tools/*.scss"
              ]
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.(s[ac]ss)$/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          // Compiles Sass to CSS
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-resources-loader",
            options: {
              resources: [
                "./src/sass/util/_variables.scss",
                "./src/sass/tools/*.scss"
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader"
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true //server index.html for any route not found
  }
});
