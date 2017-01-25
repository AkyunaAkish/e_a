let hideKeyboard = function() {
    document.activeElement.blur();

    let inputs = document.querySelectorAll('input');

    for (let i = 0; i < inputs.length; i++) {
        inputs[i].blur();
    }
};

export default () => {
    return {
        restrict: 'A',
        link: (scope, element) => {
            let textFields = $(element).children('input[type=text]');

            $(element).submit(() => {
                console.log('submitted');
                textFields.blur();
                hideKeyboard();
            });
        }
    };
};
