import updateEmailController from './modals/updateEmail/updateEmail.controller.js';
import updatePasswordController from './modals/updatePassword/updatePassword.controller.js';
import updateSecurityQuestionsController from './modals/updateSecurityQuestions/updateSecurityQuestions.controller.js';
import updateUsernameController from './modals/updateUsername/updateUsername.controller.js';

class SettingsController {
    /**@ngInject*/
    constructor($localStorage, $uibModal, $scope) {
        this.$uibModal = $uibModal;
        this.$scope = $scope;
        this.$localStorage = $localStorage;
        this.user = this.$localStorage.session.user;
    }

    updateEmail() {
        this.$uibModal.open({
            scope: this.$scope,
            show: true,
            template: require('./modals/updateEmail/updateEmail.html'),
            controller: updateEmailController,
            controllerAs: 'vm',
            size: 'lg',
            keyboard: false,
            backdrop: 'static'
        });
    }

    updatePassword() {
        this.$uibModal.open({
            scope: this.$scope,
            show: true,
            template: require('./modals/updatePassword/updatePassword.html'),
            controller: updatePasswordController,
            controllerAs: 'vm',
            size: 'lg',
            keyboard: false,
            backdrop: 'static'
        });
    }

    updateUsername() {
        this.$uibModal.open({
            scope: this.$scope,
            show: true,
            template: require('./modals/updateUsername/updateUsername.html'),
            controller: updateUsernameController,
            controllerAs: 'vm',
            size: 'lg',
            keyboard: false,
            backdrop: 'static'
        });
    }

    updateSecurityQuestions() {
        this.$uibModal.open({
            scope: this.$scope,
            show: true,
            template: require('./modals/updateSecurityQuestions/updateSecurityQuestions.html'),
            controller: updateSecurityQuestionsController,
            controllerAs: 'vm',
            size: 'lg',
            keyboard: false,
            backdrop: 'static'
        });
    }
};

export default SettingsController;
