import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { TextPlugin } from 'gsap/TextPlugin';

import { Accordion } from '$components/accordion';
import { Magnetic } from '$components/magnetic';
import { Menu } from '$components/menu';
import { greetUser } from '$utils/greet';
import { sortFamily } from '$utils/sort';

window.Webflow ||= [];
window.Webflow.push(() => {
  // Initial code & welcome message
  const name = 'Vaaal';
  greetUser(name);

  // Initialize the GSAP plugins
  gsap.registerPlugin(SplitText, TextPlugin);

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
});
