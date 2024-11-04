import 'swiper/css';
import 'swiper/css/navigation';

import { Swiper } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

window.Webflow ||= [];
window.Webflow.push(() => {
  // Init swiper sliders
  new Swiper('.swiper.is-formations-details-testimonial', {
    slidesPerView: 1,
    spaceBetween: 32,
    breakpoints: {
      992: {
        slidesPerView: 2,
      },
    },
    loop: true,
    modules: [Navigation, Pagination],
    navigation: {
      prevEl: '.swiper-button-prev.is-formations-details-testimonial',
      nextEl: '.swiper-button-next.is-formations-details-testimonial',
    },
    pagination: {
      el: '.swiper-pagination.is-formations-details-testimonial',
      clickable: true,
    },
  });
});
