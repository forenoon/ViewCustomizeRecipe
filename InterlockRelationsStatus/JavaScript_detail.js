/* ------ view-customizes:
InterlockRelationsStatus (Details)
Path pattern: /issues/[0-9]+
----------------------- */
$(function() {
    const urlRedmineRoot = '';
    const nameStatusName = 'ToDo';

    $("#issue-form").submit((e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const issue_id = $("#issue-form").attr("action").match(/(\d+)$/)[0];
        let statusDefault = {};
        let statusReady = {};
        let statusClosed = {};

        var redmine = new Redmine(urlRedmineRoot);
        redmine.setupApikeyAsync()
        .then(
            // REST APIでステータス一覧をリクエスト。
            (apikey) => {
                if(!apikey) return;

                return redmine.getJsonAsync('/issue_statuses.json');
            },
            (response) => console.error("#scraping apikey: " + response.status + ":" + response.statusText)
        )
        .then(
            // ステータス一覧のリクエスト結果を取得。
            // 先行チケットのステータスが完了ステータスでなければ処理を中断。
            // REST APIで先行チケットの詳細をリクエスト。
            (json) => {
                if(!json) return;
                console.debug(json);

                statusDefault = json.issue_statuses.find((status) => status.is_default);
                statusReady = json.issue_statuses.find((status) => status.name === nameStatusName);
                statusClosed = json.issue_statuses.find((status) => status.is_closed);
                if(!statusDefault || !statusReady || !statusClosed)
                {
                    console.error("#undefined default status, or ready status, or closed status.");
                    console.info("* default status: " + (statusDefault !== null));
                    console.info("* ready status: " + (statusReady !== null));
                    console.info("* closed status: " + (statusClosed !== null));
                    return ;
                }
                
                // 先行チケットが完了ステータスでなければ処理を中断
                if($("#issue_status_id > option[selected]").val() != statusClosed.id)
                {
                    console.info("#no precedes issue");
                    console.info("* "+$("#issue_status_id > option[selected]").val());
                    console.info("* "+statusClosed.id);
                    return ;
                }

                return redmine.getJsonAsync('/issues/' + issue_id + '.json', {include:'relations'});
            },
            (response) => console.error("#request issue_statuses: " + response.status + ":" + response.statusText)
        )
        .then(
            // 先行チケット詳細のリクエスト結果を取得。
            // 取得したチケットに後続タスクが存在していたら、後続タスクの詳細をリクエストする。
            (json) => {
                if(!json) return;
                console.debug(json);

                if(!json.issue.relations)
                {
                    console.info("#no issue relations");
                    return ;
                }

                let relation = json.issue.relations.find((relation) => relation.relation_type === "precedes")
                if(!relation)
                {
                    console.info("#no follows issue");
                    return ;
                }
                
                return redmine.getJsonAsync('/issues/' + relation.issue_to_id + '.json', {});
            },
            (response) => console.error("#request precedes issue: " + response.status + ":" + response.statusText)
        )
        .then(
            // 取得した後続タスクのステータスがデフォルトだったら、ステータスを準備にする。
            (json) => {
                if(!json) return;
                console.debug(json);

                if(json.issue.status.id !== statusDefault.id)
                {
                    console.info("#precedes issue isnot Wait");
                    return ;
                }

                return redmine.putJsonAsync(
                    '/issues/' + json.issue.id + '.json',
                    {
                        issue:{
                            status_id:statusReady.id,
                            notes:'***Auto: follow issue closed. this status change to "' + statusReady.name + '"***'
                        }
                    });
            },
            (response) => console.error("#request follows issue: " + response.status + ":" + response.statusText)
        )
        .then(
            // 最終処理
            () => {
                form.submit();
            },
            (response) => {
                console.error(response.status + ":" + response.statusText);
                form.submit();
            }
        )

        return false;
    });
})