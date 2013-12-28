$.ajax({
  async: false,
  url:"home_template.html"
}).done(function(data){
  ich.addTemplate("home",data);
});
$.ajax({
  async: false,
  url:"venue_template.html"
}).done(function(data){
  ich.addTemplate("venue",data);
});
$.ajax({
  async: false,
  url:"venue_results.html"
}).done(function(data){
  ich.addTemplate("venue_results",data);
});


function initial_load(){
var after_slash = location.href.replace(/^(?:\/\/|[^\/]+)*\//, "");
  var output_html;
var slash_array = after_slash.split("/");
after_slash = slash_array[slash_array.length-1];
if(after_slash=="") {
  output_html = ich.home();
  $(output_html[2]).attr("style","");
  $(output_html[0]).attr("class","");
  $("#wrap").html(output_html);
} else {
  var params = getVars(after_slash);
  if (after_slash.slice(0,after_slash.indexOf('?'))=="search.html")
    { 
      display_results();
    }else if(after_slash.slice(0,after_slash.indexOf('?'))=="venues.html")
          {
            console.log("Asdf");
            display_venue();
          }
}

}

function bind_events(){
  $(document).on("submit","form#homeSearch",function(e){
    e.preventDefault();
    history.pushState({},"","search.html?query="+$("#search_field").val());
    display_results();
  });

  $(document).on("click","div.backarrow",function(e){
    window.history.back();
  });

  $(window).on("popstate", function(e) {
    var after_slash = location.href.replace(/^(?:\/\/|[^\/]+)*\//, "");
      var output_html;
var slash_array = after_slash.split("/");
after_slash = slash_array[slash_array.length-1];
    if(after_slash=="") {
      output_html = ich.home();
      $("#wrap").html(output_html);
    } else {
      var params = getVars(after_slash);
      if (after_slash.slice(0,after_slash.indexOf('?'))=="search.html")
        { 
          display_results();
        } else if(after_slash.slice(0,after_slash.indexOf('?'))=="venues.html")
          {
            console.log("Asdf");
            display_venue();
          }
    }
  });

  $(document).on("keypress", "#venue-search-box", function(e){
    if(e.which == 13){
      e.preventDefault(); 
      history.pushState({},"","search.html?query="+$("#venue-search-box").val());
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(handleGetCurrentPosition, onError);
      }
    }
  });

  $(document).on("click","a.venue_link",function(e){
    e.preventDefault();
    history.pushState({},"",$(this).attr("href"));
    display_venue();
  });

}

function display_venue(){
    var venue_id = getUrlVars()["id"];
    // console.log(myArray[1]);
    var url = "http://temp-pro-tip.herokuapp.com/api/venues/"+venue_id;
    $.getJSON(url, function(data){
      var full_venue = new FullVenue(data["response"]["venue"]);
      var venue_html = ich.venue(full_venue);
      $("#wrap").html(venue_html);
    });
}

function display_results() {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(handleGetCurrentPosition, onError);
  }
}

function generate_search_url(query,lat,lng){
    var url = "http://temp-pro-tip.herokuapp.com/api/venues/search?"
    if (query!==undefined&&query!=="") {
      url = url + "query="+query+"&"
    }
    url = url+"limit=10&ll="+lat+","+lng;
    return url;
}

function process_results(lat,lng) {
    var venues = [];
    var query = getUrlVars()["query"];
    url = generate_search_url(query,lat,lng);

    $.getJSON(url, function(data){
      $.each(data["response"]["venues"], function(key,val){
        venues.push(new Venue(val));
      });
      venues_html=ich.venue_results({venues:venues, query:decodeURIComponent(query)});
      $("#wrap").html(venues_html);
    });
}

function handleGetCurrentPosition(location){
    process_results(location.coords.latitude,location.coords.longitude);
}

function onError(){
  console.log("error");
}

