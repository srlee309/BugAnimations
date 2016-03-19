(function () {
    'use strict';
    angular
        .module('Bugs')
        .controller('BugCtrl', HomeCtrl);
    function HomeCtrl($scope) {
      var vm = this;
      vm.bugs = [];

      vm.addSpider = function() {
        var spider = {
          type: "spider"
        };
        vm.bugs.push(spider);
      };

      vm.addFly = function() {
        var fly = {
          type: "fly"
        };
        vm.bugs.push(fly);
      };
    }


    HomeCtrl.$inject = ['$scope'];
})();
