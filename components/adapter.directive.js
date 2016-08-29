(function (angular) {
    angular.module('youtubeAdapter')

        .directive('adapter', [
            function adapterDirective() {

                return {
                    restrict: 'E',
                    scope: {
                        ingestionType: '=',
                        sourceIngestion: '=',
                        adapterData: '=',
                        adapterProperties: '='
                    },
                    templateUrl: '../ui-for-youtube/components/home.html',
                    controller: HomeCtrl,
                    controllerAs: 'Home',
                    link: link
                };
                function link(scope, element, attr) {
                }

                function HomeCtrl(Utils, $scope, $uibModal) {
                    var Home = this;
                    Home.validatedUrls = [];
                    Home.isNextDisabled = true;
                    /**
                     *Home.validateUrls validates the urls
                     */
                    Home.validateUrls = function () {
                        Home.urls = [];
                        var urls = Home.url.split(',');
                        if (urls && urls.length) {
                            urls.forEach(function (url) {
                                url = url.trim();
                                if (url) {
                                    Home.urls.push({'value': url, 'isValid': Utils.validateUrl(url)});
                                }
                            });
                            Home.invalidUrls = Home.urls.filter(function (url) {
                                return !url.isValid;
                            });
                            if (Home.invalidUrls && !Home.invalidUrls.length && Home.urls && Home.urls.length) {
                                Home.isNextDisabled = false;
                                Home.urls.forEach(function (url) {
                                    if (url && url.value && url.isValid)
                                        Home.validatedUrls.push(url.value);
                                });
                            }
                        }
                    };
                    /**
                     * Home.changeUrl method will be called if user makes any changes in particular url
                     * @param url
                     * @param index
                     */
                    Home.changeUrl = function (url, index) {
                        if (url && url.value) {
                            url.isValid = Utils.validateUrl(url.value);
                        }
                        else {
                            if (Home.urls && Home.urls.length)
                                Home.urls.splice(index, 1);
                        }
                    };
                    /**
                     * Home.removeAllInvalidUrls will remove all invalid urls and stores all valid urls in Home.validatedUrls
                     */
                    Home.removeAllInvalidUrls = function () {
                        Home.invalidUrls = [];
                        var urls = [];
                        if (Home.urls && Home.urls.length) {
                            Home.urls.forEach(function (url) {
                                if (url && url.value && url.isValid) {
                                    urls.push(url);
                                    Home.validatedUrls.push(url.value);
                                }
                            });
                            Home.urls = angular.copy(urls);
                            Home.isNextDisabled = false;
                        }
                    };
                    /**
                     * Home.postUrls will post the urls using API
                     */
                    Home.postUrls = function () {
                        if (Home.validatedUrls && Home.validatedUrls.length) {
                            $scope.adapterProperties = $scope.adapterProperties || {};

                            $scope.adapterProperties.urls = Home.validatedUrls;

                            console.log('Validated urls-------------------------', $scope.adapterProperties);
                        }
                    };
                    /**
                     * Home.editUrls options the modal
                     */
                    Home.editUrls = function () {
                        var popupModal = $uibModal
                            .open({
                                templateUrl: 'modals/editUrl.popup.html',
                                controller: 'EditPopupCtrl',
                                controllerAs: 'EditPopup',
                                size: 'm',
                                resolve: {
                                    urls: function () {
                                        return Home.urls;
                                    }
                                }
                            });
                        popupModal.result.then(function (urls) {
                            Home.invalidUrls = null;
                            Home.url = '';
                            if (urls && urls.length) {
                                Home.isNextDisabled = false;
                                Home.urls = urls;
                                urls.forEach(function (url) {
                                    if (url && url.value)
                                        Home.validatedUrls.push(url.value);
                                });
                            }
                            else {
                                Home.urls = [];
                            }
                            //TODO: http request
                        }, function (err) {
                            // do something on cancel
                        });
                    };
                }

            }
        ]);
})(angular);	