export default (['$rootScope', 'authService', '$state', '$localStorage', '$timeout', '$http', 'HOST',
    ($rootScope, authService, $state, $localStorage, $timeout, $http, HOST) => {
        $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
            $rootScope.$emit('pendingRouteValidation', true);

            if (toParams.id) {
                $http.get(`${HOST}/posts/retrieve-post/${toParams.id}`).then((post) => {
                    if (post.data.success) {
                        $rootScope.metadata = {
                            title: post.data.success.title,
                            image: post.data.success.thumbnail_url,
                            url: `${HOST}/posts/${toParams.id}`
                        };
                    }
                });
            } else {
                $rootScope.metadata = {
                    title: 'Elena Akish',
                    image: 'https://drive.google.com/file/d/0Bw6Wv889sj3vUk9ORXFiZW5mZG8/view',
                    url: window.location.href
                };
            }

            authService.hasSession()
                .then((res) => {
                    if ((res && toState.mustBeLoggedOut) || (!res && toState.mustBeLoggedIn)) {
                        $timeout(() => {
                            $state.go('layout.posts');
                            $rootScope.$emit('closeNavbarToggle', true);
                            $rootScope.$emit('pendingRouteValidation', false);
                        });
                    } else if (res && toState.mustBeAdmin && toState.mustBeLoggedIn && $localStorage.session) {
                        authService.validateAdmin($localStorage.session.user, $localStorage.session.token)
                            .then((validateRes) => {
                                if (!validateRes) {
                                    $timeout(() => {
                                        $state.go('layout.posts');
                                        $rootScope.$emit('pendingRouteValidation', false);
                                    });
                                } else {
                                    $timeout(() => {
                                        $rootScope.$emit('closeNavbarToggle', true);
                                        $rootScope.$emit('pendingRouteValidation', false);
                                    });
                                }
                            })
                            .catch((err) => {
                                $timeout(() => {
                                    $state.go('layout.posts');
                                    $rootScope.$emit('pendingRouteValidation', false);
                                });
                            });
                    } else {
                        $timeout(() => {
                            $rootScope.$emit('closeNavbarToggle', true);
                            $rootScope.$emit('pendingRouteValidation', false);
                        });
                    }
                })
                .catch((err) => {
                    $timeout(() => {
                        $state.go('layout.posts');
                        $rootScope.$emit('closeNavbarToggle', true);
                        $rootScope.$emit('pendingRouteValidation', false);
                    });
                });
        });
    }
]);