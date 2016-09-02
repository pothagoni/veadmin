var app = angular.module('veadmin',['ui.router','youtube-embed']);

/*
	UI Routing.
*/
app.config(function($stateProvider, $urlRouterProvider){

	$stateProvider
	.state('login', {
		url:"/login",
		templateUrl: "templates/login.html"
	})
	.state('main',{
		url:"/main",
		templateUrl:"templates/main.html"
	})
	.state('main.youtube',{
		url:'/youtube',
		templateUrl:"templates/youtubelist.html",
		controller: "YoutubeListCtrl"
			
	})
	.state('main.youtube.details',{
		url:"/youtube/details",
		templateUrl:"templates/videodetails.html",
		params: {
			list: null
		},
		controller: "YoutubeDetailsCtrl"
		
	})
	.state('main.photos',{
		url:'/photos',
		views: {
			"mainbody": {
				templateUrl:"templates/photolist.html"
			},
			"itemdetails": {
				templateUrl: "templates/photodetails.html"
			}
		}
	})
	
	$urlRouterProvider.otherwise('/login');
});
/* End of UI Routing*/

/*
	Run 
*/
app.run(function($rootScope, $state, LoginService){
	$rootScope.$on('$stateChangeStart', function(event, next, nexParams, fromState){
		console.log(next.name)
		if (!LoginService.isAuthenticated()){
			if(next.name !=='login'){
				event.preventDefault();
				$state.go('login');
				
			}
		}
	
	});
});

app.service('LoginService', function($q, $http, API_ENDPOINT){

	var LOCAL_TOKEN_KEY='veapiTokenKey';
	var isAuthenticated = false;
	var authToken;

	function storeUserCredentials(token) {
		window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
		useCredentials(token);
	}

    function useCredentials(token) {
		isAuthenticated = true;
		authToken = token;
		$http.defaults.headers.common.Authorization = authToken;
	}

	var login = function(user){
		return $q(function(resolve, reject){
			$http.post(API_ENDPOINT.url+'authenticate', user)
				.then(function(res){
					if(res.status==200){
						storeUserCredentials(res.data.token)
						resolve(res)
					} else {
						reject(err);
					}
				}, function(err){
						reject(err);
				})
		})
	}
	

	return {
		login: login,
		isAuthenticated: function(){
			return isAuthenticated;
		}
	}
});