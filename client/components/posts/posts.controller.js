class PostsController {
    /**@ngInject*/
    constructor($http, HOST) {
        this.$http = $http;
        this.HOST = HOST;

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
};

export default PostsController;
