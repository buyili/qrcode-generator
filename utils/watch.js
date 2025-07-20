// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
process.env.ASSET_PATH = '/';

var webpack = require('webpack'),
  config = require('../webpack.config'),
  configNotReload = require('../webpack.config.notreload'),
  path = require('path');

delete config.chromeExtensionBoilerplate;

webpack({
  ...config,
  watch: true
}, function (err) {
  if (err) throw err;

  webpack({
    ...configNotReload,
    watch: true
  }, function (err, stats) {
    if (err) throw err;
  });
});


// webpack({
//   ...configNotReload,
//   watch: true
// }, function (err, stats) {
//   if (err) throw err;
// });
