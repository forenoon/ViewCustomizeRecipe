/* ------ view-customizes:
 FloatingIssue
 Path pattern: /issues/[0-9]+
 ----------------------- */
$(function() {
    // search "view_type=min" in GET param.
    var strTrigger = "view_type=min";
    var index = $("<a>", {href:location.href})[0].search.replace("?", "").split("&").indexOf(strTrigger);
    if(index < 0){
        return ;
    }

    // hide div
    $("#top-menu").css("display", "none");
    $("#header").css("display", "none");
    $("#sidebar").css("display", "none");
    $("#footer").css("display", "none");
    $("#content > .other-formats").css("display", "none");
    $("#content > .contextual").css("display", "none");
    $("#content > h2").css("display", "none");
    $("#content > #update").css("display", "none");
    $("#content > #context-menu").css("display", "none");
    $("#content > .issue > .next-prev-links").css("display", "none");

    // delete margin
    $("#main").css("margin", "0");
    $("#content").css("margin-right", "0");

    // add "issue" id to "issue" class to tabling.
    $("#content > .issue").attr("id", "issue");

    // add tab-menu, and tabling #content.
    var menu = $("<ul>");
    if(0 < $("#issue").length){
        menu.append('<li><a href="#issue">Issue</a></li>');
    }
    if(0 < $("#history").length){
        menu.append('<li><a href="#history">History</a></li>');
    }
    menu.prependTo("#content");

    // get before active tab from cookie
    var nameCookieTab = "vc_forenoon_FloatingIssue_tab";
    var activeBefore = 0;
    {
        var _active = window.localStorage.getItem(nameCookieTab);
        activeBefore = _active != null ? _active : 0;
    }

    $("#content").tabs({
        active: activeBefore,
        activate: function(event, ui){
            switch(ui.newTab.text())
            {
                case "Issue": window.localStorage.setItem(nameCookieTab, 0); break;
                case "History": window.localStorage.setItem(nameCookieTab, 1); break;
            }
        }
    });
})
