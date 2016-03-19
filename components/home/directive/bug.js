(function () {
  'use strict';
  angular
        .module('Bugs')
        .directive('bug', SpiderDirective);
  function SpiderDirective(BugMovementService, UtilService, $timeout, $templateCache) {
    return {
      restrict: 'E',
      scope: true,
      scope: {
         type: '@'
      },
      replace: true,
      template: $templateCache.get('bug.template'),
      link: function (scope, element, attrs) {
        attrs.$observe('type', function(value) {
          $timeout(function() {
            if (value === "spider") {
              BugMovementService.addSpider(element[0]);
            } else if (value === "fly") {
              BugMovementService.addFly(element[0]);
            }

          }, 100);
        });

      }
    };
  }
    SpiderDirective.$inject = ['BugMovementService', 'UtilService', '$timeout', '$templateCache'];
})();
