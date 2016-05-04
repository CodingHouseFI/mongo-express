'use strict';

var app = angular.module('exampleApp', []);

app.controller('exampleCtrl', function($scope, Tree) {
  Tree.get()
  .then(res => {
    $scope.trees = res.data;    
  });

  $scope.edit = tree => {
    $scope.editFormTree = angular.copy(tree);
  };

  $scope.saveChanges = () => {
    Tree.update($scope.editFormTree)
    .then(res => {
      $scope.trees.forEach((tree, i) => {
        if(tree._id === res.data._id) {
          $scope.trees[i] = res.data;
        }
      });
      $scope.editFormTree = null;
    });
  };

  $scope.cancelEdit = () => {
    $scope.editFormTree = null;
  };

});

app.service('Tree', function($http) {

  this.get = () => {
    return $http.get('/api/trees');
  }

  this.update = tree => {
    return $http.put(`/api/trees/${tree._id}`, tree);
  };

});

