(function () {
    'use strict';
    angular
        .module('Bugs')
        .run(runFunc);
    function runFunc($templateCache, $http) {
      $http.get('components/home/directive/bug.template').success(function (template) {
        $templateCache.put('bug.template', template);
      });
    }

    runFunc.$inject = ['$templateCache', '$http'];
})();
