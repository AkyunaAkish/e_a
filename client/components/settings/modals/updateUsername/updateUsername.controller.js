class UpdateUsernameController {
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

    updateUsername() {
        if (this.newUsername && this.newUsername.length > 1 && this.$localStorage.session) {
            this.$http.post(`${this.HOST}/users/update-username`, {
                    session: this.$localStorage.session,
                    newUsername: this.newUsername
                })
                .then((res) => {
                    if (res.data.success) {
                        this.$localStorage.session.user.username = this.newUsername;
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

export default UpdateUsernameController;
