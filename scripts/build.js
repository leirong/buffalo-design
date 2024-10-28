const webpack = require("webpack");
const webpackConfig = require("../webpack.config.js");
const { getAllFiles } = require("./utils.js");

const path = require("path");
const fs = require("fs");
const sass = require("sass");
const execa = require("execa");
const ts = require("typescript");

const shell = (cmd) =>
  execa(cmd, { stdio: ["pipe", "pipe", "inherit"], shell: true });

const TS_CONFIG_FILE = "tsconfig.build.json";
const compileTs = async (moduleType, outputDir) => {
  await shell(
    `npx tsc -p ${TS_CONFIG_FILE} --module ${moduleType} --outDir ${outputDir}`
  );
};

const { CommonJS, ESNext } = ts.server.protocol.ModuleKind;

const compileCjs = () => compileTs(CommonJS, "dist/cjs");

const compileEsm = () => compileTs(ESNext, "dist/esm");

const compileUmd = () => {
  webpack([webpackConfig(false), webpackConfig(true)], (err, stats) => {
    if (err || stats.hasErrors()) {
      console.error(err || stats.toJson().errors);
      return;
    }
    console.log(
      stats.toString({
        chunks: false, // Makes the build much quieter
        colors: true, // Shows colors in the console
      })
    );
  });
};

const compileSass = ({ inputFile, outputFile, isMin }) => {
  const allFiles = getAllFiles(inputFile);
  const sassFiles = allFiles.filter((file) => path.extname(file) === ".scss");
  for (const file of sassFiles) {
    const outputDir = path.dirname(outputFile);
    fs.mkdirSync(outputDir, { recursive: true });
    try {
      const result = sass.compile(file, {
        style: isMin ? "compressed" : "expanded",
      });
      fs.writeFileSync(outputFile, result.css);
      console.log(`Sass${isMin ? " minified" : ""} compiled successfully.`);
    } catch (err) {
      console.error("Error compiling Sass:", err);
    }
  }
};

const start = async () => {
  console.log("Building... 🚀🚀🚀");
  await Promise.all([compileCjs(), compileEsm(), compileUmd()]);
  compileSass({
    inputFile: path.join(__dirname, "../src"),
    outputFile: path.join(__dirname, "../dist/css/buffalo-design.css"),
    isMin: false,
  });
  compileSass({
    inputFile: path.join(__dirname, "../src"),
    outputFile: path.join(__dirname, "../dist/css/buffalo-design.min.css"),
    isMin: true,
  });
  console.log("Build completed! 🎉🎉🎉");
};

start();
