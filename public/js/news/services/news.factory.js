/**
 * @ngdoc service
 * @name news:NewsFactory
 *
 * @description
 *
 *
 * */
angular.module('news')
  .factory('NewsFactory', ['$http', '$q', function($http, $q) {

    /**
     * Get the posts list
     *
     * @returns {Promise}
     */
    var getPostsList = function () {
      var defer = $q.defer();
      var promise = defer.promise;
      $http({
        method: "GET",
        url: '/news/get-posts-list',
        data: {
        }
      }).then(function (response) {
        defer.resolve(response.data);
      }, function(errorData){
        defer.reject(errorData);
        var errCode = 'MP-E00001';
        var errMessage = "An error occurred while trying to get the data.";
        console.log({
          "errorCode": errCode,
          "errorMessage": errMessage,
          "errorData": errorData
        });
      });
      return promise;
    };

    var Service = {
      getPostsList: getPostsList
    };

    return Service;
  }
]);
