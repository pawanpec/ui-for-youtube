/**
 * Test cases for app.js
 */
describe('Unit: youtubeAdapter : app.js', function () {

    // Include Modules
    beforeEach(module('youtubeAdapter'));
    beforeEach(module('ui.router'));

    // Suite for testing an individual piece of our feature.
    describe('Home route', function () {

        // Instantiate global variables (global to all tests in this describe block).
        var $state,
            $rootScope,
            state = 'home';

        // Inject dependencies
        beforeEach(inject(function (_$state_, $templateCache, _$rootScope_) {
            $state = _$state_;
            $rootScope = _$rootScope_;
            $templateCache.put('templates/home.html');
        }));
        it('verifies home state configuration', function () {
            var config = $state.get(state);
            expect(config.url).toEqual('/home');
            expect(config.name).toEqual('home');
            expect(config.controller).toEqual('HomeCtrl as Home');
        });
    });
});