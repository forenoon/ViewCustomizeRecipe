/* ------ view-customizes:
 チケット詳細のフローティング表示（チケット詳細）
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
  menu.append('<li><a href="#issue">Issue</a></li>');
  menu.append('<li><a href="#history">History</a></li>');
  menu.prependTo("#content");
  $("#content").tabs();
})
