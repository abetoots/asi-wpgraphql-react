const path = require("path");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: ["html-loader"] // when 'src' is encountered, it requires them
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // when these files are required by html loader, we output them with hash
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "media"
          }
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  resolve: {
    alias: {
      ["@Assets"]: path.resolve(__dirname, "src/assets/"),
      ["@Bits"]: path.resolve(__dirname, "src/components/bits/"),
      ["@Components"]: path.resolve(__dirname, "src/components/"),
      ["@Core"]: path.resolve(__dirname, "src/core/"),
      ["@Forms"]: path.resolve(__dirname, "src/misc/forms/"),
      ["@Hoc"]: path.resolve(__dirname, "src/hoc/"),
      ["@Hooks"]: path.resolve(__dirname, "src/misc/hooks/"),
      ["@Shared"]: path.resolve(__dirname, "src/misc/shared/"),
      ["@Store"]: path.resolve(__dirname, "src/misc/store/"),
      ["@Styles"]: path.resolve(__dirname, "src/misc/styles/")
    }
  }
};
