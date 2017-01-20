import SubmitPostController from '../submitPostModal/submitPostModal.controller.js';

class CreatePostController {
    /**@ngInject*/
    constructor($sce, $scope, $localStorage, authService, $uibModal, $http, HOST, $rootScope) {
        this.$sce = $sce;
        this.$http = $http;
        this.HOST = HOST;
        this.$scope = $scope;
        this.$rootScope = $rootScope;
        this.$uibModal = $uibModal;
        this.$localStorage = $localStorage;
        this.$http = $http;
        this.HOST = HOST;
        this.authService = authService;
        this.post = {
            title: '',
            components: []
        };
        this.changePosition = {};
        this.ind = {};
        this.previewing = false;
        this.showTips = false;
        this.preview = `<div class='panel panel-default post-preview-panel'>
                      <div class='panel-heading text-center'>
                          <h1>Preview</h1>
                      </div>
                      <div class='panel-body'>
                          <h4>Nothing to preview yet.</h4>
                      </div>
                  </div>`;
        this.exampleLink = `<a href='https://example.com' target='_blank'>Link Text</a>`;
        this.exampleLinkWithColorChange = `<a href='https://example.com' target='_blank' style='color: green'>Link Text</a>`;
        this.googleDriveImageTip = `When creating a post click the "Google Drive Image" button.
                                    Then go to Google Drive and right click the image of your choice.
                                    Copy the link and paste it where you want the image to show up in your post.
                                    Delete everything except for the number between /d/ and /view: https://drive.google.com/file/d/ AFTER HERE--> 0Bzgv9aJs6ZigX1Q1ekQ3ZHA4MTA <-- BEFORE HERE/view?usp=sharing`;
        this.youtubeVideoTip = `When creating a post click the "Video" button.
                                  Go to the Youtube video of your choice.
                                  Click the share button below the video.
                                  Click the embed button.
                                  Copy and paste the url in the iframe and paste it where you want the video to show up in your post:
                                  <iframe width="560" height="315" src="AFTER HERE --> https://www.youtube.com/embed/f66Rk8ZKS_4 <-- BEFORE HERE" frameborder="0" allowfullscreen></iframe>`

        if (this.$localStorage.post) {
            this.post = this.$localStorage.post;
        }

        this.$scope.$watch(() => {
            return this.post;
        }, (newVal) => {
            this.$localStorage.post = newVal;
            this.authService.refreshToken();
            this.updatePreview(newVal);
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
        this.post.components.splice(index, 1);
    }

    updatePosition(from, to) {
        if (to > this.post.components.length - 1) {
            alert('Cannot move to that position.');
        } else {
            this.post.components.splice(to, 0, this.post.components.splice(from, 1)[0]);
        }
    }

    addPostComponent(type) {
        switch (type) {
            case 'header':
                this.post.components.push({
                    type: type,
                    value: '',
                    template: `<div class='panel panel-default post-component-panel'>
                                  <div class='panel-heading text-center'>
                                      <h1>Header <i class='fa fa-close' ng-click='vm.deleteComponent($index)'></i></h1>
                                      <div>
                                        <label>Update Position</label>
                                          <select ng-model='vm.ind[$index]' ng-init='vm.ind[$index] = $index' ng-options='ind for ind in vm.range(0, vm.post.components.length-1)' ng-change='vm.updatePosition($index, vm.ind[$index]);vm.ind[$index] = $index'></select>
                                      </div>
                                  </div>
                                  <div class='panel-body'>
                                      <input type='text' ng-model='vm.post.components[$index]["value"]'></input>
                                  </div>
                              </div>`
                });
                break;
            case 'text':
                this.post.components.push({
                    type: type,
                    value: '',
                    template: `<div class='panel panel-default post-component-panel'>
                                  <div class='panel-heading text-center'>
                                      <h1>Text <i class='fa fa-close' ng-click='vm.deleteComponent($index)'></i></h1>
                                        <div>
                                          <label>Update Position</label>
                                            <select ng-model='vm.ind[$index]' ng-init='vm.ind[$index] = $index' ng-options='ind for ind in vm.range(0, vm.post.components.length-1)' ng-change='vm.updatePosition($index, vm.ind[$index]);vm.ind[$index] = $index'></select>
                                        </div>
                                  </div>
                                  <div class='panel-body'>
                                    <textarea ng-model='vm.post.components[$index]["value"]'></textarea>
                                  </div>
                              </div>`
                });
                break;
            case 'link':
                this.post.components.push({
                    type: type,
                    value: '',
                    template: `<div class='panel panel-default post-component-panel'>
                                  <div class='panel-heading text-center'>
                                      <h1>Link <i class='fa fa-close' ng-click='vm.deleteComponent($index)'></i></h1>
                                        <div>
                                          <label>Update Position</label>
                                            <select ng-model='vm.ind[$index]' ng-init='vm.ind[$index] = $index' ng-options='ind for ind in vm.range(0, vm.post.components.length-1)' ng-change='vm.updatePosition($index, vm.ind[$index]);vm.ind[$index] = $index'></select>
                                  </div>
                                  </div>
                                  <div class='panel-body'>
                                    <input type='text' ng-model='vm.post.components[$index]["value"]'></input>
                                  </div>
                              </div>`
                });
                break;
            case 'image':
                this.post.components.push({
                    type: type,
                    value: '',
                    template: `<div class='panel panel-default post-component-panel'>
                                  <div class='panel-heading text-center'>
                                      <h1>Image <i class='fa fa-close' ng-click='vm.deleteComponent($index)'></i></h1>
                                        <div>
                                          <label>Update Position</label>
                                            <select ng-model='vm.ind[$index]' ng-init='vm.ind[$index] = $index' ng-options='ind for ind in vm.range(0, vm.post.components.length-1)' ng-change='vm.updatePosition($index, vm.ind[$index]);vm.ind[$index] = $index'></select>
                                        </div>
                                  </div>
                                  <div class='panel-body'>
                                    <input type='text' ng-model='vm.post.components[$index]["value"]'></input>
                                  </div>
                              </div>`
                });
                break;
            case 'googleDriveImage':
                this.post.components.push({
                    type: type,
                    value: '',
                    template: `<div class='panel panel-default post-component-panel'>
                                  <div class='panel-heading text-center'>
                                      <h1>Google Drive Image <i class='fa fa-close' ng-click='vm.deleteComponent($index)'></i></h1>
                                        <div>
                                          <label>Update Position</label>
                                            <select ng-model='vm.ind[$index]' ng-init='vm.ind[$index] = $index' ng-options='ind for ind in vm.range(0, vm.post.components.length-1)' ng-change='vm.updatePosition($index, vm.ind[$index]);vm.ind[$index] = $index'></select>
                                        </div>
                                  </div>
                                  <div class='panel-body'>
                                    <input type='text' ng-model='vm.post.components[$index]["value"]' placeholder='Google Drive Image ID'></input>
                                  </div>
                              </div>`
                });
                break;
            case 'iframe':
                this.post.components.push({
                    type: type,
                    value: '',
                    template: `<div class='panel panel-default post-component-panel'>
                                  <div class='panel-heading text-center'>
                                      <h1>Video <i class='fa fa-close' ng-click='vm.deleteComponent($index)'></i></h1>
                                        <div>
                                          <label>Update Position</label>
                                            <select ng-model='vm.ind[$index]' ng-init='vm.ind[$index] = $index' ng-options='ind for ind in vm.range(0, vm.post.components.length-1)' ng-change='vm.updatePosition($index, vm.ind[$index]);vm.ind[$index] = $index'></select>
                                        </div>
                                  </div>
                                  <div class='panel-body'>
                                    <input type='text' ng-model='vm.post.components[$index]["value"]' placeholder='Click share for a youtube video and get the embed URL'></input>
                                  </div>
                              </div>`
                });
                break;
        }
    }

    openSubmitPostModal() {
        console.log('open submit post modal called');
        this.$uibModal.open({
            scope: this.$scope,
            show: true,
            template: require('../submitPostModal/submitPostModal.html'),
            controller: SubmitPostController,
            controllerAs: 'vm',
            size: 'lg',
            backdrop: 'static',
            keyboard: false
        });
    }

    updatePreview(post) {
        let previewBody = post.components.reduce((accumulated, component) => {
            if (component.value) {
                switch (component.type) {
                    case 'header':
                        accumulated.push(`<h1 class='block text-center'>${component.value}</h1>`);
                        break;
                    case 'text':
                        accumulated.push(`<p class='block text-center'>${component.value}</p>`);
                        break;
                    case 'link':
                        accumulated.push(`<a href='${component.value}' class='block text-center' target='_blank'>${component.value}</a>`);
                        break;
                    case 'image':
                        accumulated.push(`<img src='${component.value}' class='block text-center' />`);
                        break;
                    case 'googleDriveImage':
                        accumulated.push(`<img src='https://docs.google.com/uc?id=${component.value}' class='block text-center' />`);
                        break;
                    case 'iframe':
                        accumulated.push(`<iframe src='${component.value}' frameborder='0' class='block text-center' allowfullscreen></iframe>`);
                        break;
                }
            }
            return accumulated;
        }, []).join('');

        this.preview = `<div class='panel panel-default post-panel'>
                      <div class='panel-heading text-center'>
                          <h1>${this.post.title}</h1>
                      </div>
                      <div class='panel-body'>
                          ${previewBody}
                      </div>
                  </div>`;
        this.$localStorage.preview = this.preview;
    }

    decideThumbnail() {
        if (this.post.thumbnailWeb) {
            return this.post.thumbnailWeb;
        } else if (this.post.thumbnailGoogleDrive) {
            return `https://docs.google.com/uc?id=${this.post.thumbnailGoogleDrive}`;
        } else {
            return '/images/ElenaAkishLotus.png';
        }
    }

};

export default CreatePostController;
