/**
 * Utils service which provides method:validateUrl, for validating youtube urls (single, channel and playlist types urls only)
 */
'use strict';

(function (angular) {
    angular.module('youtubeAdapter')
        .factory("Utils", [function () {
            var singleRegex = "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";
            return {
                validateUrl: function (url) {
                    if (url) {
                        return !!url.match(singleRegex);
                    }
                    else {
                        return false;
                    }
                }
            }
        }]);
})(window.angular);