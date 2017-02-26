import controller from './settings.controller.js';

export default () => {
    return {
        template: require('./settings.html'),
        controller,
        restrict: 'E',
        controllerAs: 'vm',
        scope: {},
        bindToController: true
    };
};
