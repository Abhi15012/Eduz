module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    // If you have other plugins, they go in this separate array:
    plugins: [
      "react-native-reanimated/plugin", 
    ],
  };
};