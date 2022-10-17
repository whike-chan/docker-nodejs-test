//--------------------------------------------
//
//  bundle
//  インクルード用ファイル
//
//---------------------------------------------
require('./inc/common');
const $ = require('jquery');

$(function() {
  $('#hoge').on('click', function() {
    console.log('yahoooo');
  });
})
