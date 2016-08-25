(function (angular) {
    angular
        .module('youtubeAdapter')
        .controller('EditPopupCtrl', ['urls', 'Utils', '$modalInstance', function (urls, Utils, $modalInstance) {
            var EditPopup = this;
            /**
             * initialize the EditPopup.urls with urls
             */
            if (urls && urls.length) {
                EditPopup.urls = urls;
            }
            /**
             * EditPopup.validate validate the url
             * @param url
             */
            EditPopup.validate = function (url) {
                if (url && url.value) {
                    url.isValid = Utils.validateUrl(url.value);
                }
            };
            /**
             * EditPopup.delete deletes a particular url on the basis of index
             * @param index
             */
            EditPopup.delete = function (index) {
                if (EditPopup.urls && EditPopup.urls.length)
                    EditPopup.urls.splice(index, 1);
            };
            /**
             * EditPopup.ok close the modal with array of validated urls
             */
            EditPopup.ok = function () {
                var filteredUrls = [];
                if (EditPopup.urls && EditPopup.urls.length) {
                    EditPopup.urls.forEach(function (url) {
                        if (url && url.isValid && url.value)
                            filteredUrls.push(url);
                    });
                    $modalInstance.close(filteredUrls);
                }
                else {
                    $modalInstance.close([]);
                }
            };

            /**
             * EditPopup.cancel dismissed the modal with an error message
             */
            EditPopup.cancel = function () {
                $modalInstance.dismiss({error: 'Cancelled'});
            };
            /**
             * EditPopup.removeAllAffectedUrls will remove all affected urls
             */
            EditPopup.removeAllAffectedUrls = function () {
                if (EditPopup.urls && EditPopup.urls.length) {
                    var allUrls = angular.copy(EditPopup.urls);
                    EditPopup.urls = [];
                    allUrls.forEach(function (url) {
                        if (url && url.value && url.isValid)
                            EditPopup.urls.push(url);
                    });
                }
            };
        }])
})(window.angular);
