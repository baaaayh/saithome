"use strict";

$(function () {
  var ww = $(window).innerWidth();
  var main = {
    mainKvInit: function mainKvInit() {
      var mainKV = new Swiper('.main-kv', {
        slidesPerView: 1,
        autoplay: {
          delay: 5000
        },
        loop: true,
        pagination: {
          el: '.main-kv__control',
          clickable: true,
          renderBullet: function renderBullet(index, className) {
            return '<li class="' + className + '"><span type="button" >' + (index < 9 ? '0' : '') + (index + 1) + '</span><div class="main-kv__bg"><span class="main-kv__bar"></span></div></li>';
          }
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        hashNavigation: {
          watchState: true
        },
        resizeObserver: false,
        on: {
          autoplayTimeLeft: function autoplayTimeLeft(s, time, progress) {
            $('.main-kv__bar').css({
              width: (1 - progress) * 100 + '%'
            });
          }
        }
      });
    },
    sliderInit: function sliderInit() {
      var _this = this;
      var bgSlider = new Swiper('.bg-slider', {
        autoplay: false,
        loop: true,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
        hashNavigation: {
          watchState: true
        },
        speed: 1200,
        observer: true,
        observeParents: true
      });
      var textSlider = new Swiper('.text-slider', {
        autoplay: false,
        loop: true,
        effect: 'fade',
        touchRatio: 0,
        fadeEffect: {
          crossFade: true
        }
      });
      var imageSlider = new Swiper('.image-slider', {
        parallax: true,
        speed: 1200,
        // slidesPerView: '1',
        // autoplay: false,
        touchRatio: 0
        // loop: true,
      });
      bgSlider.controller.control = [textSlider, imageSlider];
      $('.research__list li').on('click', function () {
        var idx = $(this).index();
        $(this).addClass('active').siblings('li').removeClass('active');
        bgSlider.slideTo(idx);
        textSlider.slideTo(idx);
        imageSlider.slideTo(idx);
      });
      var pressSlider = new Swiper('.press__slider', {
        slidesPerView: 1,
        autoplay: {
          delay: 7000,
          disableOnInteraction: false
        },
        loop: true,
        hashNavigation: {
          watchState: true
        },
        navigation: {
          nextEl: '.press__button--next',
          prevEl: '.press__button--prev'
        },
        speed: 1200,
        on: {
          init: function init(v) {
            main.handleProgress(v);
          }
        }
      });
      pressSlider.on('slideChange', function (v) {
        return _this.handleProgress(v);
      });
      var paperSlider = new Swiper('.paper__slider', {
        slidesPerView: 1,
        autoplay: {
          delay: 7000,
          disableOnInteraction: false
        },
        loop: true,
        hashNavigation: {
          watchState: true
        },
        navigation: {
          nextEl: '.paper__button--next',
          prevEl: '.paper__button--prev'
        },
        speed: 1200,
        on: {
          init: function init(v) {
            main.handleProgressPeper(v);
          }
        }
      });
      paperSlider.on('slideChange', function (v) {
        return _this.handleProgressPeper(v);
      });
    },
    handleProgress: function handleProgress(event) {
      var total = event.slides.length - 1;
      var curr = event.realIndex;
      $('.press__bar').css({
        width: curr / total * 100 + '%'
      });
    },
    handleProgressPeper: function handleProgressPeper(event) {
      var total = event.slides.length - 1;
      var curr = event.realIndex;
      $('.paper__bar').css({
        width: curr / total * 100 + '%'
      });
    },
    toggleAccordion: function toggleAccordion(e) {
      $(e.target).parents('.research__control').toggleClass('active');
      $(e.target).siblings('.research__list').slideToggle();
    },
    closeAccordion: function closeAccordion(e) {
      function closeAccordionMenu() {
        $('.research__list').slideUp();
        $('.research__control').removeClass('active');
      }
      if ($(e.target).parents().hasClass('research__list')) {
        var text = $(e.target).text();
        $(e.target).parents('.research__list').siblings('button').text(text);
        closeAccordionMenu();
      }
      if (!$(e.target).parents().hasClass('research__control')) {
        closeAccordionMenu();
      }
    },
    clickDocument: function clickDocument(e) {},
    scrollNextSection: function scrollNextSection() {
      var topV = $('.research__contents').offset().top;
      $('html, body').animate({
        scrollTop: topV
      }, {
        duration: 1000,
        easing: 'easeInOutCubic'
      });
    },
    init: function init() {
      var _this2 = this;
      $('.research__control > button').on('click', function (e) {
        return _this2.toggleAccordion(e);
      });
      $('.research__list button').on('click', function (e) {
        return _this2.closeAccordion(e);
      });
      $(document).on('click', function (e) {
        return _this2.closeAccordion(e);
      });
      $('.scroll-down').on('click', this.scrollNextSection);
      this.mainKvInit();
      this.sliderInit();
    }
  };
  main.init();
});