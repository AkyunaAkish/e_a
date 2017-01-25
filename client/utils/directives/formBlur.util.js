export default ['$timeout', ($timeout) => {
    return {
        restrict: 'A',
        link: (scope, element) => {
            let defocusElement = angular.element('<input style="opacity: 0; width: 0" type="button">');
            element.append(defocusElement);

            element.on('keydown', (event) => {
                console.log('on keydown fired', event.keyCode);
                if (event.keyCode === 13) {
                    event.preventDefault();
                    $timeout(() => {
                        defocusElement.focus();
                        element.triggerHandler('submit');
                    }, 0, false);
                    console.log('keyCode13!!');
                }
            });
        }
    };
}];
