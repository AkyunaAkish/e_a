import controller from './posts.controller.js';

export default () => {
    return {
        template: require('./posts.html'),
        controller,
        restrict: 'E',
        controllerAs: 'vm',
        scope: {},
        bindToController: true
    };
};