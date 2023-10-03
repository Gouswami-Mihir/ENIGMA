app.controller("AdduserController", ($scope, $http) => {
    $scope.onAdduser = function(){
        if(Object.keys($scope.form).length > 0){
            if(Object.keys($scope.form.mobile).length === 10){
            console.log('data',$scope.form);
            if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.form.email) && $scope.form.password && $scope.form.password.trim() != ''){
                $http({
                    url: BASE_URL + "addnewuser",
                    method: "POST",
                    cache: false,
                    data: $scope.form,
                    headers: {
                        "Content-Type":"application/json; charset=UTF-8",
                    },
                }).then(
                    function(response){
                        if(response.data.IsSuccess == true && response.data.Data != 0){
                            swal("Success",response.data.Message, "success");
                            window.location.href = "/users";
                        }else{
                            swal("Oops",response.data.Message,"error");
                        }
                    },
                    function(error){
                        swal("Oops",error.data.Message,"error");
                        if(error.status == 401){
                            window.location.href = AUTO_LOGOUT;
                        }
                        console.error("something went wrong! try again");
                    }
                )
            }else{
                swal("Oops","invalid email and password to add user, please try again with new email","error");
            }
         }else{
            swal("Oops","invalid mobile number to add user, please try again","error");
         }  
        }else{
            swal("Oops","invalid data to add user","error");
        }
    }
})