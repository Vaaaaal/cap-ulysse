import gsap from 'gsap';

/**
 * Class representing a button element
 */
export class Button {
  element: HTMLButtonElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clipElement: any;

  /**
   * Constructor
   * @param element The button element
   * @param clipElement The clip element
   */
  constructor(element: HTMLButtonElement) {
    this.element = element;
    this.clipElement = this.element.querySelector('.button_circle');
  }

  /**
   * Add hover effect to the button
   */
  isHover() {
    gsap.to(this.clipElement, {
      clipPath: 'circle(130% at bottom center)',
      duration: 0.4,
      ease: 'power2.out',
    });
  }

  /**
   * Remove hover effect to the button
   */
  isNotHover() {
    gsap.to(this.clipElement, { clipPath: 'circle(0% at bottom center)', duration: 0.35 });
  }
}
