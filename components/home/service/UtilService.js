(function () {
  'use strict';
  angular
      .module('Bugs')
      .service('UtilService', UtilService);
  function UtilService() {
    var UtilService = {};

    UtilService.getRandomInt = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    UtilService.getRandomBoolean = function() {
      return Math.random() < 0.5;
    };
    UtilService.getRotation = function(x1, y1, x2, y2) {
      var degrees = Math.round(Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI) - 90;

      if (degrees <= -180) {
        degrees = Math.abs(degrees + 180);
      } else if (degrees >= 180) {
        degrees = -(degrees - 180);
      }
      if (degrees < 90 && degrees > 0 && y2 < y1) {
        degrees += 45;
      }

      return degrees;
    };

    return UtilService;
  }

  UtilService.$inject = [];
})();
