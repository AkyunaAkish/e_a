import controller from './signup.controller.js';

export default () => {
    return {
        template: require('./signup.html'),
        controller,
        restrict: 'E',
        controllerAs: 'vm',
        scope: {},
        bindToController: true
    };
};
