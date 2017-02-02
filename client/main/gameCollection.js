// controller for game collection
<<<<<<< HEAD
var app = angular.module('gameMon.gameCollection', ['ui.materialize']);
app.controller('GameCollectionController', function($scope, userCollection) {
  $scope.data = {};
  $scope.data.games = [];
  $scope.username = 'test';
  // for(var i = 0; i < 5; i++){
  //   $scope.data.games[i] = 'Hello';
  // };

  userCollection.getUserCollection($scope.username, function(res) {
=======
var app = angular.module('gameMon.gameCollection', ['ui.materialize', 'gameMon.selectedGame']);
app.controller('GameCollectionController', function($scope, UserCollection, SelectedGame) {
  $scope.data = {};
  $scope.username = 'kevin';
  //Store games in corresponding objects
  $scope.platforms = {};
  $scope.genres = {};
  //Store just names in array
  $scope.platformArr = [];
  $scope.genreArr = [];

  $scope.selectGame = function(id) {
    SelectedGame.setCurrentGame(id);
    console.log('Selected Game: ', id);
  };

  UserCollection.getUserCollection($scope.username, function(res) {
    //Gets user collection, stores platforms and games in $scope.platforms
>>>>>>> de1a6abb5e2743dd1ef954d63e493f8bd5401e88
    $scope.data.games = res.data;
  });

  // userCollection.addGameToCollection($scope.username, 24024, function(res) {
  //   console.log(res.data);
  // });

  // userCollection.removeGameFromCollection($scope.username, 24024, function(res) {
  //   console.log(res.data);
  // });
});

app.factory('UserCollection', ['$http', function($http) {
  var db = {};

  db.getUserCollection = function(username, callback) {
    $http.get('/users/games/' + username)
      .then(function(response) {
        callback(response);
      }, failCallback);
  };

  db.addGameToCollection = function(username, gameId, callback) {
    // Get game obj from game id
    $http.get('/games/search/id/' + gameId)
      .then(function(response) {

        // Attach user to game object for back end processing
        var game = response.data;
        game.username = username;

        $http.post('/games', game)
          .then(function(response) {
            callback(response);
          }, failCallback);

      }, failCallback);
  };

  db.removeGameFromCollection = function(username, gameId, callback) {
    $http.get('/games/search/id/' + gameId)
      .then(function(response) {

        // Attach user to game object for back end processing
        var game = response.data;
        game.username = username;
        console.log(game);

        $http({
          url: '/games',
          method: 'DELETE',
          data: game,
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        })
          .then(function(response) {
            callback(response);
          }, failCallback);

      }, failCallback);
  };

  var failCallback = function(response) {
    console.log(response);
  };

  return db;
}]);


//SAMPLE CUSTOM FILTER
// app.filter('tagFilter', function() {
//   return function (items, classFilter) {
//     if (!items) {
//       return;
//     }
//     var filtered = [];
//     for (var i = 0; i<Object.keys(items).length; i++) {
//       var champ = items[Object.keys(items)[i]];
//       if(champ.tags.indexOf(classFilter) !== -1 || classFilter === '') {
//         filtered.push(champ);
//       }
//     }
//     return filtered;
//   };
// });
