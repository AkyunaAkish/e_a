import controller from './post.controller.js';

export default () => {
    return {
        template: require('./post.html'),
        controller,
        restrict: 'E',
        controllerAs: 'vm',
        scope: {},
        bindToController: true
    };
};
