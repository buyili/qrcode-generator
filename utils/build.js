// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
process.env.ASSET_PATH = '/';

var webpack = require('webpack'),
  path = require('path'),
  fs = require('fs'),
  config = require('../webpack.config'),
  notReloadConfig = require('../webpack.config.notreload'),
  ZipPlugin = require('zip-webpack-plugin');

delete config.chromeExtensionBoilerplate;

config.mode = 'production';

var packageInfo = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

config.plugins = (config.plugins || []).concat(
  new ZipPlugin({
    filename: `${packageInfo.name}-v${packageInfo.version}.zip`,
    path: path.join(__dirname, '../', 'zip'),
  })
);

config.entry = {
  ...config.entry,
  ...notReloadConfig.entry
}

config.output.clean = true;

webpack(config, function (err) {
  if (err) throw err;
});
