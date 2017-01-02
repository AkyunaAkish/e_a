import controller from './createPost.controller.js';

export default () => {
    return {
        template: require('./createPost.html'),
        controller,
        restrict: 'E',
        controllerAs: 'vm',
        scope: {},
        bindToController: true
    };
};
