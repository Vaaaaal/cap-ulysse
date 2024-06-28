import gsap from 'gsap';

import { getMousePositionRelativeToElement } from '$utils/utils';

/**
 * Class representing the magnetic element
 */
export class Magnetic {
  box: HTMLButtonElement;
  item: HTMLButtonElement;
  mousePosition: { x: number; y: number };

  /**
   * Constructor
   * @param box The box element who contains the effect
   * @param item The item element who will be affected by the effect
   */
  constructor(box: HTMLButtonElement, item: HTMLButtonElement) {
    this.box = box;
    this.item = item;
    this.mousePosition = { x: 0, y: 0 };
    this.init();
  }

  /**
   * Initialize the magnetic effect
   */
  init() {
    this.box.addEventListener('mousemove', (evt) => {
      this.mousePosition = getMousePositionRelativeToElement(evt);
      this.runMagneticEffect();
    });

    this.box.addEventListener('mouseleave', () => {
      gsap.to(this.item, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1.8, 0.7)',
      });
    });
  }

  /**
   * Run the magnetic effect
   */
  runMagneticEffect() {
    const { x, y } = this.mousePosition;
    const boxRect = this.box.getBoundingClientRect();

    const centerX = boxRect.left + boxRect.width / 2;
    const centerY = boxRect.top + boxRect.height / 2;

    const distanceX = x - centerX;
    const distanceY = y - centerY;

    const strength = 0.2;
    const translationX = distanceX * strength;
    const translationY = distanceY * strength;

    gsap.to(this.item, {
      x: translationX,
      y: translationY,
      duration: 0.5,
      ease: 'power2.out',
    });
  }
}
