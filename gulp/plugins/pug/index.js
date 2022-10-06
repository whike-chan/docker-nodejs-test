/**
 * pug plugin
 */
'use strict';

const PLUGIN_NAME = 'pug';

// require
const Through = require('through2');
const PluginError = require('plugin-error');
const Pug = require('pug');
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
        const compiled = Pug.render(String(file.contents), options);
        file.contents = Buffer.from(compiled);

        // 拡張子を.htmlに変換
        file.path = (file.path).replace(path.extname(file.path), '.html');
      }

      // エラー時
      catch(error) {
        return cb(new PluginError(PLUGIN_NAME, error));
      }

      return cb(null, file);
    }
  });
}
