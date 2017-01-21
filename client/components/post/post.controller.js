class PostController {
    /**@ngInject*/
    constructor($http, HOST, $scope, $state, errorService, authService, $sce, $localStorage) {
        this.$http = $http;
        this.$scope = $scope;
        this.$sce = $sce;
        this.$localStorage = $localStorage;
        this.errorService = errorService;
        this.authService = authService;
        this.HOST = HOST;
        this.$state = $state;
        this.commenting = false;
        this.session = this.authService.getSession();

        this.$http.get(`${this.HOST}/posts/retrieve-post/${this.$state.params.id}`)
            .then((post) => {
                if (post.data.success) {
                    this.post = post.data.success;
                    this.$http.get(`${this.HOST}/posts/retrieve-comments/${this.$state.params.id}`)
                        .then((comments) => {
                            if (comments.data.success) {
                                this.comments = comments.data.success;
                            } else {
                                this.$state.go('layout.posts');
                            }
                        })
                        .catch((err) => {
                            this.$state.go('layout.posts');
                        });
                } else {
                    this.$state.go('layout.posts');
                }
            })
            .catch((err) => {
                this.$state.go('layout.posts');
            });
    }

    comment() {
        if (this.commentObj.comment &&
            this.commentObj.comment.length > 0 &&
            this.$localStorage.session &&
            this.post) {
            this.commenting = true;
            this.$http.post(`${this.HOST}/posts/submit-comment`, {
                    session: this.$localStorage.session,
                    post: this.post,
                    comment: this.commentObj.comment
                })
                .then((comment) => {
                    if (comment.data.success) {
                        this.$http.get(`${this.HOST}/posts/retrieve-comments/${this.$state.params.id}`)
                            .then((comments) => {
                                if (comments.data.success) {
                                    this.comments = comments.data.success;
                                    this.commenting = false;
                                    this.commentObj = {};
                                } else {
                                    this.$state.go('layout.posts');
                                    this.commenting = false;
                                }
                            })
                            .catch((err) => {
                                this.$state.go('layout.posts');
                                this.commenting = false;
                            });
                    } else {
                        this.errorService.setAuthError(`An error occurred and the comment could not be added, please confirm that you are signed in and try again.`);
                        this.errorService.openErrorModal();
                        this.commenting = false;
                    }
                })
                .catch((err) => {
                    this.errorService.setAuthError(`An error occurred and the comment could not be added, please confirm that you are signed in and try again.`);
                    this.errorService.openErrorModal();
                    this.commenting = false;
                });
        }
    }

    trustHTML(src) {
        return this.$sce.trustAsHtml(src);
    }
};

export default PostController;
