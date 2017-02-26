export default (['$stateProvider', '$urlRouterProvider', '$locationProvider',
    ($stateProvider, $urlRouterProvider, $locationProvider) => {
        $stateProvider
            .state('layout', {
                template: '<layout-directive></layout-directive>'
            })
            .state('layout.posts', {
                url: '/',
                template: '<posts-directive></posts-directive>'
            })
            .state('layout.post', {
                url: '/posts/:id',
                template: '<post-directive></post-directive>'
            })
            .state('layout.signup', {
                url: '/signup',
                template: '<signup-directive></signup-directive>',
                mustBeLoggedOut: true
            })
            .state('layout.signin', {
                url: '/signin',
                template: '<signin-directive></signin-directive>',
                mustBeLoggedOut: true
            })
            .state('layout.settings', {
                url: '/settings',
                template: '<settings-directive></settings-directive>',
                mustBeLoggedIn: true
            })
            .state('layout.createPost', {
                url: '/createPost',
                template: '<create-post-directive></create-post-directive>',
                mustBeLoggedIn: true,
                mustBeAdmin: true
            });


        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    }
]);
