FloatingIssue
====

チケット一覧でチケット行をダブルクリックすると、チケット詳細がその場でダイアログ表示される。  
その場でのチケット内容や履歴のちょっとした確認に便利。

![capture](https://github.com/forenoon/ViewCustomizeRecipe/blob/HistoricalAtom/FloatingIssue/screenshots/capture.gif?raw=true "Capture")

## Description

チケット一覧のチケット行をダブルクリックすると、そのチケットの詳細ページが整形されてダイアログに表示される。

小さなスペースに情報を多く表示するためにRedmineのヘッダーやサイドバー、編集機能はカットしている。

また連続でチケット詳細を見ていくことを考慮して、チケット情報と更新履歴をタブで分け、さらに別のチケット詳細を開いた時にもアクティブタブは維持される。  
例えば更新履歴のみを連続で見たい場合は、「History」タブをアクティブにした状態で別チケットを開けば、Historyタブがアクティブになった状態でダイアログが開く。

## Usage

チケット一覧の！チケット行を！！ダブルクリック！！！

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

別チケットでダイアログを開き直してもアクティブタブが維持されるためにローカルストレージを使用している。  
よってHTML5以上でしか動作しない。

## Author

[forenoon](https://github.com/forenoon)