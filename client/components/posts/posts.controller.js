class PostsController {
    /**@ngInject*/
    constructor($http, HOST, $scope, $state, $rootScope, socket, errorService, likeService) {
        this.$http = $http;
        this.$scope = $scope;
        this.HOST = HOST;
        this.$state = $state;
        this.socket = socket;
        this.errorService = errorService;
        this.likeService = likeService;
        this.retrievePosts();

        this.socket.on('update-posts', () => {
            this.retrievePosts();
            this.$scope.$evalAsync();
        });
    }

    retrievePosts() {
        this.$http.get(`${this.HOST}/posts/retrieve-posts`)
            .then((posts) => {
                if (posts.data.success) {
                    this.posts = posts.data.success;
                } else {
                    console.log('Posts could not be retrieved', posts);
                }
            })
            .catch((err) => {
                console.log('Posts could not be retrieved', err);
            });
    }

    like(post, event) {
        event.preventDefault();
        event.stopPropagation();

        this.likeService.like(post)
            .then((likeRes) => {
                this.socket.emit('post-event');
            })
            .catch((err) => {
                this.socket.emit('post-event');
            });
    }
};

export default PostsController;
