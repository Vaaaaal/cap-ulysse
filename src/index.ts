import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { TextPlugin } from 'gsap/TextPlugin';

import { Accordion } from '$components/accordion';
import { Magnetic } from '$components/magnetic';
import { Menu } from '$components/menu';
import { greetUser } from '$utils/greet';
import { pageTransition } from '$utils/page-transition';
import { sortFamily } from '$utils/sort';

window.Webflow ||= [];
window.Webflow.push(() => {
  // Initial code & welcome message
  const name = 'Vaaal';
  greetUser(name);

  // Initialize the GSAP plugins
  gsap.registerPlugin(SplitText, TextPlugin, ScrollTrigger);

  // Initialize the magnetic effect to element with attributes [data-magnetic="box"] and [data-magnetic="item"]
  const magneticBoxes = document.querySelectorAll('[data-magnetic="box"]');
  magneticBoxes.forEach((box) => {
    const item = box.querySelector('[data-magnetic="item"]');
    new Magnetic(box as HTMLButtonElement, item as HTMLButtonElement);
  });

  // Update date format to FR
  const dateItems = document.querySelectorAll('[data-date-format]');
  dateItems.forEach((item) => {
    const dateFormat = item
      .getAttribute('data-date-format')
      ?.split(',')
      .map((item) => {
        const split = item.split(':');
        return { [split[0].trim()]: split[1].trim() };
      })
      .reduce((acc, item) => {
        return { ...acc, ...item };
      });

    if (dateFormat) {
      $(item).text(new Date($(item).text()).toLocaleDateString('fr-FR', dateFormat));
    }
  });

  // Initialize the accordion items to elements with class .accordion-item
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems &&
    accordionItems.forEach((item) => {
      const accordion = new Accordion(item as HTMLElement);
      accordion.init();
    });

  // Initialize sortBy if needed to elements with data attributes [data-sort-by]
  const sortByInFamily = document.querySelectorAll('[data-sort-family]');
  sortByInFamily.forEach((item) => {
    sortFamily(item as HTMLElement);
  });

  // Init menu & menu panel
  const button = document.querySelector('.button.is-menu-button') as HTMLButtonElement;
  const panel = document.querySelector('.navbar_panel_wrapper') as HTMLButtonElement;
  new Menu(button, panel);

  // Init animation on CU members hover
  if (document.querySelector('.team_image_shape')) {
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
  }

  /**
   * Transition page on link click
   */
  // Init page transition
  $('a').on('click', function (e) {
    if (
      $(this).prop('hostname') === window.location.host &&
      $(this).attr('href')?.indexOf('#') === -1 &&
      $(this).attr('target') !== '_blank'
    ) {
      e.preventDefault();
      const destination = $(this).attr('href');
      pageTransition(destination);
    }
  });

  // On click of the back button
  window.onpageshow = function (event) {
    if (event.persisted) {
      window.location.reload();
    }
  };

  // Fade in / out on all section apparition with ScrollTrigger
  const sections = document.querySelector('.main-wrapper')?.children;
  Array.from(sections || []).forEach((section) => {
    gsap.to(section, {
      opacity: 1,
      duration: 0.6,
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'top -10000%',
        toggleActions: 'play reverse play reverse',
      },
    });
  });

  // Apparition for navbar
  const navbar = document.querySelector('.navbar') as HTMLElement;
  gsap.to(navbar, {
    y: 0,
    duration: 0.6,
    ease: 'power3.out',
    delay: 0.2,
  });
});
