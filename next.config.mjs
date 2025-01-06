// next.config.js
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  webpack(config, { isServer }) {
    if (!isServer) {
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            { from: 'node_modules', to: 'build/node_modules' }
          ]
        })
      );
    }
    return config;
  }
}
