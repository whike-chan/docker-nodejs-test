/**
 * <<<<<<<<<<<<< 保留中 >>>>>>>>>>>>>
 * postcss plugin
 */
'use strict';

const PLUGIN_NAME = 'postcss';

// require
const Through = require('through2'),
      PluginError = require('plugin-error'),
      Postcss = require('gulp-postcss'),
      autoprefixer  = require('autoprefixer'),
      mqpacker = require("css-mqpacker");

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

        // 使用するpostcssプラグイン
        const plugins = [
          mqpacker(),       // media-queryをまとめる
          autoprefixer({    // 対応バージョンはpackage.jsonのbrowserslist
            cascade: false, // 整形オフ
            grid: true,     // grid対応
          }),
        ]

        Postcss(contents, plugins)

        // Postcss(plugins)
        //   // fromでpackage.jsonを読み取れる位置を指定
        //   .process(contents, {from: file.path})
        //   .then(result => {
        //     file.contents = Buffer.from(result.css);
        //   })
        }

      // エラー時
      catch(error) {
        return cb(new PluginError(PLUGIN_NAME, error));
      }

      return cb(null, file);
    }
  });
}
