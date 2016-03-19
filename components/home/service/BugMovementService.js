(function () {
  'use strict';
  angular
      .module('Bugs')
      .service('BugMovementService', BugMovementService);
  function BugMovementService($animate, $timeout, UtilService) {
    var BugMovementService = {};
    var bugs = [];
    var duration = 8400;
    BugMovementService.getBugDelay = function(id) {
      if (angular.isDefined(bugs[id])) {
        return bugs[id].delay;
      } else {
        return null;
      }
    };

    BugMovementService.setBugDelay = function(id, delay) {
      if (angular.isDefined(bugs[id])) {
        bugs[id].delay = delay;
      }
    };
    BugMovementService.addSpider = function(element) {
      addBug(element, "spider");
      $timeout(function () {
        $animate.addClass(element, 'moving-spider');
      }, 0);
    };
    BugMovementService.addFly = function(element) {
      addBug(element, "fly");
      $timeout(function () {
        $animate.addClass(element, 'moving-fly');
      }, 0);
    };
    function addBug(element, type) {
      var id = element.id;
      var elementHeight = 0;
      var elementWidth = 0;
      var parentHeight = element.parentNode.clientHeight;
      var parentWidth = element.parentNode.clientWidth;
      if (type === "spider") {
        elementHeight = 90;
        elementWidth = 69;
      } else if (type === "fly") {
        elementHeight = 14;
        elementWidth = 13;
      }

      var x = UtilService.getRandomInt(10, parentWidth - elementWidth - 10);
      var y = UtilService.getRandomInt(10, parentHeight - elementHeight - 10);
      bugs[id] = {
        'x': x,
        'y': y,
        'initialised': false,
        'delay': 0
      };
    }

    function animateBug(element, className, x, y, rotate, duration) {
      var id = element.id;

      Velocity(element, {
        'translateY': y
      }, {
        'duration': duration
      });
      Velocity(element, {
        'translateX': x
      }, {
        'duration': duration,
        'queue': false
      });
      Velocity(element, {
        'rotateZ': rotate + 'deg'
      }, {
        'duration': duration,
        'easing': 'easeOutExpo',
        'queue':false,
        complete: function () {
          bugs[id].x = x;
          bugs[id].y = y;
          bugs[id].rotate = rotate;
          $timeout(function() {
            $animate.removeClass(element, className);
          }, 0);
        }
      });
    }
    BugMovementService.moveBug = function(element, className) {
      var id = element.id;
      var x = bugs[id].x;
      var y = bugs[id].y;
      var rotate = bugs[id].rotate;
      if (!bugs[id].initialised) {
        bugs[id].initialised = true;
        Velocity(element, {
          'translateY': y
        }, {
          'duration': 1
        });
        Velocity(element, {
          'translateX': x
        }, {
          'duration': 1,
          'queue': false,
          complete: function () {
            $timeout(function() {
              $animate.removeClass(element, 'hidden');
              $animate.removeClass(element, className);
            }, 0);
          }
       });
      } else {
        var elementHeight = element.clientHeight;
        var elementWidth = element.clientWidth;
        var parentHeight = element.parentNode.clientHeight;
        var parentWidth = element.parentNode.clientWidth;
        var xMovement = UtilService.getRandomInt(parentWidth / 8, parentWidth / 4);
        var yMovement = UtilService.getRandomInt(parentHeight / 8, parentHeight / 4);
        var isLeftMoveAllowed = (x - xMovement) > 0;
        var isRightMoveAllowed = (x + xMovement) < (parentWidth - elementWidth);
        var isUpMoveAllowed = y - yMovement > 0;
        var isDownMovedAllowed = (y + yMovement) < (parentHeight - elementHeight);
        // give a greater to chance to go in the same direction.
        var isGoingToMoveUp = UtilService.getRandomInt(0, 100) <= 70;
        var isGoingToMoveRight = UtilService.getRandomInt(0, 100) <= 90;
        if (rotate > 0) {
          isGoingToMoveRight = !isGoingToMoveRight;
        }
        if (rotate < 90 && rotate > -90) {
          isGoingToMoveUp = !isGoingToMoveUp;
        }

        if (isGoingToMoveUp && !isUpMoveAllowed) {
          isGoingToMoveUp = false;
        } else if (!isGoingToMoveUp && !isDownMovedAllowed) {
          isGoingToMoveUp = true;
        }
        if (isGoingToMoveUp) {
          yMovement = -yMovement;
        }

        if (isGoingToMoveRight && !isRightMoveAllowed) {
          isGoingToMoveRight = false;
        } if (!isGoingToMoveRight && !isLeftMoveAllowed) {
          isGoingToMoveRight = true;
        }
        if (!isGoingToMoveRight) {
          xMovement = -xMovement;
        }

        rotate = UtilService.getRotation(x, y, x + xMovement, y + yMovement);

        x += xMovement;
        y += yMovement;

        animateBug(element,className, x, y, rotate, duration);
      }

    };

    return BugMovementService;
  }

  BugMovementService.$inject = ['$animate', '$timeout', 'UtilService'];
})();
