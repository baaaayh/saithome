"use strict";

$(function () {
  // SUBLOCATION - Accessibility & Change toggle type
  var subLocation = {
    openSubLocation: function openSubLocation() {
      $(this).find('.under_depth').slideDown();
      $(this).parents('li').addClass('active');
      $(this).siblings('li').find('.under_depth').stop().slideUp();
    },
    closeSubLocation: function closeSubLocation() {
      $(this).find('.under_depth').stop().slideUp();
      $(this).removeClass('active');
    },
    closeSubLocationAll: function closeSubLocationAll() {
      var $locationItem = $('.location_list > li');
      $locationItem.children('button').removeClass('active');
      $locationItem.children('a').removeClass('active');
      $('.under_depth').stop().slideUp();
    },
    focusSubLocation: function focusSubLocation() {
      $(this).siblings('.under_depth').slideDown();
      $(this).addClass('active');
      $(this).parents('li').siblings('li').find('button').removeClass('active');
      $(this).parents('li').siblings('li').find('.under_depth').stop().slideUp();
    },
    blurSubLocation: function blurSubLocation(event) {
      $('.location_list > li').each(function (index, list) {
        var $list = $(list);
        var $lastChildLink = $list.find('.under_depth li:last-child a')[0];
        var isTargetLastChildLink = event.target === $lastChildLink;
        var isRelatedTargetNotInside = !$.contains($('#subLocation')[0], event.relatedTarget);
        if (isTargetLastChildLink && (event.relatedTarget === null || isRelatedTargetNotInside)) {
          $list.find('.under_depth').stop().slideUp();
          $list.find('button').removeClass('active');
        }
      });
    },
    init: function init() {
      $('.location_list > li').on('mouseenter', this.openSubLocation);
      $('.location_list > li').on('mouseleave', this.closeSubLocation);
      $('.location_list button').on('focus', this.focusSubLocation);
      $('.location_list > li.home a').on('focus', this.closeSubLocationAll);
      $(document).on('focusout', function (event) {
        return subLocation.blurSubLocation(event);
      });
    }
  };
  subLocation.init();
});