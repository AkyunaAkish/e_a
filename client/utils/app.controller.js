class AppController {
    /**@ngInject*/
    constructor($scope, $rootScope) {
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        
        if(!this.$rootScope.metadata || Object.keys(this.$rootScope.metadata).length < 1) {
            this.$rootScope.metadata = {
                    title: 'Elena Akish',
                    image: '/images/ElenaAkishLotus.png',
                    url: window.location.href
                };
        }
    }
};

export default AppController;