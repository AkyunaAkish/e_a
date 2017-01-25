export default () => {
    return {
        restrict: 'A',
        link: (scope, element) => {
            let textFields = $(element).children('input[type=text]');

            $(element).submit(() => {
                console.log('submitted');
                textFields.blur();
            });
        }
    };
};
