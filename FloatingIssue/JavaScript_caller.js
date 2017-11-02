/* ------ view-customizes:
 チケット詳細のフローティング表示（チケット一覧）
----------------------- */
function ShowFloatingIssueWindow(urlIssue){
    $("#FloatingIssueWindow").dialog({
        autoOpen: true,
        width: 970,
        height: 700,
        modal: false,
        open : function(){
            $("#FloatingIssueWindow").append('<iframe id="FloatingIssueWindowDiv"></iframe>');
            $("#FloatingIssueWindowDiv").attr({
                src : urlIssue+"?view_type=min",
                width : "98%",
                height : "98%"
            });
        },
        close : function(){
            $("#FloatingIssueWindowDiv").remove();
        }
    });
}

$(function() {
    $("#main").append('<div id="FloatingIssueWindow" />');

    $("#content table.issues .issue").dblclick(function(eventObject){
        var url = "";
        switch(eventObject.target.nodeName){
            case "TR":
                url = $(eventObject.target).find(".subject > a")[0].href;
                break;

            case "TD":
                url = $(eventObject.target.parentElement).find(".subject > a")[0].href;
                break;

            default:
                return ;
        }
        ShowFloatingIssueWindow(url);
    });
})

