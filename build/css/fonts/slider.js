
$(document).ready(function(){
  $('.projects__slider').slick({
    infinite: true,
    dots: true,
    autoplay: true,
  });

  $('.staff__slider').slick({
    infinite: true,
    dots: true,
    autoplay: true,
    fade: true,
    cssEase: 'linear'
  });

  $('.benefits__slider').slick({
    infinite: true,
    dots: true,
    autoplay: true,
  });
});



// const swiperProjects = new Swiper('.projects__slider', {
//   spaceBetween: 2,
//   autoplay: true,
//   disableOnInteraction: false,
//   loop: true,
//   pagination: {
//     el: '.swiper-pagination',
//     type: 'bullets',
//     clickable: true,
//   },
// });

// const swiperStaff = new Swiper('.staff__slider', {
//   spaceBetween: 2,
//   autoplay: true,
//   disableOnInteraction: false,
//   loop: true,
//   effect: 'fade',
//   fadeEffect: {
//     crossFade: true
//   },
//   pagination: {
//     el: '.swiper-pagination',
//     type: 'bullets',
//     clickable: true,
//   },
// });

// const swiperBenefits = new Swiper('.benefits__slider', {
//   spaceBetween: 2,
//   autoplay: true,
//   disableOnInteraction: false,
//   loop: true,
//   pagination: {
//     el: '.swiper-pagination',
//     type: 'bullets',
//     clickable: true,
//   },
// });
