class SigninController {
    /**@ngInject*/
    constructor(authService, signinService, errorService, $scope, $state) {
        this.$scope = $scope;
        this.$state = $state;
        this.authService = authService;
        this.errorService = errorService;
        this.signinService = signinService;
        this.signingInUser = false;
        this.session = this.authService.getSession();

        this.$scope.$watch(() => {
            return this.authService.getSession();
        }, (newVal) => {
            this.session = newVal;
        }, true);
    }

    signin() {
        this.signingInUser = true;
        this.signinService.signin(this.signinObj.email, this.signinObj.password)
            .then((res) => {
                this.authService.setSession({
                    user: res.user,
                    token: res.token
                });

                this.signinObj = {};
                this.signingInUser = false;
                this.$state.go('layout.posts');
            })
            .catch((err) => {
                this.signingInUser = false;
                this.errorService.setAuthError(err.error);
                this.errorService.openErrorModal();
            });
    }
};

export default SigninController;
