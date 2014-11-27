'use strict';

angular.module('mean.chat').controller('ChatController', ['$scope', 'Global', 'Chat',
  function($scope, Global, Chat) {
    $scope.global = Global;
    $scope.package = {
      name: 'chat'
    };
    
    $scope.find = function() {
        Chat.query(function(chat) {
          $scope.chat = chat;
        });
      };
    
    $scope.sendMessage = function () {
    	var chat = new Chat({content:this.content});
    	chat.$save(function(response) {
          $scope.find();
        });
    };
      
  }
]);
