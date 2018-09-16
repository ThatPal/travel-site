import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
    constructor() {
        this.lazyImages = $('.lazyload');
        this.siteHeader = $('.site-header');
        this.headerTriggerElement = $('.large-hero__title');
        this.createHeaderWaypoint();
        this.pageSections = $('.page-section');
        this.headerLinks = $('.primary-nav a');
        this.createPageSectionWaypoint();
        this.addSmoothScrolling();
        this.refreshWaypoints();
    }

    refreshWaypoints() {
        this.lazyImages.on('load', function() {
            Waypoint.refreshAll();
        });
    }

    addSmoothScrolling() {
        this.headerLinks.smoothScroll();
    }

    createHeaderWaypoint() {
        var classThis = this;
        new Waypoint({
            element: this.headerTriggerElement[0],
            handler: function(direction) {
                if(direction == 'down') {
                    classThis.siteHeader.addClass('site-header--dark');
                } else {
                    classThis.siteHeader.removeClass('site-header--dark');
                }
            }
        });
    }

    createPageSectionWaypoint() {
        var classThis = this;
        this.pageSections.each(function() {
            var currentItem = this;
            new Waypoint({
                element: currentItem,
                handler: function(direction) {
                    if(direction == 'down') {
                        var matchingHeaderLink = currentItem.getAttribute('data-matching-link');
                        classThis.headerLinks.removeClass('is-current-link');
                        $(matchingHeaderLink).addClass('is-current-link');
                    }
                },
                offset: '18%'
            });

            new Waypoint({
                element: currentItem,
                handler: function(direction) {
                    if(direction == 'up') {
                        var matchingHeaderLink = currentItem.getAttribute('data-matching-link');
                        classThis.headerLinks.removeClass('is-current-link');
                        $(matchingHeaderLink).addClass('is-current-link');
                    }
                },
                offset: '-40%'
            });
        });
    }
}

export default StickyHeader;