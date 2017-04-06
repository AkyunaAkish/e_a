class authService {
    /**@ngInject*/
    constructor($q, $http, HOST, $localStorage) {
        this.$q = $q;
        this.$http = $http;
        this.$localStorage = $localStorage;
        this.HOST = HOST;
        this.session = null;
    }

    setSession(data) {
        let deferred = this.$q.defer();
        if (data.user && data.token) {
            this.$localStorage.session = {
                user: data.user,
                token: data.token
            };
            this.session = true;
            deferred.resolve(true);
        } else {
            this.session = null;
            deferred.reject(false);
        }

        return deferred.promise;
    }

    getSession() {
        return this.session;
    }

    hasSession() {
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
            this.$http.post(`${this.HOST}/users/validate-session`, {
                    session: {
                        user: this.$localStorage.session.user,
                        token: this.$localStorage.session.token
                    }
                })
                .then((res) => {
                    if (res.data.success) {
                        this.setSession({
                                user: res.data.success.userSuccess,
                                token: res.data.success.tokenSuccess
                            })
                            .then((setSessionRes) => {
                                deferred.resolve(true);
                            })
                            .catch((err) => {
                                this.clearSession();
                                deferred.resolve(false);
                            });
                    } else {
                        this.clearSession();
                        deferred.resolve(false);
                    }
                })
                .catch((err) => {
                    this.clearSession();
                    deferred.resolve(false);
                });
        } else {
            this.clearSession();
            deferred.resolve(false);
        }
        return deferred.promise;
    }

    clearSession() {
        delete this.$localStorage.session;
        this.session = null;
    }

    validateAdmin(user, token) {
        const deferred = this.$q.defer();
        if (user && token) {
            this.$http.post(`${this.HOST}/users/validate-admin`, {
                    user: user,
                    token: token
                })
                .then((res) => {
                    if (res.data.success) {
                        deferred.resolve(true);
                    } else {
                        deferred.resolve(false);
                    }
                })
                .catch((err) => {
                    deferred.resolve(false);
                });
        } else {
            deferred.resolve(false);
        }
        return deferred.promise;
    }

    refreshToken() {
        const deferred = this.$q.defer();
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
            this.$http.post(`${this.HOST}/users/refresh-token`, {
                    user: this.$localStorage.session.user,
                    token: this.$localStorage.session.token
                })
                .then((res) => {
                    if (res.data.success) {
                        this.setSession({
                                user: res.data.success.user,
                                token: res.data.success.token
                            })
                            .then((setSessionRes) => {
                                deferred.resolve(true);
                            })
                            .catch((err) => {
                                this.clearSession();
                                deferred.resolve(false);
                            });
                    } else {
                        this.clearSession();
                        deferred.resolve(false);
                    }
                })
                .catch((err) => {
                    this.clearSession();
                    deferred.resolve(false);
                });
        }
        return deferred.promise;
    }

    retrieveUserData(email) {
        return this.$http.get(`${this.HOST}/users/retrieve-user-data/${email}`)
            .then((userRes) => {
                if (userRes.data && userRes.data.success) {
                    return userRes.data.success || 'error';
                } else {
                    return userRes.data.error || 'error';
                }
            })
            .catch((err) => {
                return err.data || err;
            });
    }

};

export default authService;