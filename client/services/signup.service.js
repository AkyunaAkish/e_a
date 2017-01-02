class signupService {
    /**@ngInject*/
    constructor($http, $q, HOST) {
        this.$http = $http;
        this.$q = $q;
        this.HOST = HOST;
    }

    signup(signupObj) {
        const deferred = this.$q.defer();
        this.$http.post(`${this.HOST}/users/signup`, signupObj)
            .then((res) => {
                if (res.data.success) {
                    deferred.resolve(res.data.success);
                } else {
                    deferred.reject(res);
                }
            })
            .catch((err) => {
                deferred.reject(err);
            });
        return deferred.promise;
    }
};

export default signupService;
