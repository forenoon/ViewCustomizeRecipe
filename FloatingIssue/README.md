{Name}
====

{Overview}
※「どんないいこと」が追加されるか簡単な概要を書く。
※詳細は「Description」に書く。
※インパクトがあるイメージ画像があればそれを貼るとよい。
※https://github.com/tsenart/vegeta

## Description

※「どこの」「なにが」「どう変わり」「どうなるのか」を書く。
※仕組みや原理の概要を書く。
※イメージしやすいようい使用例もここに書く。
※https://github.com/kennethreitz/requests

※画像もあるとインストール前にイメージが掴みやすい。
※https://github.com/peco/peco
※最近はスクリーンショットをアニメGIFで撮影する優秀なツールもある
※キャプチャツール: https://www.cockos.com/licecap/

## Usage

※使い方説明書。「どこの」「なにを」「どう使うか」を書く。
※ここも画像があると迷いにくくなる。

## Install

Redmine管理メニュー「View customize」設定の「new view customize」から以下の項目を追加する。

* JavaScript（チケット詳細）
    * Path pattern: /issues/[0-9]+
    * Type: JavaScript
    * Code: Githubの「JavaScript_called.js」の内容をコピペする
* JavaScript（チケット一覧）
    * Path pattern: /issues(?!/)
    * Type: JavaScript
    * Code: Githubの「JavaScript_caller.js」の内容をコピペする

## Notice

※注意事項を書く

## Author

[forenoon](https://github.com/forenoon)