import errorController from '../components/error/error.controller.js';

class errorService {
    /**@ngInject*/
    constructor($uibModal) {
        this.authError = '';
        this.$uibModal = $uibModal;
    }

    setAuthError(error) {
        this.authError = error;
    }

    getAuthError() {
        return this.authError;
    }

    openErrorModal() {
        this.$uibModal.open({
            scope: this.$scope,
            show: true,
            template: require('../components/error/error.html'),
            controller: errorController,
            controllerAs: 'vm',
            size: 'lg',
            keyboard: false,
            backdrop: 'static'
        });
    }
};

export default errorService;
