'use strict';

angular.module('mean.chat').controller('ChatController', ['$scope', 'Global', 'Chat',
  function($scope, Global, Chat) {
    $scope.global = Global;
    $scope.package = {
      name: 'chat'
    };
    var wsUri = 'ws://'+window.location.host.replace('3000','3001');
    var ws = new WebSocket(wsUri);
    if (ws!==null) {
		ws.onopen = function() {
			ws.send('open::'+$scope.global.user.name);
		};
		ws.onmessage = function(message) {
			var d = message.data.split('::');
			if (d[0]==='open') {
				$scope.alertMessage = d[1]+' se ha incorporado al chat !!';
				$scope.$apply();
			} else if (d[0]==='close') {
				$scope.alertMessage = d[1]+' ha abandonado al chat !!';
				$scope.$apply();
			} else {
				$scope.find();
			}
		};
    }
    
    $scope.find = function() {
        Chat.query(function(chat) {
        	$scope.alertMessage = '';
        	$scope.chat = chat;
        });
      };
    
    $scope.sendMessage = function () {
    	var chat = new Chat({content:this.content});
    	chat.$save(function(response) {
    		$scope.find();
    		ws.send('new::-');
        });
    };
      
  }
]);
