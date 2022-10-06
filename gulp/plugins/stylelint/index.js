/**
 * stylelint plugin
 */
'use strict';

const PLUGIN_NAME = 'stylelint';

// require
const Through = require('through2');
const PluginError = require('plugin-error');
const stylelint = require('stylelint');
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
        const contents = String(file.contents);

        // 設定ファイル
        const myConfig = path.join(__dirname, 'stylelint.config.js');

        stylelint
          .lint({
            configFile: myConfig,
            code: contents,
            formatter: 'string'
          })
          .then((data)=> {
            console.log(data.output);
          })
          .catch((err) => {
            console.error(err.stack);
          });
      }

      // エラー時
      catch(error) {
        return cb(new PluginError(PLUGIN_NAME, error));
      }

      return cb(null, file);
    }
  });
}
