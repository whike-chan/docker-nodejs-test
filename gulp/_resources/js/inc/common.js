(function() {
  document.addEventListener('DOMContentLoaded', ()=> {
    setNoopener();
    setHeaderHeight();
    responsiveImages();
    lazyload();
  }, false);
  window.addEventListener('resize', ()=> {
    setHeaderHeight();
    responsiveImages();
  }, false);

  /**
   * 別窓リンク(target="_blank")にrel="noopener noreferrer"を付与
   */
  let linksTargetBlank;

  function setNoopener() {
    linksTargetBlank = document.querySelectorAll('[target="_blank"]');
    linksTargetBlank = Array.prototype.slice.call(linksTargetBlank);
    linksTargetBlank.forEach(e => {
      e.rel = 'noopener noreferrer';
    });
  }

  /**
   * ヘッダー高さ取得
   * 　fixedなヘッダーの場合に使用
   * 　#contentsのpadding-topへ入れる
   */
  const tagHeader = 'js_header'; // ヘッダー指定
  const tagContents = '#contents'; // コンテンツid(body相当)

  function setHeaderHeight() {
    document.querySelector(tagContents).style.paddingTop = document.getElementById(tagHeader).getBoundingClientRect().height + 'px';
  }

  /**
   * レスポンシブ&Retina画像切り替え
   * 　imgタグにdata-pc,data-sp属性が揃っていることで発動
   * 　data-retina, data-tabも設定できる。
   */
  const switchPC = 1280; // PC幅
  const switchSP = 750; // SP幅

  let targetImages; // レスポンシブ画像指定
  let windowWidth; // 画面幅
  let retinaDisplay; // Retina判定

  function responsiveImages() {
    // ターゲット指定(pc/spのdataが揃っているimg、lazyloadは除外)
    targetImages = document.querySelectorAll('img[data-pc][data-sp]:not(.lazyload)');
    setImageSrc();
  }

  /**
   * 画像遅延読み込み（lazyload）
   * 　imgタグにdata-pc,data-sp属性とlazyloadクラスが揃っていることで発動
   */
  function lazyload() {
    targetImages = document.querySelectorAll('img[data-pc][data-sp].lazyload');
    targetImages = Array.prototype.slice.call(targetImages);
    const lazyLoadObserver = new IntersectionObserver(function(entries, object) {
      entries.forEach(function(entry) {
        // 交差したらdata-srcの値をsrcへ入れる
        if (!entry.isIntersecting) {
          return;
        } else {
          setImageSrc();
        }
        // 監視の解除
        object.unobserve(entry.target);
      });
    });
    targetImages.forEach(function(i) {
      lazyLoadObserver.observe(i);
    });
  }

  function setImageSrc() {
    windowWidth = window.innerWidth; // 画面幅
    retinaDisplay = window.devicePixelRatio; // Retina判定

    for (let i = 0; i < targetImages.length; i++){
      let convertSrc;

      if(windowWidth <= switchSP) {
        // SP
        convertSrc = targetImages[i].getAttribute('data-sp');
      } else if(windowWidth >= switchPC && retinaDisplay >= 2 && targetImages[i].getAttribute('data-retina') ) {
        // PC(Retina有)
        convertSrc = targetImages[i].getAttribute('data-retina');
      } else if(windowWidth >= switchPC) {
        // PC(Retina無)
        convertSrc = targetImages[i].getAttribute('data-pc');
      } else if(windowWidth > switchSP && windowWidth < switchPC && targetImages[i].getAttribute('data-tab')) {
        // TAB(tab指定有)
        convertSrc = targetImages[i].getAttribute('data-tab');
      } else {
        // TAB(tab指定無)
        convertSrc = targetImages[i].getAttribute('data-pc');
      }

      // 現在のsrcと同じ値ならばスキップ
      if(targetImages[i].getAttribute('src') === convertSrc) {
        continue;
      }

      targetImages[i].src = convertSrc;
    }
  }
})();
