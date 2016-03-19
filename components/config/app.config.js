(function () {
    'use strict';
    angular
        .module('Bugs')
        .config(config);
    function config ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider.state('/', {
            url: '/',
            templateUrl: 'components/home/view/Bug.html',
            controller: 'BugCtrl',
            controllerAs: 'vm'
        });
    }
})();
