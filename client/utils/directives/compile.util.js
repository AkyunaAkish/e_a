export default ($compile, $timeout) => {
    return {
        restrict: 'A',
        link: (scope, elem, attrs) => {
            $timeout(() => {
                $compile(elem.contents())(scope);
            });
        }
    };
};
