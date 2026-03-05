const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);


config.resolver.unstable_enablePackageExports = true;


const tslibPath = require.resolve("tslib/tslib.es6.js");

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "tslib") {
    return {
      filePath: tslibPath,
      type: "sourceFile",
    };
  }

  // Let the default resolver (including Expo + NativeWind handling) take over
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = withNativeWind(config, { input: "./global.css" });