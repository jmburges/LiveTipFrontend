var livetip = livetip || {};
(function(){
	
	livetip.connector = {

	}
	var baseURL = "temp-pro-tip.heroku.com/";

			
			app.doAuthRedirect = function() {
				var redirect = window.location.href;
				var url = config.authUrl + 'oauth2/authenticate?response_type=token&client_id='+
							config.apiKey + '&redirect_uri=' + encodeURIComponent(redirect);
				window.location.href = url;
			}
		
			app.getUserFriends = function() {
				var url = config.apiUrl + 'v2/users/self/friends?oauth_token=' + access_token;
				$.getJSON(url, {}, function(data){
					console.log(data);
				});
			}
			
			var access_token;
			if(window.location.hash){
				access_token = window.location.hash.substring(14);
			}else{
				app.doAuthRedirect();
			}
			
		})(jQuery);
	
})();