TransparentBg
====

Redmineのテーマをコピー＆ライトせず、またView CustomizeのStyleSheetも書かずに、テーマ背景に画像を差し込み、主要な画面要素の背景透過を行う。

|![1](https://github.com/forenoon/ViewCustomizeRecipe/blob/TransparentBg/TransparentBg/screenshots/1.png?raw=true "1")|![2](https://github.com/forenoon/ViewCustomizeRecipe/blob/TransparentBg/TransparentBg/screenshots/2.png?raw=true "2")
|---|---|
|![3](https://github.com/forenoon/ViewCustomizeRecipe/blob/TransparentBg/TransparentBg/screenshots/3.png?raw=true "3")|![4](https://github.com/forenoon/ViewCustomizeRecipe/blob/TransparentBg/TransparentBg/screenshots/4.png?raw=true "4")|

## Description
Redmineの全画面に指定の背景画像を差し込み、主要な画面要素を透過することで、Redmineの画面に背景画像を透過表示する。  

チームビルディングのテクニックで、フロアの壁にプロダクトの関連画像やチームの写真を貼って目的意識を高めたりするが、そのRedmine版。

どんなテーマを使ってもちょっぴり殺風景なRedmineに少しの癒やしを与えられればいいな、と思う。 :blush:

## Usage
### 背景画像の指定
JavaScript内の`urlBackgroundImg`に背景画像のURLを入力する。  
各ユーザーが参照できるURLであれば、Redmineのpublicアセットでもよいし、プロジェクトのアップロードファイルのURLでもよい。
``` 
const urlBackgroundImg = 'url(http://{redmine_path}/attachments/download/2/bg.png)';
```

### 透過する要素の指定
JavaScript内の連想配列`mapPathAlpha`に、キーに背景を透過する要素のjQueryセレクターパスを、値に透過するアルファ値を入れる。  
該当要素の`{element}.style.background`中の全ての色要素に指定されたアルファ値が追加／上書きされる。

```
const mapPathAlpha = {
    '#header':0.0,
    '#main-menu':0.7,
    '#main-menu ul li a.selected':0.5,
    '#main':0.0,
    '#sidebar':0.7,
    '#sidebar-expander.collapsed':0.7,
    '#sidebar-expander.expanded':0.7,
    '#content':0.6,
    'h2':0.5,
    'table':0.8,
    'th':0.8,
    'tr':0.8,
    'td':0.8,
    '.box':0.8,
    '.details':0.8,
    '.gantt_hdr':0.7,
}
```

上書きされる色要素は以下。
* rgb指定　ex) rgb(255,255,255), rgba(255,255,255,1.0)
* 16進指定　ex) #fff, #ffffff, #ffffff10
* 色名指定　ex) red, yellowgreen, blue
  * 一度の16進カラーに変換され、その後アルファ値が追加される。

MDNのCSSドキュメントを参考にした。  
[color - CSS | MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value)

アルファ値の上書きの例外として、**元のアルファ値が指定アルファ値より低い場合は上書きしない**。  
これは元のスタイルで完全透過要素などが見えるようになってしまうための措置。

## Install

Redmine管理メニュー「View customize」設定の「new view customize」から以下の項目を追加する。

* JavaScript
    * Path pattern: /*
    * Type: JavaScript
    * Code: Githubの「JavaScript.js」の内容をコピペする

あとはUsageの手順に従う。

## Notice
どこかのゲームやアニメやドラマの公式サイトの画像を無断でリンクするのは迷惑になるので止めよう！ :no_good:

## Comming soon ... ?
* 個人別に壁紙を切り替えられるように、専用の設定ダイアログから背景画像のURLを指定できるようにしたい。
  * 保存先はlocalStorageになるが。
* 画像だけでなく動画にも対応したい。

## Author

[forenoon](https://github.com/forenoon)