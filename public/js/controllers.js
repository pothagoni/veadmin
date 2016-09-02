var app = angular.module('veadmin');

app.controller('LoginCtrl', function($scope, $state, LoginService){
	$scope.user ={};

	$scope.signIn = function(){
		$scope.error="";
		LoginService.login($scope.user)
		.then(function(res){
			if(!res.data.success){
				$scope.error="Athentication failed!"
			} else {
				$state.go('main.youtube');
			}
		}, function(error){
			$scope.error="Connection failed "+error.config.url;
		})
	}
});

app.controller('YoutubeListCtrl', function($scope, $http, YOUTUBE_SEARCH, YOUTUBE_APIKEY, $state){
	var nextPageToken;
	var prevPageToken;
	var pageToken;
	var showDetailView = false;
	var results = function(pageToken){
		
		var params = {
				params: {
					key: YOUTUBE_APIKEY.apiKey,
					part: 'snippet',
					maxResults: 5,
					type: 'video',
					q: encodeURIComponent($scope.searchKeyWord).replace(/%20/g,'+'),
					order: 'date',
					safeSearch: 'strict'
				}
		}
		
		if(pageToken!==undefined){
			params.params.pageToken=pageToken;
		}
		//console.log(params);
		$http.jsonp(YOUTUBE_SEARCH.url+"/?"+"callback=JSON_CALLBACK",params
			).then(function(res){
				//console.log(res.data);
				nextPageToken = res.data.nextPageToken
				prevPageToken = res.data.prevPageToken
				$scope._list = res.data.items;
			},function(err){
				console.log(err);
			})
	}

	$scope.search = function() {
		results(pageToken);
	}

	$scope.nextPage = function(){
		results(nextPageToken);
	}
	$scope.previousPage = function(){
		results(prevPageToken);
	}
	$scope.showNext=function(){
		if(nextPageToken!==undefined){
			return false;
		} else {
			return true;
		}
	}
	$scope.showPrev=function(){
		if(prevPageToken!==undefined){
			return false;
		} else {
			return true;
		}
	}
	$scope.videoDetails = function(list){
		if(showDetailView===false){
			showDetailView=true;
		}
		$state.go('main.youtube.details',{list: list});
	}
	$scope.showView= function(){
		return showDetailView;
	}
})
app.controller('YoutubeDetailsCtrl', function($scope, $stateParams,$http, API_ENDPOINT){
	$scope.list = $stateParams.list;
	$scope.theBestVideo = $stateParams.list.id.videoId;
	$scope.content={
		tags:[]
	};
	$scope.data = {
    model: null,
    availableOptions: [
	{name:'News & Politics'},
	{name:'Talk Show'},
	{name:'Film'},
	{name:'Music'},
	{name:'Comedy'},
	{name:'Sports'},
	{name:'Education'},
	{name:'Science & Technology'},
	{name:'Travel & Events'}
]
   };
	$scope.publish= function(){
		$scope.content.source="youtube";
		$scope.content.contentType="video";
		$scope.content.contentId=$scope.list.id.videoId;
		//$scope.content.category="Talk Show";
		$scope.content.description=$scope.list.snippet.description;
		$scope.content.title = $scope.list.snippet.title;
		$http.post(API_ENDPOINT.url+"content", $scope.content).then(function(res){}, function(err){
				console.log(err);
		})
	}
})