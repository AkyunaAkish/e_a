import controller from './navbar.controller.js';

export default () => {
    return {
        template: require('./navbar.html'),
        controller,
        restrict: 'E',
        controllerAs: 'vm',
        scope: {},
        bindToController: true
    };
};
