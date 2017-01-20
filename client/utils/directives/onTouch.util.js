export default ($timeout) => {
    return {
        restrict: 'A',
        scope: {
            onTouchEvent: '&'
        },
        link: (scope, element) => {
            scope.isMoved = false;
            $timeout(() => {
                element.bind('touchstart', () => {
                    scope.isMoved = false;

                });

                element.bind('touchend click', (evt) => {
                    if (!scope.isMoved) {
                        scope.onTouchEvent();
                        scope.$evalAsync();
                    }
                });

                element.bind('touchmove', () => {
                    scope.isMoved = true;
                });
            });
        }
    };
}
