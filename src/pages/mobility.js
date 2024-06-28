import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Swiper } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

window.Webflow ||= [];
window.Webflow.push(() => {
  // Init swiper sliders
  new Swiper('.swiper.is-mobility-gallery', {
    slidesPerView: 'auto',
    spaceBetween: 28,
    loop: true,
    modules: [Navigation, Pagination],
    navigation: {
      nextEl: '.swiper-button-next.is-mobility-gallery',
      prevEl: '.swiper-button-prev.is-mobility-gallery',
    },
    pagination: {
      el: '.swiper-pagination.is-mobility-gallery',
      clickable: true,
    },
  });
});
