// 'use strict';
(function () {

    /**
     * @author José Gabriel González <jgabrielsinner@gmail.com>
     *
     * Description
     *
     * @type {angular.Module}
     */
    angular.module('news', [
      'ngSanitize',
      'angular-loading-bar'
    ]);

    angular.module('news')
        .constant('constants', (function() {
            return {

            };
        })());

})();