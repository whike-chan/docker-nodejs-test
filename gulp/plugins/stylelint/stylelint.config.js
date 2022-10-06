module.exports = {
  "extends": "stylelint-config-standard", // 公式スタンダード設定読み込み (recommendの拡張)
  "rules": {
    // standard上書き
    "at-rule-empty-line-before": null,  // @ルールの前の改行は自由
    "rule-empty-line-before": null,     // ブロックの前の改行は自由
    "number-leading-zero": null,        // 1未満の数を指定する際0を記載するかは自由

    // カスタム設定
    "color-no-invalid-hex": [true, // 無効な16進数の色を指定していないか
      { "message": "無効な16進数です [color-no-invalid-hex]" }
    ],
    "font-family-no-duplicate-names": [true, // font-family指定が重複していないか
      { "message": "font-family指定が重複しています [font-family-no-duplicate-names]" }
    ],
    "font-family-no-missing-generic-family-keyword": [true, // 汎用フォントを1つ以上設定しているか (sans-serif・serifなど)
      { "message": "汎用フォントが設定されていません [font-family-no-missing-generic-family-keyword]" }
    ],
    "function-calc-no-invalid": [true, // calcが無効な式になっていないか
      { "message": "無効なcalcの式があります [function-calc-no-invalid]" }
    ],
    "function-calc-no-unspaced-operator": [true,                 // calc()内演算子の前後にスペースが入っているか
      { "message": "calc内演算子の前後にスペースがありません [function-calc-no-unspaced-operator]" }
    ],
    "function-linear-gradient-no-nonstandard-direction": [true, // linear-gradientの記述が正しいか
      { "message": "linear-gradientの記述を確認してください [function-linear-gradient-no-nonstandard-direction]" }
    ],
    "string-no-newline": [true, // 文字列の途中で改行していないか (contentなど)
      { "message": "文字列の途中に改行があります [string-no-newline]" }
    ],
    "unit-no-unknown": [true, // 不明な単位を使っていないか
      { "message": "不明な単位があります [unit-no-unknown]" }
    ],
    "property-no-unknown": [true, // 存在しないプロパティを使っていないか
      { "message": "不明なプロパティがあります [property-no-unknown]" }
    ],
    "keyframe-declaration-no-important": [true, // keyframeで!importantを使っていないか
      { "message": "keyframe内に!importantがあります [keyframe-declaration-no-important]" }
    ],
    "declaration-block-no-duplicate-properties": [true, // 同一セレクタに重複プロパティがないか
      { "ignore": "consecutive-duplicates-with-different-values",
        "message": "重複しているプロパティがあります [declaration-block-no-duplicate-properties]" }
    ],
    "declaration-block-no-shorthand-property-overrides": [true, // 同一セレクタに打ち消されるプロパティがないか
      { "message": "打ち消されてしまうプロパティがあります [declaration-block-no-shorthand-property-overrides]" }
    ],
    "block-no-empty": [true, // 空のブロックがないか
      { "message": "空っぽのブロックがあります [block-no-empty]" }
    ],
    "selector-pseudo-class-no-unknown": [true, // 擬似クラスの名前が正しいか
      { "message": "不明な疑似クラスの指定があります [selector-pseudo-class-no-unknown]" }
    ],
    "selector-pseudo-element-no-unknown": [true, // 疑似要素の名前が正しいか
      { "message": "不明な疑似要素の指定があります [selector-pseudo-element-no-unknown]" }
    ],
    "selector-type-no-unknown": [true, // HTML要素の名前が正しいか
      { "message": "不明なHTML要素の指定があります [selector-type-no-unknown]" }
    ],
    "media-feature-name-no-unknown": [true, // メディアクエリの指定が正しいか
      { "message": "不明なメディアクエリの指定があります [media-feature-name-no-unknown]" }
    ],
    "at-rule-no-unknown": [true, // @ルールの指定が正しいか
      { "message": "不明な@ルールの指定があります [at-rule-no-unknown]" }
    ],
    "comment-no-empty": [true, // 空のコメントがないか
      { "message": "空っぽのコメントがあります [comment-no-empty]" }
    ],
    "no-descending-specificity": [true, // 詳細度により無効になるセレクタがないか
      { "message": "詳細度により無効になるセレクタがあります [no-descending-specificity]" }
    ],
    "no-duplicate-at-import-rules": [true, // 同一ファイルをimportしていないか
      { "message": "同じファイルをimportしています [no-duplicate-at-import-rules]" }
    ],
    "no-duplicate-selectors": [true, // 重複セレクタがないか
      { "message": "セレクタが重複しています [no-duplicate-selectors]" }
    ],
    "no-empty-source": [true, // CSSファイルが空でないか
      { "message": "CSSファイルが空っぽです [no-empty-source]" }
    ],
    "no-extra-semicolons": [true, // セミコロンが重複していないか
      { "message": "セミコロンが重複しています [no-extra-semicolons]" }
    ],
    "no-invalid-double-slash-comments": [true, // //で始まるコメントがないか
      { "message": "//で始まるコメントがあります [no-invalid-double-slash-comments]" }
    ],
    "function-url-no-scheme-relative": [true, // //で始まるURL指定がないか
      { "message": "//で始まるURLがあります [function-url-no-scheme-relative]" }
    ],
    "shorthand-property-no-redundant-values": [true, // 冗長な値が指定されているプロパティがないか
      { "message": "記述を短縮できるプロパティがあります [shorthand-property-no-redundant-values]" }
    ],
    "declaration-block-no-redundant-longhand-properties": [true, // まとめて記述できるプロパティがないか
      { "message": "まとめて記述できるプロパティがあります [declaration-block-no-redundant-longhand-properties]" }
    ],
    "no-unknown-animations": [true, // keyframesで定義されていないアニメーション名を使用していないか
      { "message": "keyframesで定義されていないアニメーションがあります [no-unknown-animations]" }
    ],
    "value-keyword-case": ["lower", // 値が小文字になっているか (display:BLOCK;はNG)
      { "message": "値が大文字になっています [value-keyword-case]" }
    ],
  },
}
