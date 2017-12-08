/* ------ view-customizes:
InterlockRelationsStatus (Details)
Path pattern: /issues/[0-9]+
----------------------- */

InterlockRelationsStatus = function(redmine)
{
    this.redmine = redmine;
    this.statusDefault = null;
    this.statusReady = null;
    this.statusClosed = null;
}

InterlockRelationsStatus.getStatusesAsync = function(nameStatusReady)
{
    if(this.statusDefault || this.statusReady || this.statusClosed)
    {
        return Promise.resolve(true);
    }

    return this.redmine.getJsonAsync('/issue_statuses.json')
        .then(
            (json) => {
                if(!json) return;
                console.debug(json);

                this.statusDefault = json.issue_statuses.find((status) => status.is_default);
                this.statusReady = json.issue_statuses.find((status) => status.name === nameStatusReady);
                this.statusClosed = json.issue_statuses.find((status) => status.is_closed);
                if(!this.statusDefault || !this.statusReady || !this.statusClosed)
                {
                    console.error("#undefined default status, or ready status, or closed status.");
                    console.info("* default status: " + (this.statusDefault !== null));
                    console.info("* ready status: " + (this.statusReady !== null));
                    console.info("* closed status: " + (this.statusClosed !== null));
                    return false;
                }
                return true;
            },
            (response) => Promise.reject(response)
        );
}

const URL_RedmineRoot = '';
const NAME_StatusReady = 'ToDo';
var g_redmine = new Redmine(URL_RedmineRoot);
var g_interlockStatus = new InterlockRelationsStatus(g_redmine);

$(function() {
    // コンテキストメニュー更新時の処理（コンテキストメニューは表示される直前に上書きされる）
    $("#context-menu").on("DOMSubtreeModified", (e) => {
        // apikeyを取得
        return g_redmine.setupApikeyAsync()
            .then(
                // * REST APIを使ってステータス一覧を取得する
                (apikey) => {
                    return g_interlockStatus.getStatusesAsync(NAME_StatusReady);
                },
                (response) => console.error(`#scraping apikey: ${response.status}:${response.statusText}`)
            )
            .then( 
                (result) => {
                    if(!result) return false;

                    // * コンテキストメニュー中の「チケットをクローズするステータス」リンクを取得する
                    // 2回呼ばれる。2回目でコンテキストメニューの中身が入るためパースできる
                    let id = g_interlockStatus.statusClosed.id;
                    let aClosed = $(`li.folder > ul > li > a[href*="&issue%5Bstatus_id%5D=${id}"]`, $(e.currentTarget));
                    if(aClosed.length < 1){
                        return false;
                    }

                    // 「クローズするステータス」リンククリック時のコールバックをセット。
                    aClosed.on("click", (e) => {
                        let ids = new Array();
                        return g_interlockStatus.getStatusesAsync(NAME_StatusReady)
                            .then(
                                // * リンクのクエリパラメータから更新チケットIDを取得する
                                // * 更新チケットID毎にチケット詳細をリクエスト
                                (result) => {
                                    if(!result) return false;

                                    let promiseIssues = new Array();
                                    decodeURI(aClosed.attr("href")).split('&').forEach((val,idx) => {
                                        let matches;
                                        if(matches = /ids\[\]=(\d+)/.exec(val)){
                                            promiseIssues.push( redmine.getJsonAsync('/issues/' + issue_id + '.json', {include:'relations'}) );
                                        }
                                    });
                                    
                                    return Promise.all(promiseIssues);
                                },
                                (response) => console.error(`#request statuses: ${response.status}:${response.statusText}`)
                            )
                            .then(
                                // 更新チケットをチェックして…
                                // * 更新チケットがすでにクローズするステータスでなければ処理を続ける
                                // * 全ての更新チケットの全ての後続チケットのチケット詳細をリクエストする
                                (issues) => {
                                    let promiseRelationIssues = new Array();
                                    issues.forEach((issue) => {
                                        if(!issue.issue.relations) return ;

                                        let relationPrecedesList = issue.issue.relations.filter((relation) => relation.relation_type === "precedes")
                                        if(!relationPrecedesList){
                                            return ;
                                        }
                                        
                                        relationPrecedesList.forEach((relation) => {
                                            promiseRelationIssues.push(redmine.getJsonAsync('/issues/' + relation.issue_to_id + '.json', {}));
                                        });

                                        return Promise.all(promiseRelationIssues);
                                    })
                                },
                                (response) => console.error(`#request updates by contexts: ${response.status}:${response.statusText}`)
                            )
                            .then(
                                // 全てのデフォルトステータスの後続チケットのステータスを"Ready"に変える。
                                (issues) => {
                                    issues.forEach((issue) => {
                                        if(issue.status_id !== g_interlockStatus.statusDefault.id){
                                            return false;
                                        }
                                        
                                        return redmine.putJsonAsync(
                                            '/issues/' + issue.id + '.json', {
                                                issue:{
                                                    status_id:g_interlockStatus.statusReady.id,
                                                    notes: `***Auto: follow issue closed. this status change to ${g_interlockStatus.statusReady.name}***`
                                                }
                                            });
                                    });
                                },
                                (response) => console.error(`#request follows by contexts: ${response.status}:${response.statusText}`)
                            );
                    });
                },
                (response) => console.error(`#get statuses: ${response.status}:${response.statusText}`)
            );
    });
})