class PostsController {
    /**@ngInject*/
    constructor($http, HOST, $scope, $state) {
        this.$http = $http;
        this.$scope = $scope;
        this.HOST = HOST;
        this.$state = $state;

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

    filteredResults() {
        return this.$scope.$eval("post in vm.posts | filter: vm.searchPosts | orderBy:'created_at'");
    }
};

export default PostsController;
