# _resources
リソースフォルダー。この中で作業します

# dist
出力用フォルダー。直接はいじりません

# はじめかた
ここで `npm install` からの `npm run gulp`  
2回目移行は `npm run gulp`  

## コマンドの種類
* `npm run gulp` と `npm run dev`  
└基本コマンド  
　develop（開発）モードで動き、css・js・画像は圧縮されず、watchが走ります  
　両方同じ挙動です
* `npm run prod`  
└ビルドコマンド  
　production（本番）モードで動き、css・js・画像が圧縮され、watchはされません
* `npm run clean`  
└dist配下のファイルをすべて削除した後、productionモードでビルドします  
※ファイル出力先を一番上の階層にしてcleanするとすべてが消えますのでご注意ください

# TODO
* svgの圧縮  
└謎　svgoは主流っぽいんだけど。追記: svgoのライブラリがめっちゃ古くなってるので新しくする
* リンターを入れる件  
└htmlのバリデーター古くなってるぽいので更新する。eslint動作確認する。
* テストとかを入れてみる件  
└スクショとれるやつが気になる  画像の新旧比較して差分出してくれるやつ
* 可能ならNodeのバージョンもあげる。もろもろバージョンアップする