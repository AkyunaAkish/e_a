import controller from './signin.controller.js';

export default () => {
    return {
        template: require('./signin.html'),
        controller,
        restrict: 'E',
        controllerAs: 'vm',
        scope: {},
        bindToController: true
    };
};
