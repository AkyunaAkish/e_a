class SignupController {
    /**@ngInject*/
    constructor(signupService, $state, errorService, authService, $scope) {
        this.signupService = signupService;
        this.errorService = errorService;
        this.authService = authService;
        this.$state = $state;
        this.$scope = $scope;
        this.signingUpUser = false;
        this.session = this.authService.getSession();

        this.$scope.$watch(() => {
            return this.authService.getSession();
        }, (newVal) => {
            this.session = newVal;
        }, true);
    }

    signup() {
        this.signingUpUser = true;
        this.signupService.signup(this.signupObj)
            .then((res) => {
                this.authService.setSession({
                    user: res.user,
                    token: res.token
                });

                this.signupObj = {};
                this.signingUpUser = false;
                this.$state.go('layout.posts');
            })
            .catch((err) => {
                if (err.data &&
                    err.data.reason &&
                    err.data.reason.psql_error &&
                    err.data.reason.psql_error.code == 23505) {
                    let field = err.data.reason.psql_error.constraint.split('_')[1];
                    this.errorService.setAuthError(`A user with that ${field} already exists.`);
                    this.errorService.openErrorModal();
                    this.signingUpUser = false;
                } else if (err.data && err.data.error) {
                    this.signingUpUser = false;
                    this.errorService.setAuthError(err.data.error);
                    this.errorService.openErrorModal();
                } else if (!err.data) {
                    this.signingUpUser = false;
                    this.errorService.setAuthError('Could not connect with server, your internet connection may not be working.');
                    this.errorService.openErrorModal();
                } else {
                    this.signingUpUser = false;
                    this.errorService.setAuthError('Unknown error occurred when attempting to sign you up, please try again.');
                    this.errorService.openErrorModal();
                }
            });
    }

};

export default SignupController;
