class NavbarController {
    /**@ngInject*/
    constructor(authService, $scope, $localStorage, $state, $rootScope) {
        this.authService = authService;
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$localStorage = $localStorage;
        this.session = this.authService.getSession();
        this.$state = $state;

        this.$rootScope.$on('closeNavbarToggle', (event, data) => {
            this.$scope.isNavCollapsed = data;
        })

        this.$scope.$watch(() => {
            return this.authService.getSession();
        }, (newVal) => {
            this.session = newVal;
        }, true);
    }

    signout() {
        this.authService.clearSession();
        this.$rootScope.$emit('closeNavbarToggle', true);
        this.$state.go('layout.posts');
    }
};

export default NavbarController;
