/**
 * imagemin plugin
 */
'use strict';

const PLUGIN_NAME = 'imagemin';

const Through = require('through2'),
      PluginError = require('plugin-error'),
      imagemin = require('imagemin'),
      pngquant = require('imagemin-pngquant'),
      mozjpeg = require('imagemin-mozjpeg'),
      gifsicle = require('imagemin-gifsicle'),
      svgo = require('imagemin-svgo');

module.exports = (options = {}) => {
  return Through.obj((file, enc, cb) => {
    if(file.isNull()) {
      return cb(null);
    }

    if(file.isStream()) {
      return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }

    if(file.isBuffer()) {
      (async() => {
        try {
          const contents = await imagemin.buffer(file.contents, {
            destination: 'build/images',
            plugins: [
              pngquant({
                quality: [.65, .8],
                speed: 1
              }),
              mozjpeg(),
              gifsicle(),
              svgo({
                plugins: [{
                  removeViewBox: false,
                  convertShapeToPath: false,
                  collapseGroups: false,
                  cleanupIDs: false
                }]
              })
            ]
          });
          file.contents = contents;
        }
        catch(error) {
          return cb(new pluginError(PLUGIN_NAME, error));
        }
        return cb(null, file);
      })();
    }
  });
}
