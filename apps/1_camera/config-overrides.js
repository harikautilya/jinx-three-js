/* eslint-disable */
const path = require("path");

const { override, babelInclude } = require("customize-cra");

module.exports = function (config, env) {
  return Object.assign(
    config,
    override(
      babelInclude([
        /* transpile (converting to es5) code in src/ and shared component library */
        path.resolve("src"),
        path.resolve("../base"),
      ])
    )(config, env)
  );
};