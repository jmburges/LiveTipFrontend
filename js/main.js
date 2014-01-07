
function resizeEverything(){
    width = $(window).width();
    textSize = Math.round(width / 30);
    if (textSize > 16) textSize = 16;
    $("html, body").css("font-size", textSize + "px");
}

var isTouchDevice = function() {  return 'ontouchstart' in window || 'onmsgesturechange' in window; };
var isDesktop = window.screenX != 0 && !isTouchDevice() ? true : false;    


$(document).ready(function() {
	resizeEverything();
			    
	$(window).resize(function(){
		if (isTouchDevice()) return null;
		resizeEverything(); 
	});
	
	setTimeout(function(){
		$("#splashlogo").addClass("moveUp");
	},1000);
	
	setTimeout(function(){
		$("#homeStuff").fadeIn("slow");
	},2000);
	
	$("#searchResultsWrap").fadeIn("slow");
	
	$(document).on("click", ".search", function(){
		$(".header .logo").fadeOut("fast");
		$(".header .backarrow").fadeOut("fast");
		console.log('uhh');
		rightPos = parseInt($(".header .searchBar").css("padding-right")) + $(".header #venue-search-box").width() + 35;
		$(".header .search").animate({
			"right" : rightPos
		}, "slow", function(){
			$(".header .searchBar").fadeTo("slow", 1);
			$(".header .search").css("right", "auto");
			$(".header .search").css("left", "2.75%");
		});
	});
	$(document).on("click", ".close-search", function(){
		$(".header .search").css("left", "auto");
		$(".header .searchBar").fadeTo("fast", 0);
		$(".header .search").animate({
			"right" : 0
		}, "slow", function(){
			$(".header .logo").fadeIn("fast");
			$(".header .backarrow").fadeIn("fast");
		});
	});
	$(document).on("click", ".header .logo", function(){
		window.location.href = "/";
	});
	$(document).on("click", ".write-tip", function(){
		tipModal();
	});
});

/***********************************
		HOME MADE MODAL RECIPE
***********************************/

function tipModal(){
	var venue_id = getUrlVars()["id"];
	var modalContainer = $("<div>", {id: "modalContainer"});
	var dialog = $("<div>", {id: "dialog"});
	
	var newTip = '<h1>Write a #LiveTip</h1><form accept-charset="UTF-8" autocomplete="off" target="_self" action="http://temp-pro-tip.herokuapp.com/tips" class="new_tip" id="new_tip" method="post">';
	newTip += '<input name="utf8" type="hidden" value="✓"><input name="authenticity_token" type="hidden" value="y1VyNJ5b4SFH4TnAwJqXgGYgYuNU4YT4cEIxCf/03qo=">';
	newTip += '<input id="tip_venue_id" type="hidden" name="tip[venue_id]" value="' + venue_id + '">';
	newTip += '<input id="tip_content" name="tip[content]" size="30" type="text">';
  	newTip += '<input name="commit" type="submit" value="Create"></form>'

  	dialog.html(newTip);
  	dialog.append("<div class='close-dialog'></div>");
  	$(modalContainer).appendTo("body");
  	$(dialog).appendTo("body");

	var maskHeight = $(document).height();
	$("#modalContainer").css("height", maskHeight);
	
	$("#modalContainer").fadeIn(300);
	$("#modalContainer").fadeTo("slow", 0.75);
	$("#modalContainer").click(removeModal);
	$("#dialog .close-dialog").click(removeModal);
	$("#dialog").css("top", (($(window).height() - $("#dialog").outerHeight()) / 2) + $(window).scrollTop() + "px");
	$("#dialog").fadeIn(500);
	
	$(window).resize(function(){
		$("#dialog").css("top", (($(window).height() - $("#dialog").outerHeight()) / 2) + $(window).scrollTop() + "px");
	})
	$(window).scroll(function(){
		$("#dialog").css("top", (($(window).height() - $("#dialog").outerHeight()) / 2) + $(window).scrollTop() + "px");
	})
}

function removeModal(){
	$("#dialog").fadeOut(300);
	$("#modalContainer").fadeOut(500, function(){
		$("#dialog").remove();
		$("#modalContainer").remove();
	});
	
	$(window).unbind("resize");
	$(window).unbind("scroll");
}


