/* ------ view-customizes:
 チケット詳細のフローティング表示（チケット一覧）
----------------------- */
function DeferredLoadIssueDetail(divParent, urlIssue){
    var deferred = $.Deferred();

    var iframe = $('<iframe></iframe>').attr({
        'id':'FloatingIssueWindow',
        'src':urlIssue,
        'width':'98%',
        'height':'98%'
    });
    iframe.load(deferred.resolve);
    iframe.appendTo(divParent);

    deferred.done(function(){
        ;
    });
    
    return deferred.promise();
}

$(function() {
    var divParent = $('<div />').attr({
        'id':'FloatingIssueWindowContainer'
    });
    divParent.css("display", "none");
    divParent.appendTo("#main");
    divParent.dialog({
        autoOpen: false,
        width: 970,
        height: 700,
        modal: true,
        close : function(){
            $("#FloatingIssueWindow").remove();
        }
    });
    
    $("#content table.issues .issue").dblclick(function(eventObject){
        var aSubject = null;
        var url = "";
        var title ="";
        switch(eventObject.target.nodeName){
            case "TR":
                aSubject = $(eventObject.target).find(".subject > a")[0];
                url = aSubject.href;
                title = aSubject.text;
                break;

            case "TD":
                aSubject = $(eventObject.target.parentElement).find(".subject > a")[0];
                url = aSubject.href;
                title = aSubject.text;
                break;

            default:
                return ;
        }

        $.when(DeferredLoadIssueDetail(divParent, url+"?view_type=min"))
            .then(function(){
                var dialog = $("#FloatingIssueWindowContainer");
                dialog.dialog('option', 'title', '> '+title);
                dialog.dialog('open');
            })
    });
})