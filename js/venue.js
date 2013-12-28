function Venue(json_data) {
  if (arguments.length == 0) return;
  this.name = json_data.name;
  this.venue_id = json_data.id;
  this.location = new Location(json_data.location);
  if (json_data.categories[0]!=null) {
    this.category_name = json_data.categories[0].name;
    this.category_icon_url = json_data.categories[0].icon.prefix+"64"+json_data.categories[0].icon.suffix
  }
  this.live_tip_count = json_data.liveTipCount
  if(json_data.liveTopTip != undefined && json_data.liveTopTip.length !=0 ){
    this.live_top_tip = new Tip(json_data.liveTopTip);
  }
}

function Location(json_data){
  this.address = json_data.address;
  this.lat = json_data.lat;
  this.lng = json_data.lng;
  this.distance = json_data.distance;
  this.postalCode = json_data.postalCode;
  this.cc = json_data.cc;
  this.city = json_data.city;
  this.state = json_data.state;
  this.country = json_data.country;

}

function FullVenue(json_data){
  Venue.call(this,json_data);
  if (json_data.photos.groups.length!=0){
    this.photo_url = json_data.photos.groups[0].items[0].prefix+"500x500"+json_data.photos.groups[0].items[0].suffix
  }
  this.live_tips = generate_tips_array(json_data.liveTips);
  this.live_tip_count = this.live_tips.length;
}

FullVenue.prototype = new Venue();

FullVenue.prototype.constructor = FullVenue;

function Tip(json_data){
  this.content = json_data.content;
  this.created_at = json_data.created_at;
}

function generate_tips_array(json_data){
  var tips = [];
  $.each(json_data, function(){
   tips.push(new Tip(this));
  });
  return tips;
}
