/**
 * gulpfile
 */
'use strict';

// require
const plugin = './plugins/';
const gulp = require('gulp'),
      browserSync = require('browser-sync'),
      del = require('del'), // 削除
      cache = require('gulp-cached'),              // 差分ビルド用（キャッシュ）
      progeny = require('gulp-progeny'),           // 差分ビルド用（依存関係解決）
      gulpif = require('gulp-if'),
      through2 = require('through2'),              // pipeで情報の受け渡し
      convertLF = require(plugin + 'convert-to-lf'), // LF変換
      // html系
      pug = require(plugin + 'pug'),
      // htmlValidator = require('gulp-w3c-html-validator'),
      htmlhint = require('gulp-htmlhint'),
      // css系
      postcss = require('gulp-postcss'),
      autoprefixer  = require('autoprefixer'),
      mqpacker = require("css-mqpacker"),
      cssSorter = require("css-declaration-sorter"), // ソート
      cssnano = require("cssnano"),                  // min化
      stylus = require(plugin + 'stylus'),
      stylelint = require(plugin + 'stylelint'),
      // js系
      babel  = require('gulp-babel'),                // ES6
      uglify  = require('gulp-uglify-es').default,   // JSmin化
      eslint = require('gulp-eslint'),
      // browserify = require(plugin + 'browserify'), // 保留
      browserify = require('browserify'),
      // 画像圧縮系
      // imgmin = require('gulp-imagemin'),
      // imgminPNG = require('imagemin-pngquant'),
      // imgminJPG = require('imagemin-mozjpeg'),
      // imgminGIF = require('imagemin-gifsicle'),
      imagemin = require(plugin + 'imagemin'),
      // テスト系
      backstop = require('backstopjs');

/**
 * 環境設定
 */
// 本番（prod - production）と開発（dev - development）を切り替え
// コマンドの引数で判別
const envOption = process.argv.slice(2);
let isProd = false;
if(envOption[1] === '--production') {
  isProd = true;
}

/**
 * 定義
 */
/* 各パス */
/* 出力先の階層を変更したい場合はこちら */
const path = {
  '_re' : '_resources/',
  'dist' : 'dist/',
}
/* 処理対象ファイル */
const re = {
  'HTML': [path._re + 'html/**/*.pug', '!' + path._re + 'html/**/_*.pug'],
  'CSS': path._re + 'css/*.styl',
  'JS': path._re + 'js/*.js',
  'IMG': path._re + 'img/**/*.+(jpg|jpeg|png|gif|svg)',
  'STATIC': path._re + 'static/**/*',
}
/* 出力先フォルダ */
const dist = {
  'HTML': path.dist,
  'CSS': path.dist + 'assets/css/',
  'JS': path.dist + 'assets/js/',
  'IMG': path.dist + 'assets/img/',
  'STATIC': path.dist,
}
/* 監視対象 */
const observe = {
  'RE_HTML': path._re + 'html/**/*.pug',
  'RE_CSS': path._re + 'css/**/_*.styl',
  'RE_JS': path._re + 'js/**/*.js',
  'RE_IMG': path._re + 'img/**/*.+(jpg|jpeg|png|gif|svg)',
  'RE_STATIC': path._re + 'static/**/*'
}
/* Lint用 */
const lint = {
  'HTML': 'htmlhintrc.js', // 設定ファイル,
  'JS': '', // lintかけたいファイル
}
/* HTML(PUG)の開発時ルート指定 */
const devRootHtml = path._re + 'html/';

/**
 * html
 */
function html() {
  // W3Cバリデータ エラーメッセージ出力用
  const handleFile = (file, encoding, callback) => {
    callback(null, file);
  };
  return gulp
    .src(re.HTML)
    .pipe(cache('html'))
    .pipe(progeny())
    .pipe(pug({
      basedir: devRootHtml,         // ルート相対パス可
      pretty: true                  // 整形
    }))
    .pipe(convertLF())
    .pipe(htmlhint(lint.HTML))      // htmlhint 設定ファイル
    .pipe(htmlhint.reporter())      // htmlhint レポート出力
    // .pipe(htmlValidator())          // W3Cバリデータ
    .pipe(through2.obj(handleFile)) // W3Cバリデータ エラーメッセージ出力
    .pipe(gulp.dest(dist.HTML))     // 出力先
    .pipe(browserSync.stream());
}

/**
 * css
 */
function css() {
  return gulp
    .src(re.CSS)
    .pipe(stylus())
    // postcssの処理を外に出したかったけど挫折
    .pipe(postcss([
      mqpacker(),       // media-queryをまとめる
      autoprefixer({    // 対応バージョンはpackage.jsonのbrowserslist
        cascade: false, // 整形オフ
        grid: true,     // grid対応
      }),
    ]))
    .pipe(stylelint())
    .pipe(gulpif(isProd, postcss([ // 整頓&min化【prod】
      cssSorter(),                 // デフォルトはアルファベット順
      cssnano({ autoprefixer: false })
    ])))
    .pipe(convertLF())
    .pipe(gulp.dest(dist.CSS))     // 出力先
    .pipe(browserSync.stream());
}

/**
 * js
 */
function js() {
  return gulp
    .src(re.JS)
    // .pipe(browserify()) // 保留中

    // pipeしてthrough2オブジェクトを生成する
    .pipe(through2.obj(function(file, encode, callback){
      // fileにはsrcで読み込んだファイルの情報が引き渡される
      // file.pathを利用してbrowserifyインスタンスを生成する
      browserify(path._re + 'js/bundle.js')
      .bundle(function(err, res){
        // bundleを実行し，処理結果でcontentsを上書きする
        file.contents = res;
        // callbackを実行し，次の処理にfileを引き渡す
        // nullになっている部分はエラー情報
        callback(null, file)
      });
    }))

    // .pipe(eslint({
    //   ignorePatterns: ["lib/**/*"],
    //   extends: "eslint:recommended",
    //   globals: [
    //     'jQuery',
    //     '$'
    //   ],
    //   envs: [
    //     'browser',
    //     'es6'
    //   ]
    // }))
    // .pipe(eslint.format())
    // .pipe(eslint.failAfterError()) // エラー出たら止める

    .pipe(babel({ // ES6変換
      presets: ['@babel/preset-env']
    }))
    .pipe(gulpif(isProd, uglify({ // min化【prod】
      output:{ // /*!や//! で始まるコメントを残す(ライセンス)
        comments: /^!/
      }
    })))
    .pipe(convertLF())
    .pipe(gulp.dest(dist.JS)) // 出力先
    .pipe(browserSync.stream());
}

/**
 * img
 */
function image() {
  return gulp
    .src(re.IMG)
    .pipe(cache('image'))
    .pipe(progeny())
    .pipe(imagemin())
    .pipe(gulp.dest(dist.IMG)) // img出力先
    .pipe(browserSync.stream());
}

/**
 * 静的ファイルコピー
 */
function copy() {
  return gulp
    .src(re.STATIC)
    .pipe(cache('copy'))
    .pipe(gulp.dest(dist.STATIC)); // コピー先
    // .pipe(browserSync.stream()); // staticフォルダ更新でもリロードしたければこちら
}

/**
 * ファイル削除
 */
function clean(done) {
  // 出力先フォルダ配下を全て削除（デフォルトではdist）
  del.sync(path.dist + "/*", { force: true })
  done();
}

/**
 * Browsersync
 */
function browsersync(done) {
  browserSync.init({
    server: {
      baseDir: dist.HTML, // ローカルサーバーのホームディレクトリ
      index: "index.html" // TOPページにしたいファイルを指定
    },
    open: false,
  });
  done();
}

/**
 * watch
 */
function watch() {
  // ファイル更新監視
  gulp.watch(observe.RE_HTML, {interval: 1000, usePolling: true}, html);
  gulp.watch(observe.RE_CSS, {interval: 1000, usePolling: true}, css);
  gulp.watch(observe.RE_JS, {interval: 1000, usePolling: true}, js);
  gulp.watch(observe.RE_IMG, {interval: 1000, usePolling: true}, image);
  gulp.watch(observe.RE_STATIC, {interval: 1000, usePolling: true}, copy);
}

/**
 * default
 * npm run gulpで実行
 */
exports.default = gulp.series(
  gulp.parallel(css,html,js,copy),
  image,
  gulp.parallel(browsersync,watch)
);

/**
 * production
 * npm run prod で実行
 * watchしない
 */
exports.prod = gulp.series(
  gulp.parallel(css,html,js,copy),
  image
);

/**
 * clean
 * npm run cleanで実行
 * 出力先フォルダ配下（デフォルトではdist）を全て削除した後、buildする
 */
exports.clean = gulp.series(
  clean,
  gulp.parallel(css,html,js,copy),
  image
);

/**
 * shot
 * npm run shot で実行
 * ビジュアルリグレッションテストのテスト
 */
function shot(done) {
  backstop('reference');
  done();
}
function shot_te(done) {
  backstop('test');
  done();
}
exports.shot = gulp.series(
  shot
);
exports.shot_te = gulp.series(
  shot_te
);

