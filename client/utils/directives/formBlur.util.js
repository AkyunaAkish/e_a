export default () => {
    return {
        restrict: 'A',
        link: (scope, element) => {
            let textFields = $(element).children('input[type=text]');
            let defocusElement = angular.element('<input style="opacity: 0; width: 0" type="button">');
            element.append(defocusElement);

            // $(element).submit(() => {
            //     console.log('submitted');
            //     textFields.blur();
            //     document.activeElement.blur();
            //     $('input').blur();
            // });

            element.on('submit', () => {
              console.log('submit...');
                defocusElement.focus();
                textFields.blur();
                $('input').blur();
            });

            $('body').on('keyup', (event) => {
                if (event.keyCode === 13) {
                    defocusElement.focus();
                    console.log('keyCode13!!');
                    textFields.blur();
                    $('input').blur();
                }
            });
        }
    };
};
