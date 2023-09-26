app.controller("SignupController", ($scope, $http) => {
    $scope.onSignup = function () {
      if( Object.keys($scope.form).length > 0){  
        if ($scope.form.password == $scope.form.Cpassword) {
            if($scope.form.password.length >= 5){
              if($scope.form.firstname){  
                if($scope.form.lastname){
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.form.email) && $scope.form.password && $scope.form.password.trim() != '') {
                    $http({
                        url: SIGNUP_URL,
                        method: "POST",
                        cache: false,
                        data: $scope.form,
                        headers: {
                            "Content-Type": "application/json; charset=UTF-8",
                        },
                    }).then(
                        function (response) {
                            if (response.data.IsSuccess == true && response.data.Data != 0) {
                                window.location.href = "/";
                            } else {
                                swal("Oops", response.data.Message, "error")
                            }
                        },
                        function (error) {
                            swal("Oops", error.data.Message, "error");
                            if (error.status == 401) {
                                window.location.href = AUTO_LOGOUT;
                            }
                            console.error("something went wrong! try again");
                        }
                    );
                } else {
                    swal("Oops", "invalid email and password to create user", "error");
                }
            }else{
                swal("Oops","please enter lastname to create user","error");
            }
            }else{
                swal("Oops","please enter firstname to create user","error");
            }   
        }else{
            swal("Oops", "minimum 5 characters contains in your password please try again", "error")
            
        }
            
        } else {
            swal("Oops", "Both password and confirm password must be identical", "error")
        }
     }else{
        swal("Oops", "invalid data to create user", "error")
     }  
    } 
});