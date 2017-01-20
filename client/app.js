import angular from 'angular';
import 'angular-ui-router';
import 'angular-bootstrap-npm';
import 'angular-messages';
import 'angular-moment';
import 'ngstorage';

import layoutDirective from './components/layout/layout.directive.js';
import navbarDirective from './components/navbar/navbar.directive.js';
import postsDirective from './components/posts/posts.directive.js';
import postDirective from './components/post/post.directive.js';
import signupDirective from './components/signup/signup.directive.js';
import signinDirective from './components/signin/signin.directive.js';
import createPostDirective from './components/createPost/createPost.directive.js';
import compileDirective from './utils/directives/compile.util.js';
import blurDirective from './utils/directives/blur.util.js';
import onTouchDirective from './utils/directives/onTouch.util.js';
import dirPagination from './utils/paginate/paginate.js';

import authService from './services/auth.service.js';
import signupService from './services/signup.service.js';
import signinService from './services/signin.service.js';
import errorService from './services/error.service.js';

import Router from './routes.js';
import stateChange from './utils/stateChange.util.js';
import './sass/style.scss';

const HOST = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : window.location.origin;

angular.module('ElenaAkish', [
        'ui.router',
        'ui.bootstrap',
        'ngMessages',
        'ngStorage',
        'angularMoment',
        dirPagination.name
    ])
    .constant('HOST', HOST)
    .config(['$qProvider', ($qProvider) => {
        $qProvider.errorOnUnhandledRejections(false);
    }])
    .service('errorService', errorService)
    .service('authService', authService)
    .service('signupService', signupService)
    .service('signinService', signinService)
    .directive('compile', compileDirective)
    .directive('blur', blurDirective)
    .directive('onTouchEvent', onTouchDirective)
    .directive('layoutDirective', layoutDirective)
    .directive('navbarDirective', navbarDirective)
    .directive('postsDirective', postsDirective)
    .directive('postDirective', postDirective)
    .directive('signupDirective', signupDirective)
    .directive('signinDirective', signinDirective)
    .directive('createPostDirective', createPostDirective)
    .config(Router)
    .run(stateChange);
