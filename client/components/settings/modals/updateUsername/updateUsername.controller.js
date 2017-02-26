class UpdateUsernameController {
    /**@ngInject*/
    constructor($localStorage, $uibModalInstance) {
        this.$localStorage = $localStorage;
        this.$uibModalInstance = $uibModalInstance;
        this.user = this.$localStorage.session.user;
    }

    closeModal() {
        this.$uibModalInstance.close();
    }
};

export default UpdateUsernameController;
