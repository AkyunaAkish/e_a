class ResetPasswordController {
    /**@ngInject*/
    constructor($uibModalInstance, $http, $rootScope, HOST, errorService) {
        this.errorService = errorService;
        this.$rootScope = $rootScope;
        this.$http = $http;
        this.HOST = HOST;
        this.$uibModalInstance = $uibModalInstance;
        this.email = this.$rootScope.email;
        this.securityAnswerOne = this.$rootScope.securityAnswerOne;
        this.securityAnswerTwo = this.$rootScope.securityAnswerTwo;
    }

    resetPassword() {
        let validNewPassword = !!(this.newPassword && this.newPassword.length > 0);
        let validConfirmNewPassword = !!(this.confirmNewPassword && this.confirmNewPassword.length > 0);
        let matches = !!(this.newPassword === this.confirmNewPassword);
        
        if (this.email && this.email.length &&
            validNewPassword && validConfirmNewPassword && matches) {
            this.$http.post(`${this.HOST}/users/reset-password`, {
                    email: this.email,
                    newPassword: this.newPassword,
                    securityAnswerOne: this.securityAnswerOne,
                    securityAnswerTwo: this.securityAnswerTwo
                })
                .then((res) => {
                    if (res.data.success) {
                        this.closeModal();
                    } else {
                        this.errorService.setAuthError(res.data.error.message || `Passwords don't match.`);
                        this.errorService.openErrorModal();
                    }
                })
                .catch((err) => {
                    this.errorService.setAuthError(`An error occurred.`);
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

export default ResetPasswordController;
