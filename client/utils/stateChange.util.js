export default (['$rootScope', 'authService', '$state', '$localStorage', '$timeout',
    ($rootScope, authService, $state, $localStorage, $timeout) => {
        $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
            $rootScope.$emit('pendingRouteValidation', true);

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