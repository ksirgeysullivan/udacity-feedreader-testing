/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('each feed has a url', function() {
           for (let feed of allFeeds) {
             expect(feed.url).toBeDefined();
             expect(feed.url.length).not.toBe(0);
           }
         });


        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('each feed has a name', function() {
           for (let feed of allFeeds) {
             expect(feed.name).toBeDefined();
             expect(feed.name.length).not.toBe(0);
           }
         });
    });


    /* This is a new test suite named "The menu" */
    describe('The Menu', function(){

        /* This is a test that ensures the menu element is
         * hidden by default.
         */
         it('is hidden by default', function() {
           let hiddenByDefault = document.body.classList.contains('menu-hidden');
           expect(hiddenByDefault).toBe(true);
         });

         /* This is a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations, that the menu displays when
          * clicked and hides when clicked again.
          */
          it('changes visibility', function() {
            let toggleMenuIcon = document.querySelector('.menu-icon-link');
            toggleMenuIcon.click();
            expect(document.body.classList.contains('menu-hidden')).toBe(false);
            toggleMenuIcon.click();
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
          });
    });
    /* This is a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* This is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
         beforeEach(function(done){
           loadFeed(0, function() {
             done();
           });
         });

         it('has more than 0 entries', function(done) {
           let entries = document.querySelectorAll('.feed .entry');
           expect(entries.length).not.toBe(0);
           done();
         });
    });
    /* This is a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {

        /* This is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
         let firstEntries, nextEntries;

         beforeEach(function(done){
           loadFeed(0, function() {
             firstEntries = document.querySelector('.feed').innerHTML;
             done();
             loadFeed(1, function() {
               nextEntries = document.querySelector('.feed').innerHTML;
               done();
             });
           });
         });

         it('new feed is loaded', function() {
           expect(firstEntries).not.toBe(nextEntries);
         });


    });

}());
