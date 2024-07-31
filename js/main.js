(function($) {
  
  "use strict";

  // Sticky Nav
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 200) {
            $('.scrolling-navbar').addClass('top-nav-collapse');
        } else {
            $('.scrolling-navbar').removeClass('top-nav-collapse');
        }
    });

    /* 
   One Page Navigation & wow js
   ========================================================================== */
    //Initiat WOW JS
    new WOW().init();

    // one page navigation 
    $('.main-navigation').onePageNav({
            currentClass: 'active'
    }); 

    $(window).on('load', function() {
       
        $('body').scrollspy({
            target: '.navbar-collapse',
            offset: 195
        });

        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 200) {
                $('.fixed-top').addClass('menu-bg');
            } else {
                $('.fixed-top').removeClass('menu-bg');
            }
        });

    });

    // Slick Nav 
    $('.mobile-menu').slicknav({
      prependTo: '.navbar-header',
      parentTag: 'span',
      allowParentLinks: true,
      duplicate: false,
      label: '',
    });


/* 
   CounterUp
   ========================================================================== */
    $('.counter').counterUp({
      time: 1000
    });

/* 
   MixitUp
   ========================================================================== */
  $('#portfolio').mixItUp();

/* 
   Touch Owl Carousel
   ========================================================================== */
   var car1 = $('.owl-carousel2').owlCarousel({
      loop:true,
      margin:10,
      nav:false,
      items: 5,
      responsive : {
    // breakpoint from 0 up
    0 : {
        items : 1

    },
    // breakpoint from 480 up
    480 : {
        items : 2
    },
    // breakpoint from 768 up
    768 : {
        items : 5
    }
}
  });

    $("#empresa").on("click",".siguiente", function(){
        car1.trigger("next.owl.carousel");
    }); 
    $("#empresa").on("click touch",".anterior", function(){
        car1.trigger("prev.owl.carousel");
    }); 
/*


    Touch Owl Carousel-1
    ========================================================================== */
   var car = $('.hola').owlCarousel({
      loop:true,
      margin:10,
      nav:false,
      items: 3,
      autoplay: false,
      dots: false,
      responsive : {
    // breakpoint from 0 up
    0 : {
        items : 1

    },
    // breakpoint from 480 up
    480 : {
        items : 2
    },
    // breakpoint from 768 up
    768 : {
        items : 3
    }
}
  });

    $(".hola-boton").on("click",".siguiente", function(){
        car.trigger("next.owl.carousel");
    }); 
    $(".hola-boton").on("click touch",".anterior", function(){
        car.trigger("prev.owl.carousel");
    }); 

/* 
/* 
   Touch Owl Carousel-2
   ========================================================================== */
   var car2 = $('.mundo').owlCarousel({
      loop:true,
      margin:10,
      nav:false,
      autoplay: false,
      items: 3,
      dots: false,
      responsive : {
    // breakpoint from 0 up
    0 : {
        items : 1

    },
    // breakpoint from 480 up
    480 : {
        items : 2
    },
    // breakpoint from 768 up
    768 : {
        items : 3
    }
}
  });

    $(".mundo-boton").on("click",".siguiente", function(){
        car2.trigger("next.owl.carousel");
    }); 
    $(".mundo-boton").on("click touch",".anterior", function(){
        car2.trigger("prev.owl.carousel");
    }); 

/* 
   slider
   ========================================================================== */

   var car3 = $('.calecita').owlCarousel({
      loop:true,
      nav:false,
      autoplay: true,
      autoplayTimeout: 8000,
      items: 1,
      dots: false
  });

    $(".calecita-boton").on("click",".siguiente", function(){
        car3.trigger("next.owl.carousel");
    }); 
    $(".calecita-boton").on("click touch",".anterior", function(){
        car3.trigger("prev.owl.carousel");
    }); 


    var carnew = $('.calecita2').owlCarousel({
      loop:true,
      nav:false,
      autoplay: false,
      items: 1,
      dots: true
  });

    $(".calecita-boton").on("click",".siguiente", function(){
        carnew.trigger("next.owl.carousel");
    }); 
    $(".calecita-boton").on("click touch",".anterior", function(){
        carnew.trigger("prev.owl.carousel");
    }); 

/* 
   Tourdestacados Carousel
   ========================================================================== */
   var car4 = $('.tourdestacados').owlCarousel({
      loop:true,
      margin: 20,
      nav:false,
      autoplay: false,
      dots: false,
      items: 4,
      responsive : {
    // breakpoint from 0 up
    0 : {
        items : 1

    },
    // breakpoint from 480 up
    480 : {
        items : 2
    },
    // breakpoint from 768 up
    768 : {
        items : 3
    }
}
  });

    $(".sliderboton").on("click",".siguiente", function(){
        car4.trigger("next.owl.carousel");
    }); 
    $(".sliderboton").on("click touch",".anterior", function(){
        car4.trigger("prev.owl.carousel");
    }); 
/*

/* 
   Descubripaises slider3
   ========================================================================== */
   var car5 = $('.descubripaises').owlCarousel({
      loop:true,
      nav:false,
      items: 1,
      autoplay: true,
      autoplayTimeout: 8000,
      dots: false,
      itemsDesktop : [1199,1],
      itemsDesktopSmall: [1024, 1],
      itemsTablet: [600, 1],
      itemsMobile: [479, 1]
    });
/*
/* 
   VIDEO POP-UP
   ========================================================================== */
    $('.video-popup').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
    });


  /* 
   SMOOTH SCROLL
   ========================================================================== */
    var scrollAnimationTime = 1200,
        scrollAnimation = 'easeInOutExpo';

    $('a.scrollto').on('bind', 'click.smoothscroll', function (event) {
        event.preventDefault();
        var target = this.hash;
        
        $('html, body').stop().animate({
            'scrollTop': $(target).offset().top
        }, scrollAnimationTime, scrollAnimation, function () {
            window.location.hash = target;
        });
    });

/* 
   Back Top Link
   ========================================================================== */
    var offset = 200;
    var duration = 500;
    $(window).scroll(function() {
      if ($(this).scrollTop() > offset) {
        $('.back-to-top').fadeIn(400);
      } else {
        $('.back-to-top').fadeOut(400);
      }
    });

    $('.back-to-top').on('click',function(event) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: 0
      }, 600);
      return false;
    })

/* Nivo Lightbox
  ========================================================*/   
   $('.lightbox').nivoLightbox({
    effect: 'fadeScale',
    keyboardNav: true,
  });


/* stellar js
  ========================================================*/
  $.stellar({
    horizontalScrolling: true,
    verticalOffset: 40,
    responsive: true
  });

/* 
   Page Loader
   ========================================================================== */
  $('#loader').fadeOut();

}(jQuery));

