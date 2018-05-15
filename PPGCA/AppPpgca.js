var app = angular.module('AngularUIAppPpgca', [
    "ngRoute",
    "ngTouch",
    "mobile-angular-ui",
    "firebase"
]);

app.controller('MainController', ['$scope', '$firebaseSimpleLogin', '$location', '$rootScope',
    function($scope, $firebaseSimpleLogin, $location, $rootScope ) {


        var config = {
            apiKey: "AIzaSyCYcLg0nPbsTP9yQgJUJE1ow0RLuAxXWTc",
            authDomain: "ppgca-app.firebaseapp.com",
            databaseURL: "https://ppgca-app.firebaseio.com"
        };

        firebase.initializeApp(config);

        var rootRef = firebase.database().ref();
        var auth = firebase.auth();
        var dbRef = firebase.database();
        var usersRef = dbRef.ref('users')




        $scope.user = {
            username: "",
            password: ""
        };



        $scope.logout = function() {
            $scope.loggedIn = false;
            $scope.user = {
                username: "",
                password: ""
            };
            $location.path('/');
        }

        var login = {};
        $scope.login = login;

        $scope.showSignUp = function() {
            $rootScope.toggle('myOverlay', 'off');

            $scope.user = {
                username: "",
                password: ""
            };
            $location.path('/signUp');
        }

        $scope.showSignIn = function() {
            $rootScope.toggle('myOverlay', 'off');
            $scope.user = {
                username: "",
                password: ""
            };

            $location.path('/');
        }

        $scope.signUp = function() {
            login.loading = true;
            var email = $scope.user.username;
            var password = $scope.user.password;

            if (email && password) {

                firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
                  login.loading = false;
                  $scope.signUpMessage = "Registro do usuário completo";
                  $rootScope.toggle('myOverlay', 'on');
                  console.log(user);

                }, function(error) {
                    console.log(error);
                    login.loading = false;
                });
            }
        }

        $scope.signin = function() {
            login.loading = true;
            console.log('m dsd');
            var email = $scope.user.username;
            var password = $scope.user.password;
            if (email && password) {
                console.log('me in');
                firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
                    login.loading = false;
                    console.log("Usuário logado com sucesso", user.email);
                    $scope.loggedIn = true;
                    $scope.userEmailId = user.email;
                    $location.path('/userHome');
                }, function(error) {
                    login.loading = false;
                    console.log("Usuário e senha não encontrados");

                });
            }
        }

    }
]);

app.directive('uiLadda', [function() {
    return {
        link: function(scope, element, attrs) {
            var Ladda = window.Ladda,
                ladda = Ladda.create(element[0]);
            scope.$watch(attrs.uiLadda, function(newVal, oldVal) {
                if (newVal) {
                    ladda.start();
                } else {
                    ladda.stop();
                }
            });
        }
    };
}]);


app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: "signIn.html"
    });
    $routeProvider.when('/userHome', {
        templateUrl: 'userHome.html'
    });
    $routeProvider.when('/signUp', {
        templateUrl: 'signUp.html'
    });
});
