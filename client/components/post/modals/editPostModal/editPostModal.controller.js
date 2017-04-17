import _ from 'lodash';

class EditPostController {
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
        this.post = _.cloneDeep(this.$rootScope.postToEdit) || {};
    }

    editPost() {
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
            this.editingPost = true;
            this.$http.post(`${this.HOST}/posts/edit-post`, {
                    user: this.$localStorage.session.user,
                    token: this.$localStorage.session.token,
                    post: this.post,
                    password: this.password
                })
                .then((res) => {
                    if (res.data.success) {
                        this.socket.emit('post-edited');
                        this.$state.go('layout.posts');
                        this.editingPost = false;
                    } else {
                        this.editingPost = false;
                        this.errorService.setAuthError(`${res.data.error || 'An error occurred editing your post.'}`);
                        this.errorService.openErrorModal();
                    }
                })
                .catch((err) => {
                    this.editingPost = false;
                    this.errorService.setAuthError(`${res.data.error || 'An error occurred editing your post.'}`);
                    this.errorService.openErrorModal();
                });
        } else {
            this.editingPost = false;
            this.errorService.setAuthError('Error editing post.');
            this.errorService.openErrorModal();
        }
    }

    closeModal() {
        this.$uibModalInstance.dismiss();
    }
};

export default EditPostController;
