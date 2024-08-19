"use strict";

$(function () {
  var mainChk = $('.main').length;
  var ww = $(window).innerWidth();
  var counterIdx = 0;
  var totalSection = $('.main-section').length - 1;
  $(window).on('resize', function () {
    ww = $(window).innerWidth();
  });
  if (mainChk) {
    history.scrollRestoration = 'manual';
    var $body = $('body'),
      $wrap = $('.wrap'),
      currentIndex = 0,
      isMove = false;
    var startY, endY;
    var onePageScroll = {
      // mouse wheel
      orderTransition: function orderTransition(e) {
        if (!$('.all-menu').hasClass('active') && !$('.popup--main').hasClass('active')) {
          if (!this.isMobile()) {
            if (!isMove) {
              if (e.originalEvent.deltaY > 0 || e.originalEvent.key === 'ArrowDown') {
                if (!this.isLast()) {
                  isMove = true;
                  currentIndex++;
                  this.setTransitionSection();
                }
              } else if (e.originalEvent.deltaY < 0 || e.originalEvent.key === 'ArrowUp') {
                if (!this.isFirst()) {
                  isMove = true;
                  currentIndex--;
                  this.setTransitionSection();
                }
              } else {
                isMove = true;
                this.setTransitionSection(e.originalEvent.key - 1);
              }
            }
          }
        }
      },
      // 터치
      handleTouch: function handleTouch(e) {
        startY = e.originalEvent.changedTouches[0].screenY;
      },
      handleTouchMove: function handleTouchMove(e) {
        if (!$('.all-menu').hasClass('active') && !$('.popup--main').hasClass('active')) {
          if (!this.isMobile()) {
            if (!isMove) {
              endY = e.originalEvent.changedTouches[0].screenY;
              if (startY - endY > 50) {
                if (!this.isLast()) {
                  isMove = true;
                  currentIndex++;
                  this.setTransitionSection();
                }
              } else if (endY - startY > 50) {
                if (!this.isFirst()) {
                  isMove = true;
                  currentIndex--;
                  this.setTransitionSection();
                }
              }
            }
          }
        }
      },
      // pc/mo 구분
      isMobile: function isMobile() {
        var ww = window.innerWidth;
        return false;
      },
      isOverFlow: function isOverFlow() {
        // if (this.isMobile()) {
        //     $body.removeClass('scroll-lock');
        //     currentIndex = 0;
        //     $('#main').css('transform', 'translate3d(0, 0, 0)');
        // } else {
        //     $body.addClass('scroll-lock');
        //     $(window).scrollTop(0, 0);
        // }

        $('.indicator li').eq(currentIndex).addClass('active').find('span').show().siblings('li').removeClass('active');
        if (currentIndex < totalSection) {
          $('.main').css('transform', 'translate3d(0px, -' + currentIndex * window.innerHeight + 'px, 0px)');
        } else if (currentIndex >= totalSection) {
          $('.main').css('transform', 'translate3d(0px, -' + ((currentIndex - 1) * window.innerHeight + $('.main-section').eq(currentIndex)[0].clientHeight) + 'px, 0px)');
        }
      },
      // 섹션 넘기기
      setTransitionSection: function setTransitionSection(idx) {
        if (idx >= 0) {
          currentIndex = idx;
        }
        if (currentIndex < totalSection) {
          $('.main').css('transform', 'translate3d(0px, -' + currentIndex * window.innerHeight + 'px, 0px)');
        } else if (currentIndex >= totalSection) {
          $('.main').css('transform', 'translate3d(0px, -' + ((currentIndex - 1) * window.innerHeight + $('.main-section').eq(currentIndex)[0].clientHeight) + 'px, 0px)');
        }
        setTimeout(function () {
          isMove = false;
        }, 1200);
        this.setCurrentSection();
      },
      keyDownSetTransitionSection: function keyDownSetTransitionSection(idx) {
        isMove = true;
        if (idx >= 0) {
          currentIndex = idx;
        }
        if (currentIndex < totalSection) {
          $('.main').css('transform', 'translate3d(0px, -' + currentIndex * window.innerHeight + 'px, 0px)');
        } else if (currentIndex >= totalSection) {
          $('.main').css('transform', 'translate3d(0px, -' + ((currentIndex - 1) * window.innerHeight + $('.main-section').eq(currentIndex)[0].clientHeight) + 'px, 0px)');
        }
        setTimeout(function () {
          isMove = false;
        }, 1200);
        this.setCurrentSection();
      },
      setCurrentSection: function setCurrentSection() {
        var currentSection = $('.main-section').eq(currentIndex);
        // indicator
        if (currentIndex <= totalSection) {
          $('.indicator li').eq(currentIndex).addClass('active').siblings('li').removeClass('active');
        }

        // section active
        $('.main-section').removeClass('active');
        currentSection.addClass('active').siblings('.main-section').removeClass('active');
        $('.indicator li').eq(currentIndex).find('span').slideDown(730).parents('li').siblings('li').find('span').stop().slideUp(730);
        //currentSection.siblings('.main-section').find('.aos-init').removeClass('aos-animate');
        // 섹션 컬러라이징
        if (currentSection.data('color') === 'white' || $('#searchBtn').hasClass('active')) {
          $('.header').addClass('white');
        } else {
          $('.header').removeClass('white');
        }
      },
      isFirst: function isFirst() {
        return currentIndex === 0;
      },
      isLast: function isLast() {
        return $('.main-section').length == currentIndex + 1;
      },
      goFirst: function goFirst() {
        $('.main').css('transform', 'translate3d(0px, 0px, 0px)');
        currentIndex = 0;
        this.setTransitionSection();
        $(window).scrollTop(0);
      },
      handleMobileScroll: function handleMobileScroll(e) {
        var $mainSections = $('.main-section');
        var sectionsTop = [];
        if (this.isMobile()) {
          var scTop = $(this).scrollTop();
          $mainSections.each(function (index, section) {
            sectionsTop.push(section.offsetTop);
          });
          // 섹션 Active
          for (var i = 0; i < sectionsTop.length; i++) {
            if (scTop >= sectionsTop[i] && scTop < sectionsTop[i + 1]) {
              $mainSections.eq(i).addClass('active').siblings().removeClass('active');
            }
            if (scTop >= sectionsTop[sectionsTop.length - 1]) {
              $mainSections.eq(sectionsTop.length - 1).addClass('active').siblings().removeClass('active');
            }
          }
          // 섹션 컬러라이징
          var currentSection = $('.main-section.active');
          if (currentSection.data('color') === 'white') {
            $wrap.addClass('white');
          } else {
            $wrap.removeClass('white');
          }
          var centerPoint = $(window).scrollTop() + $(window).outerHeight(true) / 2;
          if (centerPoint > $('.main-career').offset().top) {
            if (counterIdx === 0) {
              counterStart();
              counterIdx += 1;
            }
          }
        }
      },
      // 인디케이터로 풀페이지 핸들링
      indicatorHandler: function indicatorHandler(e) {
        if (!isMove) {
          isMove = true;
          var idx = $(e.target).parents('li').index();
          this.setTransitionSection(idx);
        }
      },
      scrollBtnHandler: function scrollBtnHandler() {
        if (!isMove) {
          isMove = true, this.setTransitionSection(1);
        }
      },
      init: function init() {
        var _this = this;
        this.isOverFlow();
        $('.main-section').eq(currentIndex).addClass('active');
        $(window).on('wheel', function (e) {
          return _this.orderTransition(e);
        });
        $(window).on('keydown', function (e) {
          return _this.orderTransition(e);
        });
        $(window).on('touchstart', function (e) {
          return _this.handleTouch(e);
        });
        $(window).on('touchend', function (e) {
          return _this.handleTouchMove(e);
        });
        $(window).on('resize', function () {
          return _this.isOverFlow();
        });
        $(window).on('scroll touchmove', function () {
          return _this.handleMobileScroll();
        });
        $('.scroll-down').on('click', function () {
          return _this.setTransitionSection(1);
        });
        $('.indicator li a').on('click', function (e) {
          return _this.indicatorHandler(e);
        });
      }
    };
    onePageScroll.init();
  }
  var main = {
    mainKvInit: function mainKvInit() {
      var mainKV = new Swiper('.main-kv', {
        slidesPerView: 'auto',
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        allowTouchMove: false,
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
        resizeObserver: false,
        hashNavigation: {
          watchState: true
        },
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
      var _this2 = this;
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
        allowTouchMove: false,
        speed: 1200,
        observer: true,
        observeParents: true
      });
      var textSlider = new Swiper('.text-slider', {
        autoplay: false,
        loop: true,
        effect: 'fade',
        allowTouchMove: false,
        fadeEffect: {
          crossFade: true
        }
      });
      var imageSlider = new Swiper('.image-slider', {
        speed: 1200,
        effect: 'slide',
        allowTouchMove: false
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
        slidesPerView: 2,
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
        return _this2.handleProgress(v);
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
        return _this2.handleProgressPeper(v);
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
    init: function init() {
      this.mainKvInit();
      this.sliderInit();
    }
  };
  main.init();
});