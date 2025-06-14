/**
 * Header Sticky
 */

(function ($) {
    "use strict";
    /* Header Sticky
  -------------------------------------------------------------------------*/
    var headerSticky = function () {
        let lastScrollTop = 0;
        let delta = 5;
        let navbarHeight = $("header").outerHeight();
        let didScroll = false;

        $(window).scroll(function () {
            didScroll = true;
        });

        setInterval(function () {
            if (didScroll) {
                let st = $(window).scrollTop();
                navbarHeight = $("header").outerHeight();

                if (st > navbarHeight) {
                    if (st > lastScrollTop + delta) {
                        $("header").css("top", `-${navbarHeight}px`);
                        $(".sticky-top").css("top", "15px");
                    } else if (st < lastScrollTop - delta) {
                        $("header").css("top", "0");
                        $("header").addClass("header-sticky");
                        $(".sticky-top").css("top", `${15 + navbarHeight}px`);
                    }
                } else {
                    $("header").css("top", "unset");
                    $("header").removeClass("header-sticky");
                    $(".sticky-top").css("top", "15px");
                }
                lastScrollTop = st;
                didScroll = false;
            }
        }, 250);
    };

    if ($(".slider-home").length > 0) {
        var swiper = new Swiper(".slider-home", {
            loop: true,
            spaceBetween: 0,
            slidesPerView: 1.2,
            centeredSlides: true,
            autoplay: true,
            speed: 1000,
            observer: true,
            observeParents: true,
            freeMode: false,
            watchSlidesProgress: true,
            effect: "coverflow",
            grabCursor: true,
            coverflowEffect: {
                rotate: 0,
                stretch: 367,
                depth: 0,
                modifier: 1,
                scale: 0.8,
                slideShadows: false,
            },
            navigation: {
                clickable: true,
                nextEl: ".next-slider-home",
                prevEl: ".prev-slider-home",
            },
            breakpoints: {
                0: {
                    slidesPerView: 1.2,
                },
                320: {
                    slidesPerView: 1.3,
                },
                375: {
                    slidesPerView: 1.3,
                },
                425: {
                    slidesPerView: 1.5,
                },
                575: {
                    slidesPerView: 1.3,
                },
                768: {
                    slidesPerView: 1.3,
                },
                991: {
                    slidesPerView: 1.8,
                },
                1200: {
                    slidesPerView: 2.1,
                },
                1441: {
                    slidesPerView: 2.3,
                },
            },
        });
    }

    $(window).on("load", function () {
        $(".tf-swiper").each(function (index, element) {
            var $this = $(element);
            var preview = $this.data("preview") || 1;
            var tablet = $this.data("tablet") || 1;
            var mobile = $this.data("mobile") || 1;
            var mobileSm = $this.data("mobile-sm") !== undefined ? $this.data("mobile-sm") : mobile;

            // Spacing
            var spacing = $this.data("space");
            var spacingMd = $this.data("space-md");
            var spacingLg = $this.data("space-lg");
            if (spacing !== undefined && spacingMd === undefined && spacingLg === undefined) {
                spacingMd = spacing;
                spacingLg = spacing;
            } else if (spacing === undefined && spacingMd !== undefined && spacingLg === undefined) {
                spacing = 0;
                spacingLg = spacingMd;
            }
            spacing = spacing || 0;
            spacingMd = spacingMd || 0;
            spacingLg = spacingLg || 0;

            var perGroup = $this.data("pagination") || 1;
            var perGroupSm = $this.data("pagination-sm") || 1;
            var perGroupMd = $this.data("pagination-md") || 1;
            var perGroupLg = $this.data("pagination-lg") || 1;
            var gridRows = $this.data("grid") || 1;
            var cursorType = $this.data("cursor") ?? false;
            var loop = $this.data("loop") ?? false;
            var loopMd = $this.data("loop-md") ?? false;
            var effect = $this.data("effect") || "slide";
            var atPlay = $this.data("auto"); // True || False
            var speed = $this.data("speed") || 800;
            var delay = $this.data("delay") || 1000;
            var direction = $this.data("direction") || "horizontal";
            var centered = $this.data("center") ?? false;
            var init = $this.data("init") || 0;

            var swiperT = new Swiper($this[0], {
                direction: direction,
                speed: speed,
                centeredSlides: centered,
                slidesPerView: mobile,
                spaceBetween: spacing,
                slidesPerGroup: perGroup,
                grabCursor: cursorType,
                loop: loop,
                effect: effect,
                initialSlide: init,
                autoplay: atPlay
                    ? {
                          delay: delay,
                          disableOnInteraction: false,
                          pauseOnMouseEnter: true,
                      }
                    : false,
                grid: {
                    rows: gridRows,
                    fill: "row",
                },
                pagination: {
                    el: ".tf-sw-pagination",
                    clickable: true,
                },
                observer: true,
                observeParents: true,
                // navigation: {
                //     nextEl: [
                //         $this.closest(".tf-btn-swiper-main").find(".nav-next-swiper")[0],
                //         $this.closest(".container").find(".group-btn-slider .nav-next-swiper")[0],
                //     ],
                //     prevEl: [
                //         $this.closest(".tf-btn-swiper-main").find(".nav-prev-swiper")[0],
                //         $this.closest(".container").find(".group-btn-slider .nav-prev-swiper")[0],
                //     ],
                // },
                breakpoints: {
                    575: {
                        slidesPerView: mobileSm,
                        spaceBetween: spacing,
                        slidesPerGroup: perGroupSm,
                        grid: {
                            rows: gridRows,
                            fill: "row",
                        },
                    },
                    768: {
                        slidesPerView: tablet,
                        spaceBetween: spacingMd,
                        slidesPerGroup: perGroupMd,
                        grid: {
                            rows: gridRows,
                            fill: "row",
                        },
                    },
                    1200: {
                        slidesPerView: preview,
                        spaceBetween: spacingLg,
                        slidesPerGroup: perGroupLg,
                        grid: {
                            rows: gridRows,
                            fill: "row",
                        },
                    },
                },
            });
            $(".swiper-button")
                .on("mouseenter", function () {
                    var slideIndex = $(this).data("slide");
                    swiperT.slideTo(slideIndex, 500, false);

                    $(".tf-swiper .card_product--V01.style_2").removeClass("active");
                    $(".tf-swiper .card_product--V01.style_2").eq(slideIndex).addClass("active");
                })
                .on("mouseleave", function () {
                    $(".tf-swiper .card_product--V01.style_2").removeClass("active");
                })
                .on("click", function () {
                    var slideIndex = $(this).data("slide");
                    $(".tf-swiper .card_product--V01.style_2").eq(slideIndex).toggleClass("clicked");
                });
        });
    });

    /* Infinite Slide 
    -------------------------------------------------------------------------*/
    var infiniteSlide = function () {
        if ($(".infiniteSlide").length > 0) {
            $(".infiniteSlide").each(function () {
                var $this = $(this);
                var style = $this.data("style") || "left";
                var clone = $this.data("clone") || 2;
                var speed = $this.data("speed") || 50;
                $this.infiniteslide({
                    speed: speed,
                    direction: style,
                    clone: clone,
                });
            });
        }
    };

    /* animateImgScroll
    -------------------------------------------------------------------------------------*/
    const anime = () => {
        $(".scroll-banners").each(function () {
            var $element = $(this);

            var triggerSettings = {
                trigger: this,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                markers: false,
            };

            if ($element.hasClass("effect-left")) {
                gsap.fromTo(
                    this,
                    { x: "-25%" },
                    {
                        x: "0%",
                        ease: "none",
                        scrollTrigger: triggerSettings,
                    }
                );
            } else if ($element.hasClass("effect-right")) {
                gsap.fromTo(
                    this,
                    { x: "0%" },
                    {
                        x: "-25%",
                        ease: "none",
                        scrollTrigger: triggerSettings,
                    }
                );
            }
        });

        $(".effect-scroll").each(function () {
            const $item = $(this);

            gsap.fromTo(
                $item,
                { y: "20%" },
                {
                    y: "-20%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: $item[0],
                        start: "top 100%",
                        end: "bottom 0%",
                        scrub: true,
                        markers: false,
                    },
                }
            );
        });

        $(".effect-scroll-2").each(function () {
            const $item = $(this);

            gsap.fromTo(
                $item,
                {
                    rotateX: -20,
                    opacity: 0.2,
                },
                {
                    rotateX: 0,
                    opacity: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: $item[0],
                        start: "top 90%",
                        end: "top 30%",
                        scrub: true,
                        markers: false,
                    },
                }
            );
        });
    };
    $(window).on("load", function () {
        anime();
    });
    /* filterIsotope
    -------------------------------------------------------------------------------------*/
    var filterIsotope = function () {
        if ($().isotope) {
            var $container = $(".demo-filter");
            $container.imagesLoaded(function () {
                $container.isotope({
                    itemSelector: ".item",
                    transitionDuration: "1s",
                });
            });

            $(".posttype-filter li").on("click", function () {
                var selector = $(this).find("a").attr("data-filter");
                $(".posttype-filter li").removeClass("active");
                $(this).addClass("active");
                $container.isotope({ filter: selector });
                return false;
            });
        }
    };

    /* Couter
    -------------------------------------------------------------------------------------*/
    var counter = function () {
        if ($(document.body).hasClass("counter-scroll")) {
            var a = 0;
            $(window).scroll(function () {
                var oTop = $(".counter").offset().top - window.innerHeight;
                if (a == 0 && $(window).scrollTop() > oTop) {
                    if ($().countTo) {
                        $(".counter")
                            .find(".number")
                            .each(function () {
                                var to = $(this).data("to"),
                                    speed = $(this).data("speed");
                                $(this).countTo({
                                    to: to,
                                    speed: speed,
                                });
                            });
                    }
                    a = 1;
                }
            });
        }
    };
    $(function () {
        headerSticky();
        infiniteSlide();
        // anime();
        filterIsotope();
        counter();
        new WOW().init();
    });
})(jQuery);
