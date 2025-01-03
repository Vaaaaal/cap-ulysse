import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import gsap from 'gsap';
import { Swiper } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

window.Webflow ||= [];
window.Webflow.push(() => {
  let mm = gsap.matchMedia();

  gsap.set('.team_image_shape', {
    yPercent: -100,
  });

  $('.swiper-slide.is-team')
    .on('mouseenter', function () {
      const tl = gsap.timeline();

      tl.to($(this).find('.team_image_classique'), {
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in',
      }).to(
        $(this).find('.team_image_special'),
        {
          opacity: 1,
          duration: 0.3,
          ease: 'power3.out',
        },
        '<=0.1'
      );

      gsap.to($(this).find('.team_image_shape'), {
        yPercent: 0,
        duration: 0.4,
        ease: 'power3.inOut',
      });
    })
    .on('mouseleave', function () {
      const tl = gsap.timeline();

      tl.to($(this).find('.team_image_special'), {
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in',
      }).to(
        $(this).find('.team_image_classique'),
        {
          opacity: 1,
          duration: 0.3,
          ease: 'power3.out',
        },
        '<=0.1'
      );

      gsap.to($(this).find('.team_image_shape'), {
        yPercent: -100,
        duration: 0.4,
        ease: 'power3.inOut',
      });
    });

  // Init swiper sliders
  new Swiper('.swiper.is-team', {
    slidesPerView: 1,
    spaceBetween: 28,
    breakpoints: {
      992: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
      },
    },
    modules: [Navigation, Pagination],
    navigation: {
      nextEl: '.swiper-button-next.is-team',
      prevEl: '.swiper-button-prev.is-team',
    },
    pagination: {
      el: '.swiper-pagination.is-team',
      clickable: true,
    },
  });
  $('.slider_controls.is-team').css('display', 'flex');
  $('.swiper-slide.is-team').css('max-width', '100%');
  $('.swiper-wrapper.is-team').css('column-gap', '0');

  mm.add('(max-width: 767px)', () => {
    new Swiper('.swiper.is-about-timeline', {
      slidesPerView: 1,
      spaceBetween: 0,
      autoHeight: true,
    });
  });
});
