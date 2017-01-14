class LayoutController {
    /**@ngInject*/
    constructor($rootScope) {
        this.$rootScope = $rootScope;
        this.pendingRouteValidation = true;

        this.$rootScope.$on('pendingRouteValidation', (event, data) => {
            this.pendingRouteValidation = data;
        });
    }
};

export default LayoutController;
