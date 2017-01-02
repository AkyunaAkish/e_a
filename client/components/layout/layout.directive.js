import controller from './layout.controller.js';

export default () => {
    return {
        template: require('./layout.html'),
        controller,
        restrict: 'E',
        controllerAs: 'vm',
        scope: {},
        bindToController: true
    };
};
