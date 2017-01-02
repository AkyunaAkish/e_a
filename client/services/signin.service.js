class signinService {
    /**@ngInject*/
    constructor($http, HOST, $q) {
        this.$http = $http;
        this.$q = $q;
        this.HOST = HOST;
    }

    signin(email, password) {
        const deferred = this.$q.defer();
        this.$http.post(`${this.HOST}/users/signin`, {
                email: email,
                password: password
            })
            .then((res) => {
                if (res.data.success) {
                    deferred.resolve(res.data.success);
                } else {
                    deferred.reject(res.data);
                }
            })
            .catch((err) => {
                deferred.reject(err);
            });
        return deferred.promise;
    }
};

export default signinService;
