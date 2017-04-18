class AppController {
    /**@ngInject*/
    constructor($scope, $rootScope, HOST) {
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        
        if(!this.$rootScope.metadata || Object.keys(this.$rootScope.metadata).length < 1) {
            this.$rootScope.metadata = {
                    title: 'Elena Akish',
                    image: 'https://lh6.googleusercontent.com/UTod8SrFSEcCietr_Zp4NOqWU0UEgLLAj9nO3evMsAvnVR5VIuHsXKhOyK5LDhvtQDu2t13I6g939wg=w1024-h581-rw',
                    url: window.location.href
                };
        }
    }
};

export default AppController;