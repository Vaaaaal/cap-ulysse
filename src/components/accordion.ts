import gsap from 'gsap';
import { Flip } from 'gsap/Flip';

// Initialize the GSAP plugins
gsap.registerPlugin(Flip);

/**
 * Class representing an Accordion element
 */
export class Accordion {
  element: HTMLElement;
  headerElement: HTMLElement;
  headerIcon: HTMLElement;
  bodyElement: HTMLElement;
  bodyElementContent: HTMLElement;
  bodyElementFooter: HTMLElement;

  /**
   * Constructor
   * @param element The accordion element itself
   * @param headerElement The accordion header element
   * @param bodyElement The accordion body element
   * @param bodyElementContent The accordion body element content
   * @param bodyElementFooter The accordion body element footer
   */
  constructor(element: HTMLElement) {
    this.element = element;
    this.headerElement = this.element.querySelector('.accordion-item-header')!;
    this.headerIcon = this.headerElement.querySelector('.accordion-item-icon')!;
    this.bodyElement = this.element.querySelector('.accordion-item-body')!;
    this.bodyElementContent = this.bodyElement.querySelector('.accordion-item-body-content')!;
    this.bodyElementFooter = this.bodyElement.querySelector('.accordion-item-body-footer')!;
  }

  /**
   * Initialize the accordion
   */
  init() {
    if (this.element.dataset.active === 'true') {
      this.open();
    }
    (this.headerElement as HTMLElement).addEventListener('click', () => {
      this.toggle();
    });
  }

  /**
   * Toggle the accordion
   */
  toggle() {
    if (this.element.classList.contains('is-active')) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Open the accordion
   */
  open() {
    this.closeAllAccordions();

    const state = Flip.getState(this.element);

    this.element.classList.add('is-active');
    this.headerIcon.classList.add('is-active');
    this.bodyElement.classList.add('is-active');

    Flip.from(state, {
      duration: 0.3,
      ease: 'power1.inOut',
      onComplete: () => {
        gsap.to(this.bodyElementContent, { opacity: 1, duration: 0.3 });
        if (this.bodyElementFooter) {
          gsap.to(this.bodyElementFooter, { opacity: 1, duration: 0.3 });
        }
      },
    });
  }

  /**
   * Close the accordion
   */
  close() {
    const stateElement = Flip.getState(this.element);
    const stateBody = Flip.getState(this.bodyElement);

    gsap.to(this.bodyElementContent, {
      opacity: 0,
      duration: 0.3,
    });

    if (this.bodyElementFooter) {
      gsap.to(this.bodyElementFooter, {
        opacity: 0,
        duration: 0.3,
      });
    }

    this.element.classList.remove('is-active');
    this.headerIcon.classList.remove('is-active');
    this.bodyElement.classList.remove('is-active');

    Flip.from(stateBody, {
      duration: 0.3,
      ease: 'power1.inOut',
    });
    Flip.from(stateElement, {
      duration: 0.3,
      ease: 'power1.inOut',
    });
  }

  /**
   * Close all accordions
   */
  async closeAllAccordions() {
    Array.from(document.querySelectorAll(`[data-family="${this.element.dataset.family}"]`))
      .filter((el) => el !== this.element)
      .forEach((element: Element) => {
        gsap.to(element.querySelector('.accordion-item-body-content'), {
          opacity: 0,
          duration: 0.3,
        });

        if (this.bodyElementFooter) {
          gsap.to(element.querySelector('.accordion-item-body-footer'), {
            opacity: 0,
            duration: 0.3,
          });
        }

        const stateElement = Flip.getState(element);
        const bodyElement = element.querySelector('.accordion-item-body');
        const stateBodyElement = Flip.getState(bodyElement);
        const iconElement = element.querySelector('.accordion-item-icon');

        element.classList.remove('is-active');
        if (bodyElement) {
          bodyElement.classList.remove('is-active');
        }
        if (iconElement) {
          iconElement.classList.remove('is-active');
        }

        Flip.from(stateBodyElement, {
          duration: 0.3,
          ease: 'power1.inOut',
        });
        Flip.from(stateElement, {
          duration: 0.3,
          ease: 'power1.inOut',
        });
      });
  }
}
