var livetip = livetip || {};

(function(){
	var BASE_URL = "http://temp-pro-tip.heroku.com/";

	livetip.Venue = Backbone.Model.extend({
		defaults: {
			'id' : '',
			'category' : '',
			'categoryIcon' : '',
			'name' : '',
			'address' : '',
			'city' : '',
			'state' : '',
			'zip' : '',
			'numTips' : 0,
			'topTip' : '',
      'topTip_created_at':''
		},
	});

	livetip.Venues = Backbone.Collection.extend({
		model: livetip.Venue,
		noPersistence: new bnp.NoPersistence()
	});

	livetip.VenueView = Backbone.View.extend({
		tagName: 'div',

		template: _.template($('#venue-template').html()),

		events: {
			'click .result' : '_clickHandler'
		},

		initialize: function(){
			this.model.on('destroy', this.remove, this);
		},

		_clickHandler: function(){
			var url = BASE_URL + 'venue.html?id=' + this.model.get('id');
			alert(url);
			window.location.href = url;
		},

		render : function(){
			var html = this.template(this.model.toJSON());
			this.$el.html(html);
        $("div.time").timeago();
			return this;
		},

		hideBottom : function(){
			this.$el.find('.bottomWrap').hide();
		}
	});
})();
