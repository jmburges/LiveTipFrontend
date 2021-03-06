
function resizeEverything(){
    width = $(window).width();
    textSize = Math.round(width / 30);
    if (textSize > 16) textSize = 16;
    $("html, body").css("font-size", textSize + "px");
}

var isTouchDevice = function() {  return 'ontouchstart' in window || 'onmsgesturechange' in window; };
var isDesktop = window.screenX != 0 && !isTouchDevice() ? true : false;    

function searchQuery(){
	var url = 'venues/search.html?query=' + $("#search").val();
	window.location.href = url;
}

$(document).ready(function() {
	resizeEverything();
			    
	$(window).resize(function(){
		if (isTouchDevice()) return null;
		resizeEverything(); 
	});
	
	setTimeout(function(){
		$("#splashlogo").addClass("moveUp");
	},1500);
	
	setTimeout(function(){
		$("#homeStuff").fadeIn("slow");
	},2000);
	
	$("#searchResultsWrap").fadeIn("slow");
	
	$("input[name=search]").keypress(function(e){
		if (e.which == 13){
			e.preventDefault();
			searchQuery();
		}
	});
	$("#search-button").click(function(){
		searchQuery();
	});
	$(document).on("click", ".search", function(){
		$(".header .logo").fadeOut("fast");
		$(".header .backarrow").fadeOut("fast");

		rightPos = parseInt($(".header .searchBar").css("padding-right")) + $(".header #venue-search-box").width() - 10;
		$(".header .search").animate({
			"right" : rightPos
		}, "slow", function(){
			$(".header .searchBar").fadeTo("slow", 1);
			$(".header .search").css("right", "auto");
			$(".header .search").css("left", "3%");
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
});