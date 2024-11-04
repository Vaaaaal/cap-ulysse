import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import { Swiper } from 'swiper';
import { EffectFade, Navigation } from 'swiper/modules';

window.Webflow ||= [];
window.Webflow.push(() => {
  // Init swiper sliders
  new Swiper('.swiper.is-blog-featured', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    modules: [Navigation],
    navigation: {
      nextEl: '.swiper-button-next.is-blog-featured',
    },
  });
  new Swiper('.swiper.is-blog-featured-next', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    initialSlide: 1,
    effect: 'fade',
    crossFade: true,
    modules: [Navigation, EffectFade],
    navigation: {
      nextEl: '.swiper-button-next.is-blog-featured',
    },
  });
});
