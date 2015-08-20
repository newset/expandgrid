var Expandgrid = ( function(){
  var n, m, height, gutter, gridSelector, itemSelector;

init =  function(object){
  n = object.n || 2;
  m = object.m || 2;
  height = object.height || 200;
  gutter = object.gutter || 5
  gridSelector = object.gridSelector || ".grid";
  itemSelector = object.itemSelector || ".grid-item";

  var width = 100
  $(itemSelector).outerWidth((100/m) + "%");
  $(gridSelector).outerHeight(n*height + "px");
  setGutterColor();
  initializeOverlays(false);
}

initializeOverlays = function(fullscreen){
  $(".grid-item > .overlay").innerHeight($(gridSelector).innerHeight());
  $(".grid-item > .overlay").innerWidth($(gridSelector).innerWidth());
  var offset = $(gridSelector).offset();
  $(".grid-item > .overlay").offset({ top:offset.top, left:offset.left});
  $(".grid-item").each(function(){
    var overlay = $(this).find(".overlay");
    var offset = $(this).offset();
    overlay.css("clip","rect("+ offset.top +"px, "+offset.left+"px, 50px, 50px)");
  });
  $(".grid-item").hover(function(){
    var overlay = $(this).find(".overlay");
    overlay.css("display","block");
    overlay.css("clip","auto");
  }, function(){
    var overlay = $(this).find(".overlay");
    var offset = $(this).offset();
    overlay.css("display","block");
    overlay.css("clip","rect("+ offset.top +"px, "+offset.left+"px, 50px, 50px)");
  });
}

printSettings = function(){
  console.log(n,m,height);
}

setGutterColor = function(){
  var color =  $(gridSelector).css('backgroundColor');
  if(color == "rgba(0, 0, 0, 0)" || color == "transparent" ){
     color = "rgb(0, 0, 0)";
  }
  var style = $("<style>" + itemSelector + "{ border-color:" + color + ";}</style>");
  $('html > head').append(style);
}

  return {
    init : init,
    printSettings: printSettings,
  }

})();

$(window).on("load",function(){
  Expandgrid.init({ n: 2, m: 3});
  Expandgrid.printSettings();
});
