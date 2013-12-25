var livetip = livetip || {};

(function(){
	var BASE_URL = "http://temp-pro-tip.heroku.com/";
	var ENTER_KEY = 13;

	livetip.SearchView = Backbone.View.extend({
		el: '#wrap',

		events: {
			'keypress #venue-search-box' : '_searchBarHandler',
		},

		initialize: function(){
			this.$venues = $('#venue-list');

			this.first = true;
			this.$input = $('#venue-search-box');
			this.venuesCollection = new livetip.Venues();
			this.venuesCollection.on('add', this._addVenueToView, this);

			this.ll = '';
			if(navigator.geolocation){
				navigator.geolocation.getCurrentPosition(function(position){
					console.log(position.coords.latitude);
					console.log(position.coords.longitude);
					this.ll = position.coords.latitude + ',' + position.coords.longitude;

				$("#loading").html("Loading");
this.fetchVenuesByQuery("");
				}.bind(this),function(er){alert("We don't know where you are! :(");}.bind(this));
			}
		},

		_addVenueToView : function(mod) {
			var view = new livetip.VenueView({ model: mod });
			this.$venues.append(view.render().el);
			if(!mod.get('topTip')){
				view.hideBottom();
			}
		},



		_searchBarHandler : function(e){
			if(e.which !== ENTER_KEY || !this.$input.val().trim()){
				return;
			}
			if(this.first){
				$("#name").html("Search Results for: <span id = 'search-word'></span>");

			this.$keyword = $('#search-word');
			this.first=false;
			}

			_.chain(this.venuesCollection.models).clone().each(function(model){
  				console.log('deleting model ' + model.get('name'));
  				model.destroy();
			});

			this.$keyword.html(this.$input.val().trim());
			this.fetchVenuesByQuery(this.$input.val().trim());
		},

		addVenue : function(obj){
			console.log(obj);
			var venue = new livetip.Venue(obj);
			this.venuesCollection.add(venue);
		},

		fetchVenuesByQuery : function(query) {
					     $("#loading").show();
			
			var url = BASE_URL + 'venues/search?query='+query+'&limit=10&ll=' + this.ll;
			console.log('fetching from: ' + url);
			$.getJSON(url, function(data){
				console.log(data);
				$("#loading").hide();
				_.each(data.response.venues, function(venue){
					var icon = "";
					if(venue.categories[0] && venue.categories[0].icon){
						var icon = venue.categories[0].icon.prefix + '64' + venue.categories[0].icon.suffix;
					}

					var catName = "";
					if(venue.categories[0] && venue.categories[0].name){
						catName = venue.categories[0].name;
					}
					
					var obj = {
						id : venue.id,
						name : venue.name,
						address : venue.location.address,
						city: venue.location.city,
						state: venue.location.state,
						zip: venue.location.postalCode,
						category: catName,
						categoryIcon: icon,
						numTips: venue.liveTipCount,
						topTip: venue.liveTopTip.content,
            topTip_created_at: venue.liveTopTip.created_at,
					};

					this.addVenue(obj);
				}, this);
			}.bind(this)).error(function() {
				console.log('fetch failure');
			})
		},
	});

})();
