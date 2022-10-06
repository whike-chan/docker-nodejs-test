/**
 * stylus plugin
 */
'use strict';

const PLUGIN_NAME = 'stylus';

// require
const Through = require('through2');
const PluginError = require('plugin-error');
const Stylus = require('stylus');
const path = require('path');

// exports
module.exports = (options = {}) => {
  return Through.obj((file, enc, cb) => {
    // なにもしない
    if(file.isNull()) {
      return cb(null);
    }

    // streamはサポート外
    if(file.isStream()) {
      return cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }

    // 処理内容
    if(file.isBuffer()) {
      try {
        Stylus(String(file.contents))
          // 処理中のファイルの絶対パスをset stylus内の@importもここが基準となる
          .set('filename', path.resolve((file.path)))
          .render((err,css) => {
            if(err) throw err;
            file.contents = Buffer.from(css);
        })

        // 拡張子を.cssに変換
        file.path = (file.path).replace(path.extname(file.path), '.css');
      }

      // エラー時
      catch(error) {
        return cb(new PluginError(PLUGIN_NAME, error));
      }

      return cb(null, file);
    }
  });
}
