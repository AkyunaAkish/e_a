class UpdateSecurityQuestionsController {
    /**@ngInject*/
    constructor($localStorage, $uibModalInstance, $http, authService, errorService, HOST) {
        this.$localStorage = $localStorage;
        this.$uibModalInstance = $uibModalInstance;
        this.$http = $http;
        this.HOST = HOST;
        this.authService = authService;
        this.errorService = errorService;
        this.user = this.$localStorage.session.user;

        this.authService.retrieveUserData(this.user.email, 'false')
            .then((userData) => {
                this.securityQuestionOne = userData.security_question_one || '';
                this.securityQuestionTwo = userData.security_question_two || '';
                this.securityAnswerOne = userData.security_answer_one || '';
                this.securityAnswerTwo = userData.security_answer_two || '';
            })
            .catch((err) => {
                this.errorService.setAuthError(`An error occurred, please sign in again to retry.`);
                this.errorService.openErrorModal();
            });
    }

    updateSecurityQuestions() {
        if (this.user &&
            this.securityQuestionOne &&
            this.securityQuestionOne.length &&
            this.securityQuestionTwo &&
            this.securityQuestionTwo.length &&
            this.securityAnswerOne &&
            this.securityAnswerOne.length &&
            this.securityAnswerTwo &&
            this.securityAnswerTwo.length) {

            this.$http.post(`${this.HOST}/users/update-security-questions-and-answers`, {
                    session: this.$localStorage.session,
                    newSecurityQuestionsAndAnswers: {
                        securityQuestionOne: this.securityQuestionOne,
                        securityQuestionTwo: this.securityQuestionTwo,
                        securityAnswerOne: this.securityAnswerOne,
                        securityAnswerTwo: this.securityAnswerTwo
                    }
                })
                .then((res) => {
                    if (res.data.success) {
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
        } else {
            this.errorService.setAuthError(`You either are not signed in, or you did not properly fill in the form.`);
            this.errorService.openErrorModal();
        }
    }

    closeModal() {
        this.$uibModalInstance.close();
    }
};

export default UpdateSecurityQuestionsController;