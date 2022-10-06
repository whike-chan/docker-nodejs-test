# html
html（pug）フォルダーです。

# css
css（stylus）フォルダーです。
  
# js
jsフォルダーです。

# img
画像フォルダーです。拡張子jpg・jpeg・png・gif・svgに対応しています。  
SVGについてですが、SVG内のviewBox属性を削除するとIEで崩れる問題がうまくいかないため、いったん圧縮処理を消しています。  
なので、XDなどから素材を書き出す時点で最適化することをオススメします。 imgフォルダーかstaticフォルダーに配置すればコピーされます。  

# static
静的ファイルフォルダーです。  
この中に配置したファイルはとくに処理されず、出力先フォルダーにそのままコピーされます（デフォルトはdistフォルダー）。  
e.g.  
`/_resources/static/favicon.ico` → `/dist/favicon.ico`  
`/_resources/static/assets/pdf/hoge.pdf` → `/dist/assets/pdf/hoge.pdf`  
