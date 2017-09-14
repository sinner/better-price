/**
 * @ngdoc controller
 * @name news:NewListCtrl
 *
 * @description
 *
 * @requires $scope
 * */
angular.module('news')
  .controller('NewListCtrl', ['$scope', 'NewsFactory', function($scope, NewsFactory) {

    var vm = this;

    vm.posts = [];

    vm.getPostsList = function() {
      NewsFactory.getPostsList().then(function(response){
        if(response.success){
          vm.posts = response.posts.hits;
        }
        else {
          console.log(response.errorDetails);
        }
      },
      function (error) {
        console.log(error);
      });
    };

    vm.getFriendlyTime = function(post) {
      var friendlyTyme = moment(post.created_at).fromNow();
      console.log(friendlyTyme);
      return friendlyTyme;
    };

    vm.getPostsList();

  }
]);
