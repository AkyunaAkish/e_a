export default () => {
    return {
        restrict: 'A',
        link: (scope, element) => {
            element.on('click', () => {
                element.blur();
            });
        }
    };
};
