class DeletePostController {
    /**@ngInject*/
    constructor($uibModalInstance, $http, HOST, $localStorage, $rootScope, $state, socket, errorService) {
        this.$uibModalInstance = $uibModalInstance;
        this.$http = $http;
        this.HOST = HOST;
        this.$localStorage = $localStorage;
        this.$rootScope = $rootScope;
        this.$state = $state;
        this.errorService = errorService;
        this.socket = socket;
        this.password = '';
        this.post = this.$rootScope.postToDelete || {};
    }

    deletePost() {
        if (this.$localStorage.session &&
            typeof this.$localStorage.session === 'object' &&
            this.$localStorage.session.user &&
            typeof this.$localStorage.session.user === 'object' &&
            this.$localStorage.session.user.email &&
            typeof this.$localStorage.session.user.email === 'string' &&
            this.$localStorage.session.user.username &&
            typeof this.$localStorage.session.user.username === 'string' &&
            this.$localStorage.session.token &&
            typeof this.$localStorage.session.token === 'string' &&
            this.password &&
            typeof this.password === 'string' &&
            Object.keys(this.post).length) {
            this.deletetingPost = true;
            this.$http.post(`${this.HOST}/posts/delete-post`, {
                    user: this.$localStorage.session.user,
                    token: this.$localStorage.session.token,
                    post: this.post,
                    password: this.password
                })
                .then((res) => {
                    if (res.data.success) {
                        this.socket.emit('post-deleted');
                        this.$state.go('layout.posts');
                        this.deletetingPost = false;
                    } else {
                        this.deletetingPost = false;
                        this.errorService.setAuthError(`${res.data.error || 'An error occurred.'}`);
                        this.errorService.openErrorModal();
                    }
                })
                .catch((err) => {
                    this.deletetingPost = false;
                    this.errorService.setAuthError(`${res.data.error || 'An error occurred.'}`);
                    this.errorService.openErrorModal();
                });
        } else {
            this.deletetingPost = false;
            this.errorService.setAuthError('Error deleting post.');
            this.errorService.openErrorModal();
        }
    }

    closeModal() {
        this.$uibModalInstance.dismiss();
    }
};

export default DeletePostController;
