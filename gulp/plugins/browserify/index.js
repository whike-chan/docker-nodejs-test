/**
 * !! 保留中 !!
 * Browserify plugin
 */
'use strict';

// require
const Through = require('through2');
const Browserify = require('browserify');

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
        // fileにはsrcで読み込んだファイルの情報が引き渡される
        // file.pathを利用してbrowserifyインスタンスを生成する
        Browserify(file.path).bundle((err, res) => {
          // bundleを実行し，処理結果でcontentsを上書きする
          file.contents = res;
          // callbackを実行し，次の処理にfileを引き渡す
          // nullになっている部分はエラー情報
        });
        console.log('aaa');
      }

      // エラー時
      catch(error) {
        return cb(new PluginError(PLUGIN_NAME, error));
      }

      return cb(null, file);
    }
  });
}
