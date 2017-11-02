/* ------ view-customizes:
 チケット詳細のフローティング表示（チケット一覧）
----------------------- */
$(function() {
  $("#main").append('<div id="frameWindow" />');
  
  $("#frameWindow").dialog({
      autoOpen: true,
      width: 970,
      height: 700,
      modal: false,
      open : function(){
          $("#frameWindow").append('<iframe id="iframeDiv"></iframe>');
          $("#iframeDiv").attr({
              src : "http://172.21.5.45/issues/16891?view_type=min",
              width : "98%",
              height : "98%"
          });
      },
      close : function(){
          $("#iframeDiv").remove();
      }
  });
})

