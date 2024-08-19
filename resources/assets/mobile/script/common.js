"use strict";

$(function () {
  var handleHeaderColor = {
    colorChange: function colorChange() {
      if ($('#searchBtn').hasClass('active')) {
        $('.header').addClass('active');
      } else {
        $('.header').removeClass('active');
      }
    },
    init: function init() {
      $(window).on('load', function () {
        $('#searchBtn').on('click', handleHeaderColor.colorChange);
      });
    }
  };
  var search = {
    closeSearch: function closeSearch(e) {
      var $target = $(e.target);
      if (!$target.closest('.util__search').length && !$target.closest('#headerSearch').length) {
        $('#header').removeClass('active');
        $('#searchBtn').removeClass('active');
        TweenMax.to('.header_wrap', 0.2, {
          height: 50,
          ease: 'Expo.ease'
        });
        TweenMax.to('.dimmed', 0.4, {
          opacity: 0,
          display: 'none',
          ease: 'Expo.ease'
        });
      }
    },
    init: function init() {
      var _this = this;
      $(document).on('click', function (e) {
        return _this.closeSearch(e);
      });
    }
  };
  return [search.init(), handleHeaderColor.init()];
});