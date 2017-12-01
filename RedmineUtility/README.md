(Lib) Redmine Utility
====

RedmineのREST API用ユーティリティクラス。このレシピ自体は単体で動作しない。

## Description

JavaScriptからRedmineのREST APIへアクセスするためのクラス。

* $.ajax()とPromiseによる非同期カスケードに対応
* ログインユーザーのapikeyを取得する機能を実装

## Usage
```
var target_issue = '100';
var redmine = new Redmine("/redmine"); // case: Bitnami Redmine

redmine.setupApikeyAsync()
.then(
    // wait & get apikey, request GET issue.
    (apikey) => {
        return redmine.getJsonAsync('issues/' + target_issue + '.json', {include:'relations'});
    },
    (response) => console.log(response.status + ":" + response.statusText)
)
.then(
    // wait & get issue, request update issue.
    (json) => {
        return redmine.putJsonAsync('issues/' + json.issue.id + '.json', {
                    issue:{
                        subject:'Changed Subject from REST API',
                        notes:'***REST API TEST***'
                    }
                });
    },
    (response) => console.log(response.status + ":" + response.statusText)
)
.then(
    // wait & update issue.
    () => console.log("REST API finish!");
    (response) => console.log(response.status + ":" + response.statusText)
);
```

## Install

Redmine管理メニュー「View customize」設定の「new view customize」から以下の項目を追加する。

* JavaScript
    * Path pattern: /*
    * Type: JavaScript
    * Code: Githubの「JavaScript.js」の内容をコピペする

## Notice

* `Redmine.setupApikeyAsync()`はログインユーザーのapikeyを取得しているが、これはユーザーの「個人設定」からスクレイピングしている。黒魔術に近い。

## Author

[forenoon](https://github.com/forenoon)