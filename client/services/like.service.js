class likeService {
    /**@ngInject*/
    constructor($q, $http, $localStorage, HOST, errorService) {
        this.$q = $q;
        this.$http = $http;
        this.$localStorage = $localStorage;
        this.HOST = HOST;
        this.errorService = errorService;
    }

    like(post) {
        let deferred = this.$q.defer();

        if (this.$localStorage.session &&
            typeof this.$localStorage.session === 'object' &&
            this.$localStorage.session.token &&
            typeof this.$localStorage.session.token === 'string' &&
            this.$localStorage.session.user &&
            typeof this.$localStorage.session.user === 'object' &&
            this.$localStorage.session.user.email &&
            typeof this.$localStorage.session.user.email === 'string' &&
            this.$localStorage.session.user.username &&
            typeof this.$localStorage.session.user.username === 'string') {
            this.$http.post(`${this.HOST}/posts/like`, {
                    session: {
                        user: this.$localStorage.session.user,
                        token: this.$localStorage.session.token
                    },
                    post: post
                })
                .then((res) => {
                    deferred.resolve(res);
                })
                .catch((err) => {
                    deferred.reject(err);
                });
        } else {
            this.errorService.setAuthError('Must sign in to like or unlike a post.');
            this.errorService.openErrorModal();
            deferred.reject();
        }

        return deferred.promise;
    }
};

export default likeService;
