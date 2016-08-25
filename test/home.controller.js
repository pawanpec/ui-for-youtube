/**
 * Test cases for Home Controller
 */
describe('Unit : youtubeAdapter home.controller.js', function () {
    var Home, scope, $rootScope, $controller, utils, $modal={}, q, $modalInstance;
    beforeEach(module('youtubeAdapter'));
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('ui.router'));
    beforeEach(inject(function (_$q_, _$rootScope_, _$controller_, _Utils_,_$httpBackend_) {
        $rootScope = _$rootScope_;
        utils = _Utils_;
        q = _$q_;
        scope = $rootScope.$new();
        $controller = _$controller_;
        $modal = jasmine.createSpyObj('$modal', ['open']);
        $modalInstance = jasmine.createSpyObj('$modalInstance', ['close', 'dismiss']);
        _$httpBackend_.when('GET', 'templates/home.html').respond(200);
        /**
         * Define Home Controller
         */
        Home = $controller('HomeCtrl', {
            '$scope': scope,
            'Utils': utils,
            '$modal': $modal
        });
    }));
    describe('Units: HomeCtrl', function () {
        describe('Units: units should be Defined', function () {
            it('it should pass if Home is defined', function () {
                expect(Home).toBeDefined();
            });
        });
        /**
         * Test cases for Controller functions
         */
        describe('Function : Home.validateUrls ', function () {
            /**
             * Negative case
             */
            it('Home.validateUrls should be called and there should be invalidUrls', function () {
                Home.url = 'url1,url2';
                Home.validateUrls();
                expect(Home.urls.length).toEqual(2);
                expect(Home.invalidUrls.length).toEqual(2);
            });
            /**
             * Positive case
             */
            it('Home.validateUrls should be called and there should not be invalidUrls', function () {
                Home.url = 'https://www.youtube.com/watch?v=50gBH8MqJpw,https://www.youtube.com/watch?v=1sGGJ3YpPmE';
                Home.validateUrls();
                expect(Home.urls.length).toEqual(2);
                expect(Home.invalidUrls.length).toEqual(0);
            });
        });
        describe('Function : Home.editUrls ', function () {
            it('Home.editUrls should be called with dismiss', function () {
                $modal.open.and.callFake(function () {
                    var defer = q.defer();
                    defer.reject();
                    return {result: defer.promise};
                });
                Home.urls = [{url: 'url1', isValid: false}];
                Home.editUrls();
                $rootScope.$digest();
                expect(Home.urls && Home.urls.length).toEqual(1);
            });
            it('Home.editUrls should be called with close', function () {
                Home.isNextDisabled=true;
                Home.urls = [{url: 'google.com', isValid: true},{url:'https://www.youtube.com/watch?v=50gBH8MqJpw',isValid:true}];
                $modal.open.and.callFake(function (config) {
                    var defer = q.defer();
                    defer.resolve(config.resolve.urls());
                    return {result: defer.promise};
                });
                Home.editUrls();
                $rootScope.$digest();
                expect(Home.isNextDisabled).toEqual(false);
            });
        });
        describe('Function : Home.removeAllInvalidUrls ', function () {
            it('Home.removeAllInvalidUrls should be called and ', function () {
                Home.urls = [{url: 'url1', isValid: false}];
                Home.removeAllInvalidUrls();
                $rootScope.$digest();
                expect(Home.invalidUrls.length).toEqual(0);
            });
        });
    });
});