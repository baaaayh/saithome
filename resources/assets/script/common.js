"use strict";

$(function () {
  var search = {
    toggleSearch: function toggleSearch(e) {
      if ($(e.target).hasClass('active') && $('.main-section.active').attr('data-color') !== 'white') {
        $('.header').removeClass('white');
      } else {
        $('.header').addClass('white');
      }
    },
    init: function init() {
      var _this = this;
      $('#searchBtn').on('click', function (e) {
        return _this.toggleSearch(e);
      });
    }
  };
  var header = {
    focusMenu: function focusMenu() {
      if (!$('#headerSearch').is(':visible')) {
        $('.header').addClass('active');
        $('.dep2').slideDown(350);
      }
    },
    blurMenu: function blurMenu() {
      $('.header').removeClass('active');
      $('.dep2').slideUp(350);
    },
    openHeader: function openHeader() {
      if (!$('#headerSearch').is(':visible')) {
        $('.header').addClass('active');
        $('.dep2').slideDown(350);
      }
    },
    closeHeader: function closeHeader() {
      $('.header').removeClass('active');
      $('.dep2').stop().slideUp(350);
    },
    toggleItem: function toggleItem() {
      $(this).parents('li').toggleClass('active');
    },
    init: function init() {
      $('#gnb > ul > li > a').on('focus', this.focusMenu);
      $('.header__logo a, #searchBtn').on('focus', this.blurMenu);
      $('.gnb').on('mouseenter', this.openHeader);
      $('.gnb').on('mouseleave', this.closeHeader);
      $('.dep2').hover(this.toggleItem).bind(this);
    }
  };
  search.init();
  header.init();
});