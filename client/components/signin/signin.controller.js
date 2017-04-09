import ForgotPasswordModalController from '../forgotPasswordModal/forgotPasswordModal.controller.js';

class SigninController {
    /**@ngInject*/
    constructor(authService, signinService, errorService, $scope, $state, $uibModal) {
        this.$scope = $scope;
        this.$uibModal = $uibModal;
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
                if (err.error) {
                    this.signingInUser = false;
                    this.errorService.setAuthError(err.error);
                    this.errorService.openErrorModal();
                } else if (!err.data) {
                    this.signingInUser = false;
                    this.errorService.setAuthError('Could not connect with server, your internet connection may not be working.');
                    this.errorService.openErrorModal();
                } else {
                    this.signingInUser = false;
                    this.errorService.setAuthError('Unknown error occurred when attempting to sign you in, please try again.');
                    this.errorService.openErrorModal();
                }
            });
    }

    openForgotPasswordModal() {
        this.$uibModal.open({
            scope: this.$scope,
            show: true,
            template: require('../forgotPasswordModal/forgotPasswordModal.html'),
            controller: ForgotPasswordModalController,
            controllerAs: 'vm',
            size: 'lg',
            backdrop: 'static',
            keyboard: false
        });
    }
};

export default SigninController;