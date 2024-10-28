const path = require("path");
/**
 * @type {import('webpack').Configuration}
 */
module.exports = (optimize) => ({
  mode: "production",
  // devtool: "source-map",
  optimization: {
    minimize: !!optimize,
  },
  entry: {
    index: ["./src/index.ts"],
  },
  output: {
    filename: optimize ? "buffalo-design.min.js" : "buffalo-design.js",
    path: path.join(__dirname, "dist/umd"),
    library: "buffalo-design",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: "tsconfig.build.json",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
});
