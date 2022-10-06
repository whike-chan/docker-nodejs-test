# pugディレクトリ
作成したい階層通りにpugファイルを追加します。  
例）  
`index.pug → index.html`  
`about/index.pug → about/index.html`  
ファイル名やフォルダー名の先頭に「_」がついたものはコンパイルされません。

# _config
設定用フォルダー。meta情報や共通で使いたい変数などあればこちらへ。

# _layout
レイアウト用フォルダー。ヘッダー・フッターなどのパーツや、レイアウトテンプレートがあります。

## _layout/_template.pug
HTMLテンプレートの継承元ファイルです。

### blockの扱い方
テンプレートにblockを定義しておくことで、呼び出す側のpugでblockの内容を消したり、変更したりできます。  
そのblockをまるごと書き換えたい場合は、extendしているpug側で`block そのblock名`と書けばOKです。  
まるごとではなく、blockの最初に追加したい場合は`prepend そのblock名`、最後に追加したい場合は`append そのblock名`というふうに書きます。

### keyブロック
`block key`という箇所で各ページごとのkeyを入力できます。  
このkeyと_config/_pages.pugを照らし合わせて、ページごとにtitle・description・keywordsを出し分けしたり、そのページの場合だけ表示したいコンテンツのif文に利用したりできます。  
初期設定では書いていませんが、bodyのclassなどにページごとのkeyをつけても便利かもしれません。  
何も指定しなければkeyはdefaultとなります。

# 共通パーツの使い方
_layoutフォルダー内に全体で使い回せるパーツなどがありますが、たとえばこのバナーエリアはinfo/配下でだけ使いまわしたいな、などがあれば、_layoutフォルダー内か_includeフォルダーなどを作成してその中にパーツのpugを作り、使いたいpugで`include /_include/そのパーツ.pug`というふうに使うと便利です（拡張子は省略可能です）。  
共通のkeyをもたせているならば、_layout/_template.pugの中にif文を使って書いてもいいと思います。  
ちなみにgulpの初期設定でpugのルート相対パスを使えるようにしているので、includeやextendをするときはどんな階層のpugからでも`/`からはじめてOKです。  
