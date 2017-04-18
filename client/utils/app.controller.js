class AppController {
    /**@ngInject*/
    constructor($scope, $rootScope, HOST) {
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        
        if(!this.$rootScope.metadata || Object.keys(this.$rootScope.metadata).length < 1) {
            this.$rootScope.metadata = {
                    title: 'Elena Akish',
                    image: 'https://drive.google.com/file/d/0Bw6Wv889sj3vUk9ORXFiZW5mZG8/view',
                    url: window.location.href
                };
        }
    }
};

export default AppController;