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
        // ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
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
        if (typeof gsap !== "undefined" && $(".hover-repel").length) {
            $(document).on("mousemove", function (e) {
                $(".hover-repel").each(function () {
                    const $this = $(this);
                    const offset = $this.offset();
                    const width = $this.outerWidth();
                    const height = $this.outerHeight();

                    const centerX = offset.left + width / 2;
                    const centerY = offset.top + height / 2;

                    const deltaX = centerX - e.pageX;
                    const deltaY = centerY - e.pageY;

                    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                    const radius = 300;
                    const maxPush = 50;

                    if (distance < radius) {
                        const force = (1 - distance / radius) * maxPush;

                        const angle = Math.atan2(deltaY, deltaX);
                        const moveX = Math.cos(angle) * force;
                        const moveY = Math.sin(angle) * force;

                        gsap.to(this, {
                            x: moveX,
                            y: moveY,
                            duration: 0.3,
                            ease: "power2.out",
                        });
                    } else {
                        gsap.to(this, {
                            x: 0,
                            y: 0,
                            duration: 0.5,
                            ease: "power2.out",
                        });
                    }
                });
            });
        }
        ScrollTrigger.refresh();
    };
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

            $(".posttype-filter a").on("click", function () {
                var selector = $(this).attr("data-filter");
                $(".posttype-filter a").removeClass("active");
                $(this).addClass("active");
                $container.isotope({ filter: selector });
                anime();
                return false;
            });
        }
    };
    $(window).on("load", function () {
        anime();
    });

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

    const reveal = () => {
        // if (!config || !config.reveal || !config.reveal.enable) {
        //     return;
        // }

        const $reveals = $(".reveal");

        if ($reveals.length === 0) {
            console.log("Reveal is not working because no items found.");
            return;
        } else {
            console.log("Reveal is working");
        }

        if ($(window).width() > 768) {
            $(window).on("scroll", function () {
                $reveals.each(function () {
                    const $el = $(this);
                    const windowHeight = $(window).height();
                    const revealTop = this.getBoundingClientRect().top;
                    const elHeight = $el.outerHeight();
                    const revealPoint = 150;
                    const posPoint = 20;

                    // Parent styles
                    $el.parent().css({
                        perspective: "700px",
                        transformStyle: "preserve-3d",
                        perspectiveOrigin: "100% 0%",
                    });

                    // Node styles
                    $el.css({
                        transformOrigin: "50% 0",
                        translate: "none",
                        rotate: "none",
                        scale: "none",
                        transition: "all .35s ease",
                    });

                    if (revealTop > windowHeight - revealPoint) {
                        $el.css({
                            opacity: "0",
                            transform: `rotateX(-${posPoint}deg)`,
                        });
                    }

                    if (revealTop < windowHeight - revealPoint) {
                        if (revealTop > -50) {
                            const schemas = Math.abs(1 - revealTop / elHeight);
                            const opacity = Math.min(Math.abs(1 - (revealTop - 350) / elHeight), 1);
                            const rotate = Math.min(posPoint * schemas - (posPoint - 10), 0);

                            $el.css({
                                opacity: opacity,
                                transform: `translate3d(0px,0px,0px) rotateX(${rotate}deg)`,
                            });
                        } else {
                            $el.css({
                                transform: `translate(0,0)`,
                            });
                        }
                    }
                });
            });
        }
    };

    var slideWrap = () => {
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
        if ($(".slider-home").length > 0) {
            var swiper = new Swiper(".slider-home", {
                spaceBetween: 0,
                slidesPerView: 1.2,
                centeredSlides: true,
                speed: 1000,
                observer: true,
                observeParents: true,
                freeMode: false,
                // watchSlidesProgress: true,
                effect: "coverflow",
                loop: true,
                grabCursor: true,
                coverflowEffect: {
                    rotate: 0,
                    // stretch: 604,
                    stretch: 500,
                    depth: 0,
                    modifier: 1,
                    scale: 1,
                    slideShadows: false,
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1.2,
                        coverflowEffect: {
                            stretch: 100,
                        },
                    },

                    1439: {
                        slidesPerView: 1.8,
                    },
                    1599: {
                        slidesPerView: 2.1,
                    },
                },
            });
            setTimeout(() => {
                swiper.update();
            }, 200);
        }
        $(".slider-home_container").addClass("loaded");
    };
    /* Go Top
    -------------------------------------------------------------------------*/
    var goTop = function () {
        var $goTop = $("#goTop");
        var $borderProgress = $(".border-progress");

        $(window).on("scroll", function () {
            var scrollTop = $(window).scrollTop();
            var docHeight = $(document).height() - $(window).height();
            var scrollPercent = (scrollTop / docHeight) * 100;
            var progressAngle = (scrollPercent / 100) * 360;

            $borderProgress.css("--progress-angle", progressAngle + "deg");

            if (scrollTop > 100) {
                $goTop.addClass("show");
            } else {
                $goTop.removeClass("show");
            }
        });

        $goTop.on("click", function () {
            $("html, body").animate({ scrollTop: 0 }, 0);
        });
    };

    /* Preloader
    -------------------------------------------------------------------------*/
    var preloader = function () {
        $("#preload").fadeOut("slow", function () {
            var $this = $(this);
            $this.remove();
        });
    };
    $(function () {
        slideWrap();
        headerSticky();
        infiniteSlide();
        filterIsotope();
        counter();
        reveal();
        goTop();
        new WOW().init();
        preloader();
    });
})(jQuery);
