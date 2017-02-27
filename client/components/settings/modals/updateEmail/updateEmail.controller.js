class UpdateEmailController {
    /**@ngInject*/
    constructor($localStorage, $uibModalInstance, $http, HOST, errorService, authService) {
        this.$localStorage = $localStorage;
        this.errorService = errorService;
        this.authService = authService;
        this.$http = $http;
        this.HOST = HOST;
        this.$uibModalInstance = $uibModalInstance;
        this.user = this.$localStorage.session.user;
    }

    updateEmail() {
        if (this.newEmail && this.newEmail.length > 1 && this.$localStorage.session) {
            this.$http.post(`${this.HOST}/users/update-email`, {
                    session: this.$localStorage.session,
                    newEmail: this.newEmail
                })
                .then((res) => {
                    if (res.data.success) {
                        this.$localStorage.session.user.email = this.newEmail;
                        this.authService.refreshToken();
                        this.closeModal();
                    } else {
                        this.errorService.setAuthError(`An error occurred, please sign in again to retry.`);
                        this.errorService.openErrorModal();
                        this.authService.refreshToken();
                    }
                })
                .catch((err) => {
                    this.errorService.setAuthError(`An error occurred, please sign in again to retry.`);
                    this.errorService.openErrorModal();
                    this.authService.refreshToken();
                });
        }
    }

    closeModal() {
        this.$uibModalInstance.close();
    }
};

export default UpdateEmailController;
