import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import gsap from 'gsap';
import { Swiper } from 'swiper';
import { Navigation } from 'swiper/modules';

import { Splitter } from '$components/splitter';

window.Webflow ||= [];
window.Webflow.push(() => {
  // Init swiper sliders
  if (document.querySelectorAll('.swiper-slide.is-mobility-hero').length > 1) {
    new Swiper('.swiper.is-mobility-gallery', {
      slidesPerView: 'auto',
      spaceBetween: 28,
      loop: true,
      modules: [Navigation],
      navigation: {
        nextEl: '.swiper-button-next.is-mobility-gallery',
        prevEl: '.swiper-button-prev.is-mobility-gallery',
      },
    });
  }

  let mm = gsap.matchMedia();

  mm.add('(max-width: 767px)', () => {
    new Swiper('.swiper.is-mobility-timeline', {
      slidesPerView: 1,
      spaceBetween: 0,
    });
  });

  // Mobility splitter init
  new Splitter(document.querySelector('.mobility_splitter_wrapper'));

  // Mobility intro cover animation
  const mobilityIntroCoverFlex = document.querySelectorAll('.mobility_intro_cover_flex');
  let currentIndex = 0;
  setInterval(function () {
    let oldActiveElement = $(mobilityIntroCoverFlex[2]).children()[currentIndex];
    gsap.to(oldActiveElement, {
      color: 'var(--base-color-brand--orange-light)',
      duration: 0.3,
    });

    currentIndex = currentIndex + 1;

    let newActiveElement = $(mobilityIntroCoverFlex[2]).children()[currentIndex];
    gsap.to(newActiveElement, {
      color: 'var(--base-color-brand--orange-dark)',
      duration: 0.3,
    });

    gsap.to('.mobility_intro_cover_flex_wrapper', {
      y: `-${$('.mobility_intro_cover_flex_item').height() * currentIndex}px`,
      duration: 0.6,
      onComplete: () => {
        if (currentIndex >= $(mobilityIntroCoverFlex[2]).children().length - 1) {
          gsap.set('.mobility_intro_cover_flex_wrapper', {
            y: 0,
            onComplete: () => {
              currentIndex = 0;

              if (currentIndex !== 0) {
                let oldActiveElement = $(mobilityIntroCoverFlex[2]).children()[currentIndex];
                gsap.to(oldActiveElement, {
                  color: 'var(--base-color-brand--orange-light)',
                  duration: 0.3,
                });
              }

              gsap.set('.mobility_intro_cover_flex_item', {
                color: 'var(--base-color-brand--orange-light)',
              });
              gsap.set($(mobilityIntroCoverFlex[2]).children()[0], {
                color: 'var(--base-color-brand--orange-dark)',
              });
            },
          });
        }
      },
    });
  }, 2000);
});
