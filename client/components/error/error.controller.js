class ErrorController {
    /**@ngInject*/
    constructor($uibModalInstance, errorService, $scope) {
        this.errorService = errorService;
        this.$scope = $scope;
        this.$uibModalInstance = $uibModalInstance;
        this.currentErrorMessage = this.errorService.getAuthError();

        this.$scope.$watch(() => {
            return this.errorService.getAuthError();
        }, (newVal) => {
            this.currentErrorMessage = newVal;
        });
    }

    closeModal() {
        this.$uibModalInstance.close();
    }
};

export default ErrorController;
