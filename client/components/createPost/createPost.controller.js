class CreatePostController {
    /**@ngInject*/
    constructor($sce, $scope, $localStorage, authService) {
        this.$sce = $sce;
        this.$scope = $scope;
        this.$localStorage = $localStorage;
        this.authService = authService;
        this.post = [];
        this.changePosition = {};
        this.ind = {};

        if (this.$localStorage.post) {
            this.post = this.$localStorage.post;
        }

        this.$scope.$watch(() => {
            return this.post;
        }, (newVal) => {
            this.$localStorage.post = newVal;
            this.authService.refreshToken();
            console.log('changed post and refreshed token...', this.$localStorage.session);
        }, true);
    }

    range(start, end) {
        let result = [];
        for (let i = start; i <= end; i++) {
            result.push(i);
        }
        return result;
    }

    trustHTML(src) {
        return this.$sce.trustAsHtml(src);
    }

    deleteComponent(index) {
        this.post.splice(index, 1);
    }

    updatePosition(from, to) {
        if (to > this.post.length - 1) {
            alert('Cannot move to that position.');
        } else {
            this.post.splice(to, 0, this.post.splice(from, 1)[0]);
        }
    }

    addPostComponent(type) {
        switch (type) {
            case 'header':
                this.post.push({
                    type: type,
                    value: '',
                    template: `<div class='panel panel-default post-component-panel'>
                                  <div class='panel-heading text-center'>
                                      <h1>Header <i class='fa fa-close' ng-click='vm.deleteComponent($index)'></i></h1>
                                      <div>
                                        <label>Update Position</label>
                                          <select ng-model='vm.ind[$index]' ng-init='vm.ind[$index] = $index' ng-options='ind for ind in vm.range(0, vm.post.length-1)' ng-change='vm.updatePosition($index, vm.ind[$index]);vm.ind[$index] = $index'></select>
                                      </div>
                                  </div>
                                  <div class='panel-body'>
                                      <input type='text' ng-model='vm.post[$index]["value"]'></input>
                                  </div>
                              </div>`
                });
                break;
            case 'text':
                this.post.push({
                    type: type,
                    value: '',
                    template: `<div class='panel panel-default post-component-panel'>
                                  <div class='panel-heading text-center'>
                                      <h1>Text <i class='fa fa-close' ng-click='vm.deleteComponent($index)'></i></h1>
                                        <div>
                                          <label>Update Position</label>
                                            <select ng-model='vm.ind[$index]' ng-init='vm.ind[$index] = $index' ng-options='ind for ind in vm.range(0, vm.post.length-1)' ng-change='vm.updatePosition($index, vm.ind[$index]);vm.ind[$index] = $index'></select>
                                        </div>
                                  </div>
                                  <div class='panel-body'>
                                    <textarea ng-model='vm.post[$index]["value"]'></textarea>
                                  </div>
                              </div>`
                });
                break;
            case 'link':
                this.post.push({
                    type: type,
                    value: '',
                    template: `<div class='panel panel-default post-component-panel'>
                                  <div class='panel-heading text-center'>
                                      <h1>Link <i class='fa fa-close' ng-click='vm.deleteComponent($index)'></i></h1>
                                        <div>
                                          <label>Update Position</label>
                                            <select ng-model='vm.ind[$index]' ng-init='vm.ind[$index] = $index' ng-options='ind for ind in vm.range(0, vm.post.length-1)' ng-change='vm.updatePosition($index, vm.ind[$index]);vm.ind[$index] = $index'></select>
                                  </div>
                                  </div>
                                  <div class='panel-body'>
                                    <input type='text' ng-model='vm.post[$index]["value"]'></input>
                                  </div>
                              </div>`
                });
                break;
            case 'image':
                this.post.push({
                    type: type,
                    value: '',
                    template: `<div class='panel panel-default post-component-panel'>
                                  <div class='panel-heading text-center'>
                                      <h1>Image <i class='fa fa-close' ng-click='vm.deleteComponent($index)'></i></h1>
                                        <div>
                                          <label>Update Position</label>
                                            <select ng-model='vm.ind[$index]' ng-init='vm.ind[$index] = $index' ng-options='ind for ind in vm.range(0, vm.post.length-1)' ng-change='vm.updatePosition($index, vm.ind[$index]);vm.ind[$index] = $index'></select>
                                        </div>
                                  </div>
                                  <div class='panel-body'>
                                    <input type='text' ng-model='vm.post[$index]["value"]'></input>
                                  </div>
                              </div>`
                });
                break;
        }
    }

};

export default CreatePostController;
