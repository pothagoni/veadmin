var app = angular.module('veadmin');

app.constant('API_ENDPOINT',{
	url: 'http://130.211.134.15:8080/api/'
})
.constant('YOUTUBE_SEARCH',{
	url: 'https://www.googleapis.com/youtube/v3/search'
})
.constant("YOUTUBE_APIKEY",{
	apiKey: "AIzaSyBAkOEJDT5KKD1vwvtAgEnCrJnk580OiTo"
})
.constant("YOUTUBE_VIDEO",{
	url: 'https://www.googleapis.com/youtube/v3/videos'
})
.constant("CATEGORY",[
	{name:'Autos and Vehicles'},
	{name:'Comedy'},
	{name:'Education'},
	{name:'Film & Animation'},
	{name:'Gaming'},
	{name:'Howto & Style'},
	{name:'Music'},
	{name:'News & Politics'},
	{name:'Nonprofits & Activism'},
	{name:'People & Blogs'},
	{name:'Pets & Animals'},
	{name:'Science & Technology'},
	{name:'Sports'},
	{name:'Travel & Events'}
])