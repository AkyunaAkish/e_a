import resetPasswordController from './resetPasswordModal/resetPassword.controller.js';

class ForgotPasswordController {
    /**@ngInject*/
    constructor($uibModal, $uibModalInstance, $localStorage, $http, HOST, authService, errorService, $rootScope) {
        this.$rootScope = $rootScope;
        this.$uibModal = $uibModal;
        this.$uibModalInstance = $uibModalInstance;
        this.$localStorage = $localStorage;
        this.$http = $http;
        this.HOST = HOST;
        this.authService = authService;
        this.errorService = errorService;
        this.securityQuestionsLoaded = false;
        this.securityQuestions = {};
        this.email = '';
        this.securityAnswerOne = '';
        this.securityAnswerTwo = '';
    }

    loadSecurityQuestions(email) {
        this.authService.retrieveUserData(email, 'true')
            .then((userData) => {
                if (typeof userData === 'object') {
                    delete userData.id;
                    delete userData.username;
                    delete userData.email;
                    delete userData.user_created_at;
                    this.securityQuestions = {
                        ...userData
                    };
                    this.securityQuestionsLoaded = true;
                    this.email = email;
                } else {
                    this.errorService.setAuthError(userData);
                    this.errorService.openErrorModal();
                }
            })
            .catch((err) => {
                this.errorService.setAuthError('User with that email could not be found.');
                this.errorService.openErrorModal();
            });
    }

    submitAnswers() {
        this.$http.post(`${this.HOST}/users/submit-security-answers`, {
                email: this.email,
                securityAnswerOne: this.securityAnswerOne,
                securityAnswerTwo: this.securityAnswerTwo
            })
            .then((res) => {
                if (res.data.success) {
                    this.closeModal();
                    this.$rootScope.email = this.email;
                    this.$rootScope.securityAnswerOne = this.securityAnswerOne;
                    this.$rootScope.securityAnswerTwo = this.securityAnswerTwo;
                    this.$uibModal.open({
                        scope: this.$scope,
                        show: true,
                        template: require('./resetPasswordModal/resetPassword.html'),
                        controller: resetPasswordController,
                        controllerAs: 'vm',
                        size: 'lg',
                        keyboard: false,
                        backdrop: 'static'
                    });
                } else {
                    this.errorService.setAuthError('One or more security questions incorrect.');
                    this.errorService.openErrorModal();
                }
                console.log('res', res);
            })
            .catch((err) => {
                console.log('err', err);
            });
    }

    forgotPasswordSubmitDisabled() {
        if (!this.securityAnswerOne ||
            !this.securityAnswerOne.length ||
            !this.securityAnswerTwo ||
            !this.securityAnswerTwo.length) {
            return true;
        } else {
            return false;
        }
    }
    closeModal() {
        this.$uibModalInstance.dismiss();
    }
};

export default ForgotPasswordController;