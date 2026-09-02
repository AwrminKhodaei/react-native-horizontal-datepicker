const path = require('path');
const escape = require('escape-string-regexp');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const pak = require('../package.json');

const root = path.resolve(__dirname, '..');
const modules = Object.keys(pak.peerDependencies);

/**
 * The library lives one directory up, so Metro watches the repo root. Its
 * peer dependencies are blocked there and aliased into the example's own
 * node_modules, otherwise React and React Native load twice.
 */
const config = {
  projectRoot: __dirname,
  watchFolders: [root],
  resolver: {
    blockList: modules.map(
      (m) => new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`)
    ),
    extraNodeModules: modules.reduce((acc, name) => {
      acc[name] = path.join(__dirname, 'node_modules', name);
      return acc;
    }, {}),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
