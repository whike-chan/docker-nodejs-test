/**
 * convert-to-lf plugin
 * 改行コードをLFに変換
 */
'use strict';

const PLUGIN_NAME = 'convert-to-lf';

// require
const Through = require('through2');
const PluginError = require('plugin-error');

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
        // 改行コード変換
        const contents = String(file.contents).replace(/\r\n?/g,"\n");
        file.contents = Buffer.from(contents);
      }

      // エラー時
      catch(error) {
        return cb(new PluginError(PLUGIN_NAME, error));
      }

      return cb(null, file);
    }
  });
}
