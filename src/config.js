import angular from 'angular';
import uiRouter from 'angular-ui-router';
//import ngRoute from 'angular-route';
import userFactory from 'factories/user-factory';
import userController from 'user/user';

const app = angular.module('app',[uiRouter,userFactory.name]);
app.config(($stateProvider,$urlRouterProvider,$locationProvider) => {
  $urlRouterProvider.otherwise('/');
  $stateProvider
    .state('home',{
      url:'/home',
      template:require('user/home.html'),
      controller:userController
    })
    .state('about',{
      url:'/about',
      template:require('about/about.html')
    })
    .state('sign',{
      url:'/signup',
      template:require('user/signup.html'),
      controller:userController
    })
    .state('ind',{
      url:'/',
      template:require('user/ind.html'),
      controller:userController
    });
    $locationProvider.html5Mode(true);
});
export default app;
