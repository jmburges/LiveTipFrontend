function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function getVars(href)
{
    var vars = [], hash;
    var hashes = href.slice(href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;

}

function handleGetCurrentPosition(location){

    console.log(location.coords.latitude);
    console.log(location.coords.longitude);
    var venues = [];
    var query = getUrlVars()["query"]
    var url = "http://temp-pro-tip.herokuapp.com/api/venues/search?"
    if (query!==undefined&&query!=="") {
      url = url + "query="+query+"&"
    }
    url = url+"limit=10&ll="+location.coords.latitude+","+location.coords.longitude;
    $.getJSON(url, function(data){
      $.each(data["response"]["venues"], function(key,val){
        venues.push(new Venue(val));
      });
      venues_html=ich.venue_results({venues:venues, query:decodeURIComponent(query)});
      $("#wrap").html(venues_html);
      $("#venue-search-box").keypress(function(e){
        if(e.which == 13){
          e.preventDefault(); 
          history.pushState({},"","search?query="+$("#venue-search-box").val());
          if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(handleGetCurrentPosition, onError);
          }
        }
      });
      $("a.venue_link").click(function(e) {
        e.preventDefault();

        var myRex = /^venues\/(\S+)$/;
        var myArray = myRex.exec($(this).attr("href"));
        history.pushState({},"","venue?id="+myArray[1]);
        // console.log(myArray[1]);
        var url = "http://temp-pro-tip.herokuapp.com/api/venues/"+myArray[1];
        $.getJSON(url, function(data){
          var full_venue = new FullVenue(data["response"]["venue"]);
          var venue_html = ich.venue(full_venue);
          $("#wrap").html(venue_html);
        });
      });
    });
}
function onError(){
console.log("error");
}
