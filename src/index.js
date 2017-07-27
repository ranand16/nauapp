import angular from 'angular';
import appModule from 'config';
import 'css/master.scss';

angular.bootstrap(document,[appModule.name]);

//angular.bootstrap(element, [modules], [config]);
/*
Example 1: Manually Bootstrap Your Angular Application
<!doctype html>
<html>
<body>
  <div ng-controller="LoginMessage">{{message}}</div>
  <script src="angular.js"></script>
  <script>
  angular.module('example', [])
  .controller('LoginMessage', function($scope) {
    $scope.message = 'Welcome to Members Area!';
  });
  angular.bootstrap(document, ['example']);
  </script>
</body>
</html>

Note how we selected document as the root of the application
and how we passed the example module to the angular.bootstrap() function

Example 2: Bootstrap by Selecting a Specific Element

<!doctype html>
<html>
<body>
  <div id="year" ng-controller="Year">{{CurrentYear}}</div>
  <script src="angular.js"></script>
  <script>
  angular.module('example', [])
  .controller('Year', function($scope) {
    $scope.CurrentYear = new Date().getFullYear();
  });
  angular.bootstrap(document.getElementById('year'), ['example']);
  </script>
</body>
</html>
We selected the div element with the id #year as the root of our application.

Example 3: Bootstrap Multiple Applications

Using the angular.bootstrap function, you can bootstrap multiple angular applications on a single page.
Let’s say we have two applications (app1 and app2) defined by two div elements:

<div id="app1">...</div>
<div id="app2">...</div>

<div id="app1">...</div>
<div id="app2">...</div>

We use the following code to start up these two applications:
angular.module('app1', []);
angular.module('app2', []);

angular.bootstrap(document.getElementById('app1'), ['app1']);
angular.bootstrap(document.getElementById('app2'), ['app2']);

angular.module('app1', []);
angular.module('app2', []);

angular.bootstrap(document.getElementById('app1'), ['app1']);
angular.bootstrap(document.getElementById('app2'), ['app2']);
Before ending this tutorial, we will list a number of things you should pay attention
while manually starting your applications using angular.bootstrap.

If you use angular.bootstrap to start your application, you shouldn’t use the ng-app directive.
You need to create the custom modules before passing them as a parameter to angular.bootstrap().
When using multiple bootstraps on the same page, use them cautiously

*/
