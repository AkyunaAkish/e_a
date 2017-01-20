class PostController {
    /**@ngInject*/
    constructor($http, HOST, $scope, $state, errorService, authService, $sce) {
        this.$http = $http;
        this.$scope = $scope;
        this.$sce = $sce;
        this.errorService = errorService;
        this.authService = authService;
        this.HOST = HOST;
        this.$state = $state;

        this.$http.get(`${this.HOST}/posts/retrieve-post/${this.$state.params.id}`)
            .then((post) => {
                if (post.data.success) {
                    this.post = post.data.success;
                } else {
                    console.log('Post could not be retrieved', post);
                    this.$state.go('layout.posts');
                }
            })
            .catch((err) => {
                console.log('Post could not be retrieved', err);
                this.$state.go('layout.posts');
            });
    }

    trustHTML(src) {
        console.log('src', src);
        return this.$sce.trustAsHtml(src);
    }
};

export default PostController;
