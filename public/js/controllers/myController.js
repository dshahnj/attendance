app.controller("myController", function($scope, myService){
	
	$scope.userID = "";
	$scope.userName= "";

	$scope.selectedDate = new Date();

	$scope.students;

    $scope.formatDate = function(date){
          var dateOut = new Date(date);
          return dateOut;
    };
    
	$scope.addStudents = function(userName,userID){
		$scope.userName = userName;
		$scope.userID = userID;
		
		myService.addStudent(userName,userID,$scope.selectedDate).then(
			function(response){
				var result = response.data;
	
				$scope.getData();

			}, function(error){

				console.log("Error: "+error);
			})
	}

	$scope.getData = function(){

		myService.getData().then(
			function(response){
				$scope.myResponse = response.data;

				$scope.students = response.data;
				
				
				/*console.log("selected date: "+ $scope.selectedDate);
				console.log(typeof ($scope.selectedDate));
				console.log(String($scope.selectedDate));
				console.log("response date: "+ $scope.myResponse[0].timestamp);
				console.log(typeof($scope.myResponse[0].timestamp));
				for(var i = 0; i < $scope.myResponse.length; i++){
					
					

				}*/


			}, function(error){

				console.log("Error: "+error);
			})
	}


	$scope.getData();

})
