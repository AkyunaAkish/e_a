class UpdatePasswordController {
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

    updatePassword() {
        let validCurrentPassword = !!(this.currentPassword && this.currentPassword.length > 0);
        let validNewPassword = !!(this.newPassword && this.newPassword.length > 0);
        let validConfirmNewPassword = !!(this.confirmNewPassword && this.confirmNewPassword.length > 0);
        let matches = !!(this.newPassword === this.confirmNewPassword);
        let hasSession = this.$localStorage.session;

        if (validCurrentPassword && validNewPassword && validConfirmNewPassword && matches) {
            this.$http.post(`${this.HOST}/users/update-password`, {
                    session: this.$localStorage.session,
                    newPassword: this.newPassword,
                    currentPassword: this.currentPassword,
                    email: this.$localStorage.session.user.email
                })
                .then((res) => {
                    if (res.data.success) {
                        this.closeModal();
                    } else {
                        this.errorService.setAuthError(`Invalid current password.`);
                        this.errorService.openErrorModal();
                    }
                })
                .catch((err) => {
                    this.errorService.setAuthError(`An error occurred, please sign in again to retry.`);
                    this.errorService.openErrorModal();
                });
        } else if (!matches) {
            this.errorService.setAuthError(`New password doesn't match confirmation password.`);
            this.errorService.openErrorModal();
        }
    }

    closeModal() {
        this.$uibModalInstance.close();
    }
};

export default UpdatePasswordController;
