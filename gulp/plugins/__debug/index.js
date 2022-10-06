/**
 * debug plugin
 * デバッグやるだけ用
 */
'use strict';

const PLUGIN_NAME = 'debug';

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
        console.log(String(file.contents));
      }

      // エラー時
      catch(error) {
        return cb(new PluginError(PLUGIN_NAME, error));
      }

      return cb(null, file);
    }
  });
}
