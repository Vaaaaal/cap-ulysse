import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { TextPlugin } from 'gsap/TextPlugin';

import { Magnetic } from '$components/magnetic';
import { Menu } from '$components/menu';
import { greetUser } from '$utils/greet';

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

  // Init menu & menu panel
  const button = document.querySelector('.button.is-menu-button') as HTMLButtonElement;
  const panel = document.querySelector('.navbar_panel_wrapper') as HTMLButtonElement;
  new Menu(button, panel);
});
