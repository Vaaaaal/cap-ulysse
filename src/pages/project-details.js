import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import gsap from 'gsap';
import { Swiper } from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

window.Webflow ||= [];
window.Webflow.push(() => {
  // let mm = gsap.matchMedia();

  if ($('.project-details_header_content')) {
    const projectTags = $('.project-details_header_content').text().split(',');
    if (projectTags.length > 0) {
      $('.project-details_header_content').remove();
      projectTags.forEach((tag) => {
        $('.project-details_header_content_wrapper').append(
          `<div class='project-details_header_content'>${tag.trim()}</div>`
        );
      });
    }
  }

  if ($('.project-details_benefits_card_content_partners')) {
    if ($('.project-details_benefits_card_content_partners').text().length <= 2) {
      $('.project-details_benefits_card_content_partners').css('font-size', '20ch');
    }
  }

  gsap.set('.team_image_shape', {
    yPercent: -100,
  });

  $('.project-details_team_list_item')
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
  new Swiper('.swiper.is-project-detail-testimonial', {
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
      nextEl: '.swiper-button-next.is-project-detail-testimonial',
      prevEl: '.swiper-button-prev.is-project-detail-testimonial',
    },
    pagination: {
      el: '.swiper-pagination.is-project-detail-testimonial',
      clickable: true,
    },
  });
});