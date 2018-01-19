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
          vm.posts = response.posts;
        }
        else {
          console.log(response.errorDetails);
        }
      },
      function (error) {
        console.log(error);
      });
    };

    vm.deletePost = function(post) {
      NewsFactory.deletePost(post).then(function(response){
          if(response.success){
            vm.getPostsList();
          }
          else {
            console.log(response.errorDetails);
          }
        },
        function (error) {
          console.log(error);
        });
    };

    vm.redirect = function(post){
      window.open(post.story_url, '_blank')
      // window.location.href = post.story_url;
    };

    vm.getFriendlyTime = function(post) {
      var friendlyTyme = moment(post.created_at).fromNow();
      return friendlyTyme;
    };

    vm.getPostsList();

  }
]);
