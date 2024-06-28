import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Swiper } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

window.Webflow ||= [];
window.Webflow.push(() => {
  // Init swiper sliders
  new Swiper('.swiper.is-team', {
    slidesPerView: 3.25,
    spaceBetween: 28,
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
});
