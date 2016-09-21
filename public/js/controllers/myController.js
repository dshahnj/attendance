app.controller("myController", function($scope, myService){
	
	// $(document).ready(function(){
	// 	$(window).keydown(function(e){
	// 		if(e.keyCode == 13){
	// 			e.preventDefault();
	// 			return false;
	// 		}
	// 	})
	// });

	$scope.userID = "";
	$scope.userName= "";

	$scope.pad = function pad(num, size){ return ('000000000' + num).substr(-size); }
	$scope.getdmy = function getdmy(o) { return o.getFullYear() + "-" + $scope.pad((o.getMonth()+1),2) + "-" + $scope.pad(o.getDate(),2); }
	
	$scope.selectedDate= new Date();
	$scope.todayDate = $scope.getdmy($scope.selectedDate);

	$scope.showAllRecords = false;
    $scope.studentInputActive = false;

	$scope.dt= "";

	$scope.students = {};

	$scope.addStudentInList = function(){
		$scope.selectedDate = new Date();
		$scope.ShowStudentsInfo();
		$scope.studentInputActive = true;

	}

    $scope.ShowStudentsInfo = function(){
    	$scope.studentInputActive = false;
    	$scope.showAllRecords = false;
    	$scope.dt = $scope.getdmy($scope.selectedDate);
    }

    $scope.showAll = function(){
    	
    	$scope.studentInputActive = false;
    	$scope.showAllRecords = true;
    }
    
	$scope.addStudents = function(userName,userID){
		$scope.userName = userName;
		$scope.userID = userID;
		
		myService.addStudent(userName,userID,$scope.dt).then(
			function(response){
				var result = response.data;
				
				$scope.students.push(result);
				
				$scope.getData();
				
				$scope.userName = "";
				$scope.userID = "";

			}, function(error){

				console.log("Error: "+error);
			})
	}

	$scope.getData = function(){

		myService.getData().then(
			function(response){
				
				$scope.students = response.data;
//				
			}, function(error){

				console.log("Error: "+error);
				
			})
	}

	$scope.searchName = function(userID){
		
		console.log(userID);
		for(var i = 0 ; i < $scope.students.length; i++){
			if(userID == $scope.students[i].userID){
				$scope.userName = $scope.students[i].userName;
			}
		}
	}
	
	$scope.ShowStudentsInfo();
	$scope.getData();

})
