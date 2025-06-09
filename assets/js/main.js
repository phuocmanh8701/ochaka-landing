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
            slidesPerView: 1.61,
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
                    slidesPerView: 1,
                },
                500: {
                    slidesPerView: 1.1,
                },
                768: {
                    slidesPerView: 1.4,
                },
                991: {
                    slidesPerView: 1.8,
                },
                1200: {
                    slidesPerView: 1.3,
                },
                1441: {
                    slidesPerView: 2.3,
                },
            },
        });
    }

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
    const scrollBanners = () => {
        const bannerStripes = document.querySelectorAll(".scroll-banners");
        if (!bannerStripes.length) return;

        bannerStripes.forEach((element) => {
            const $element = $(element);

            const triggerSettings = {
                trigger: element,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
                markers: false,
            };

            if ($element.hasClass("effect-left")) {
                gsap.fromTo(
                    element,
                    { x: "-25%" },
                    {
                        x: "0%",
                        ease: "none",
                        scrollTrigger: triggerSettings,
                    }
                );
            } else if ($element.hasClass("effect-right")) {
                gsap.fromTo(
                    element,
                    { x: "0%" },
                    {
                        x: "-25%",
                        ease: "none",
                        scrollTrigger: triggerSettings,
                    }
                );
            }
        });
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

            $(".posttype-filter li").on("click", function () {
                var selector = $(this).find("a").attr("data-filter");
                $(".posttype-filter li").removeClass("active");
                $(this).addClass("active");
                $container.isotope({ filter: selector });
                return false;
            });
        }
    };
    $(function () {
        headerSticky();
        infiniteSlide();
        scrollBanners();
        filterIsotope();
    });
})(jQuery);
