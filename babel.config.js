module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // We'll re-enable NativeWind's Babel plugin after confirming compatibility
    // with the current Expo + expo-router toolchain.
    // plugins: ["nativewind/babel"],
  };
};


