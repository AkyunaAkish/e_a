class ForgotPasswordController {
    /**@ngInject*/
    constructor($uibModalInstance, $http, HOST, authService, errorService) {
        this.$uibModalInstance = $uibModalInstance;
        this.$http = $http;
        this.HOST = HOST;
        this.authService = authService;
        this.errorService = errorService;
        this.securityQuestionsLoaded = false;
        this.securityQuestions = {};
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
                    console.log('ud', userData);
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
        console.log(this.securityAnswerOne);
        console.log(this.securityAnswerTwo);

        // TODO: create a variable to store the current email in context
        // Then take submitted security answers and create a route on the server
        // to verify if the security answers are true for that email address
        // if they are true then show a form to reset the password
        // make user type same new password twice and then if they are the same
        // reset the password for that email address
        
        //*Not completely safe because an email is not being sent*
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