import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

// Initialize the GSAP plugins
gsap.registerPlugin(Flip);

/**
 * Class representing a button element
 */
export class Splitter {
  container: HTMLElement;
  triggers: [HTMLButtonElement];
  elements: [HTMLElement];
  first: boolean;

  /**
   * Constructor
   * @param container The container element who contains all others elements
   * @param triggers An array with all triggers elements
   * @param elements An array with all the split's element
   * @param first Using to check if it's the first time that the split is opened
   */
  constructor(container: HTMLElement) {
    this.container = container;
    this.triggers = Array.from(this.container.querySelectorAll('[data-splitter-trigger]')) as [
      HTMLButtonElement,
    ];
    this.elements = Array.from(this.container.querySelectorAll('[data-splitter-element]')) as [
      HTMLElement,
    ];
    this.first = true;

    this.init();
  }

  /**
   * Init the splitter
   */
  init() {
    if (this.container.dataset.splitterContainer === 'mobility') {
      this.triggers.forEach((trigger) => {
        const { splitterTrigger } = trigger.dataset;
        if (splitterTrigger) {
          trigger.addEventListener('click', () => {
            this.openOneSplitMobility(splitterTrigger);
          });
        }
      });
    }
    // else if (this.container.dataset.splitterContainer === 'contact') {
    //   this.triggers.forEach((trigger) => {
    //     const { splitterTrigger } = trigger.dataset;
    //     if (splitterTrigger) {
    //       trigger.addEventListener('click', () => {
    //         this.openOneSplitContact(splitterTrigger);
    //       });
    //     }
    //   });
    // }
  }

  /**
   * Action to open a split in mobility
   */
  openOneSplitMobility(splitToOpen: string): void {
    if (this.first) {
      this.first = false;
    }

    this.elements.forEach((element) => {
      if (element.classList.contains('is-active')) {
        gsap.set('.mobility_splitter_layer', {
          display: 'block',
        });

        gsap.to('.mobility_splitter_layer', {
          opacity: 0.175,
          duration: 0.4,
          ease: 'power2.in',
        });

        gsap.to(element, {
          scale: 0.9,
          position: 'absolute',
          zIndex: 96,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            element.classList.remove('is-active');
            gsap.set(element, {
              scale: 1,
              display: 'none',
              position: 'absolute',
              zIndex: 98,
            });

            gsap.set('.mobility_splitter_layer', {
              opacity: 0,
              display: 'none',
            });
          },
        });
      }
    });

    gsap.fromTo(
      `.${splitToOpen}`,
      {
        xPercent: 100,
        display: 'block',
        position: 'relative',
        zIndex: 98,
      },
      {
        xPercent: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        delay: 0.15,
        onComplete: () => {
          $(`.${splitToOpen}`).addClass('is-active');
          gsap.set(`.${splitToOpen}`, {
            zIndex: 97,
          });
        },
      }
    );
  }

  // /**
  //  * Action to open a split in contact
  //  */
  // openOneSplitContact(splitToOpen: string): void {
  //   if (splitToOpen === 'init') {
  //     // Get init state (animation in reverse)
  //   }

  //   this.elements.forEach((element) => {
  //     if (element.classList.contains('is-active')) {
  //       gsap.to(element, {
  //         xPercent: -100,
  //         position: 'absolute',
  //         duration: 0.6,
  //         ease: 'power2.inOut',
  //         onComplete: () => {
  //           element.classList.remove('is-active');
  //           gsap.set(element, {
  //             scale: 1,
  //             display: 'none',
  //             position: 'absolute',
  //           });
  //         },
  //       });
  //     }
  //   });

  //   gsap.fromTo(
  //     `.${splitToOpen}`,
  //     {
  //       yPercent: 100,
  //       display: 'block',
  //       position: 'relative',
  //     },
  //     {
  //       yPercent: 0,
  //       duration: 0.6,
  //       ease: 'power2.inOut',
  //       delay: 0.15,
  //       onComplete: () => {
  //         $(`.${splitToOpen}`).addClass('is-active');
  //       },
  //     }
  //   );
  // }

  // contactInitAnimation() {
  //   console.log('init animation');
  // }
}
