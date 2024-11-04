import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Swiper } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import { Modal } from '$components/modal';

window.Webflow ||= [];
window.Webflow.push(() => {
  // Init swiper sliders
  const categoriesSliders = document.querySelectorAll('.swiper.is-categorie-modal');
  categoriesSliders.forEach((element) => {
    new Swiper(element, {
      slidesPerView: 1,
      spaceBetween: 16,
      loop: true,
      modules: [Navigation, Pagination],
      navigation: {
        prevEl: element.parentElement.querySelector('.swiper-button-prev.is-categorie-modal'),
        nextEl: element.parentElement.querySelector('.swiper-button-next.is-categorie-modal'),
      },
      pagination: {
        el: element.parentElement.querySelector('.swiper-pagination.is-categorie-modal'),
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 1.5,
        },
        992: {
          slidesPerView: 2,
        },
      },
    });
  });

  // Modal
  const categoriesModal = document.querySelectorAll('[element-modal]');
  categoriesModal.forEach((modal) => {
    new Modal(modal);
  });
});
