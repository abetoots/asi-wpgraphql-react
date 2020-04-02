const path = require("path");
const webpack = require("webpack");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "nosources-source-map",
  output: {
    filename: "[name].[contentHash].bundle.js",
    path: path.resolve(__dirname, "build")
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new CopyPlugin([
      "./public/_redirects",
      "public/robots.txt",
      "public/manifest.webmanifest"
    ]),
    new webpack.DefinePlugin({
      //Your XAMPP url
      BASE_URL: JSON.stringify("http://localhost/asi-headless/"), //Should have leading slash
      BASE_API_URL: JSON.stringify(
        "http://localhost/asi-headless/wp-json/wp/v2/"
      ), //Should have leading slash
      GRAPHQL_URL: JSON.stringify("http://localhost/asi-headless/graphql")
    }),
    new MiniCssExtractPlugin({ filename: "[name].[contentHash].css" }),
    new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
    new ManifestPlugin({
      // Optional asset manifest file
      fileName: "asset-manifest.json"
    })
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Moves CSS into separate files
          MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
          //This loader will @import your SASS resources into every required SASS module.
          //So you can use your shared variables & mixins across all SASS styles without manually importing them in each file.
          //!Do not include anything that will be actually rendered in CSS, because it will be added to every imported SASS file.
          {
            loader: "sass-resources-loader",
            options: {
              resources: ["./path/to/resources"]
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
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            drop_console: true // remove forgotten console logs
          }
        }
      })
    ],
    //Optional: https://medium.com/hackernoon/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // get the name. E.g. node_modules/packageName/not/this/part.js
            // or node_modules/packageName
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];

            // npm package names are URL-safe, but some servers don't like @ symbols
            return `npm.${packageName.replace("@", "")}`;
          }
        }
      }
    }
  }
});
