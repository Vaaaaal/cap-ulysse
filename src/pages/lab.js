import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Swiper } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

window.Webflow ||= [];
window.Webflow.push(() => {
  // Init swiper sliders
  new Swiper('.swiper.is-lab-steps', {
    slidesPerView: 1,
    spaceBetween: 32,
    breakpoints: {
      992: {
        slidesPerView: 2,
      },
    },
    modules: [Navigation, Pagination],
    navigation: {
      nextEl: '.swiper-button-next.is-lab-steps',
      prevEl: '.swiper-button-prev.is-lab-steps',
    },
    pagination: {
      el: '.swiper-pagination.is-lab-steps',
      clickable: true,
    },
  });

  new Swiper('.swiper.is-lab-projects', {
    slidesPerView: 1,
    spaceBetween: 32,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
    loop: true,
    modules: [Navigation, Pagination],
    navigation: {
      nextEl: '.swiper-button-next.is-lab-projects',
      prevEl: '.swiper-button-prev.is-lab-projects',
    },
    pagination: {
      el: '.swiper-pagination.is-lab-projects',
      clickable: true,
    },
  });
});
