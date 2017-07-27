
import _ from 'lodash';

export default function($scope, $location, userFactory){
  userFactory.getMsgs($scope);
  $scope.user = '';
  //userFactory.getUsers($scope);
  $scope.createUser = _.partial(userFactory.createUser,$scope);
  //$scope.userLogin  = _.partial(userFactory.userLogin,$scope);
  $scope.userLogin  = _.partial(userFactory.userLogin,$scope,$location);
  $scope.loggedIn = _.partial(userFactory.isLoggedIn,$scope); //for displaying the logOut button and future purposes.
  $scope.logout = function(){
    userFactory.logout();
    $location.path('/logout');
  }
  $scope.sendMessage = _.partial(userFactory.sendMessage, $scope);
//   let params = {
//     createHasInput:false
//   };
//   $scope.onCompletedClick = todo => {
//     todo.isCompleted = !todo.isCompleted;
//   };
//   $scope.onEditClick = todo => {
//     // console.log($scope);
//     todo.isEditing = true;
//     todo.updatedTask = todo.task;
//   };
//   $scope.onCancelClick = todo => {
//     todo.isEditing = false;
//   };
//
//   $scope.createTask = _.partial(userFactory.createTask, $scope, params);
//   $scope.$watch('createTaskInput',_.partial(userFactory.watchCreateTaskInput,params,$scope));
//   $scope.updateTask = _.partial(userFactory.updateTask, $scope);
//   $scope.deleteTask = _.partial(userFactory.deleteTask, $scope);
}
