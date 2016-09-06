/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//create a module to use
var myapp = angular.module("webonise", []);

//Create a controller for Main Page View
myapp.controller("MainPageController", function($scope, $http, $rootScope) {
	//controller logic goes here
	$rootScope.MyData = []; //Array for storing the data fetched from JSON file
	$rootScope.ViewName = 'MainPage'; //To change between different views

	//init function which will be called as the div loads
	$scope.init = function() {
		var jsondata = $http.get("http://spa.crestrou.com/mydata.json");
		jsondata.success(function (data) {
			$rootScope.MyData = data;
		});
		jsondata.error(function (error) {
			console.log("Error: " + error);
		});
	};

	//Function which changes the View to details based on the index passed
	$scope.ShowDetails = function(index) {
		$rootScope.id = index;
		$rootScope.ViewName = 'details';
	}
});

//Create a controller for Details View
myapp.controller('DetailsController', function($scope, $rootScope) {
	
	//Function to change the View back to Main Page view
	$scope.ShowDetails = function () {
		$rootScope.ViewName = 'MainPage';
	}
});

app.config(function($httpProvider) {
	//Enable cross-domain calls
	$httpProvider.defaults.useXDomain = true;
	
	//Remove the header  used to identify ajax call that would prevent CORS from working
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
});