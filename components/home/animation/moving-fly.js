(function () {
    'use strict';
    angular
        .module('Bugs')
        .animation('.moving-fly', testAnimation);
    function testAnimation($animate, $timeout, BugMovementService, UtilService) {
        return {
            addClass: function (element, className) {
              BugMovementService.moveBug(element[0], className);
            },
            removeClass: function (element, className) {
                var id = element[0].id;
                var nextDelay = UtilService.getRandomInt(1000, 10000);
                $timeout(function() {
                    BugMovementService.setBugDelay(id, nextDelay);
                    className = className.split(' ')
                      .filter(function(singleClassName) {
                        return singleClassName !== 'hidden';
                      })
                      .join(' ');
                    $animate.addClass(element, className);
                }, BugMovementService.getBugDelay(id));
            }
        };
    }

    testAnimation.$inject = ['$animate', '$timeout', 'BugMovementService', 'UtilService'];
})();
