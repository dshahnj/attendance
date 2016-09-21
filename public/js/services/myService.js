app.factory('myService', function($http,$q){

	function addStudent(userName,userID, myDateObj) {
		//alert(typeof (myDateObj));
		var studentInfo = {};
		studentInfo.userName = userName;
		studentInfo.userID = userID;
		studentInfo.timestamp = myDateObj;

		return sendData(studentInfo);
	}

	function getData(){
		var request = $http({
			url:'/students',
			method:"GET"
		});

		return sendRequest(request);
	}

	function sendData(studentInfo){
		var request = $http({
			url:'/students',
			method:"POST",
			data:studentInfo
		});

		return sendRequest(request);
	}

	function sendRequest(config){
		var deferred = $q.defer();

		config.then(function(response){
			deferred.resolve(response);

		}, function(error){
			deferred.reject(error);

		})
		return deferred.promise;
	}

	return {
		addStudent:addStudent,
		getData:getData
	}

});

