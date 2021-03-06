Atom(History)
====

チケット更新履歴RSS(/issues/changes.atom)にカスタムクエリを適用することで、RSSリーダーと連携してメール通知よりも柔軟な通知を受け取れるようになる。

![RSS Notification](https://github.com/forenoon/ViewCustomizeRecipe/blob/HistoricalAtom/HistoricalAtom/screenshots/rss_popup.gif?raw=true "RSS Notification")

Powered by Chrome Extension "RSS Feed Reader"

## Description

マイページ下の「担当しているチケット」ページに、RSS「全変更の詳細」(/issues/changes.atom)をカスタムした「Atom(History)」を追加する。

![Atom(history)](https://github.com/forenoon/ViewCustomizeRecipe/blob/HistoricalAtom/HistoricalAtom/screenshots/issues.png?raw=true "Atom(history)")

これはRSS「全変更の詳細」にマイページ下の「Atom」と同じURLクエリストリングを追加しカスタムクエリを反映したもの。
RSSリーダーにこの「Atom(History)」を登録することで、カスタムクエリで抽出したチケットの更新通知のみを取得できるようになる。

![RSS](https://github.com/forenoon/ViewCustomizeRecipe/blob/HistoricalAtom/HistoricalAtom/screenshots/rss.png?raw=true "RSS")

* （例）「チェック担当者」のカスタムフィールドに自分が指定されていて、かつステータスが「解決」のようなチェック工程に入った場合の通知。
    * 「チェックしてください」程度の細かい連絡をリアルで受け取らずに済むようになる。
* （例）チケットのステータスが「新規」などの初期値のまま「開始日」を過ぎた場合の通知。
    * 放置チケット対策。
* （例）チケットのステータスが「進行中」以上「終了」未満なまま「更新日」が1週間以上過ぎた場合の通知。
    * 放置チケット対策。

## Usage

マイページ「担当しているチケット」の「他の形式にエクスポート」に追加された「Atom(History)」を好みのRSSリーダーに登録する。

![RSS Subscribe](https://github.com/forenoon/ViewCustomizeRecipe/blob/HistoricalAtom/HistoricalAtom/screenshots/rss_subscribe2.png?raw=true "RSS Subscribe")

## Install

Redmine管理メニュー「View customize」設定の「new view customize」から以下の項目を追加する。

* JavaScript
    * Path pattern:	^(?<!/projects/)/issues(?!/)
    * Type: JavaScript
    * Code: Githubの「JavaScript.js」をコピペする

## Notice

* プロジェクトのチケット一覧とは異なり、マイページ下のチケット一覧はデフォルトでは全プロジェクトのチケットが表示される。プロジェクトを絞り込むにはカスタムクエリで「プロジェクト」を指定する。
* 使用感は使うRSSリーダーによる。
    * 個人的にはChrome機能拡張の「RSS Feed Reader」がオススメ。
* 厳密にはチケットの更新履歴であることに注意。例えばチケットが10回更新されてからRSSに含まれる条件になった場合、RSS通知には10回分の更新が一気に追加される。使い方によっては情報が増えすぎて邪魔になるかもしれない。
* RSSリーダーはRedmineサーバーへ定期的にアクセスしにいくだけなのでメールほどの即時性は無い。
    * 逆にメール通知が5分に1回にきて邪魔になっている場合などは、RSSリーダーで通知間隔を30分～1時間置きにすると多少改善されるかもしれない。
* 数百～数千ユーザー全員が使うとRedmineに負荷がかかるかもしれない。

## Author

[forenoon](https://github.com/forenoon)
