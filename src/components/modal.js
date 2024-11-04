import gsap from 'gsap';

/**
 * Class representing a button element
 */
export class Modal {
  /**
   * Constructor
   * @param element The modal element
   * @param triggerElement The trigger element for modal
   * @param triggerClose The trigger element for modal
   */
  constructor(element) {
    this.element = element;
    this.modal = element.querySelector('.formations_categories-modal');
    this.modalOverlay = element.querySelector('.formations_categories-modal-overlay');
    this.triggerElement = this.element.parentElement.querySelector('[trigger-modal');
    this.triggerClose = this.element.querySelector('.close-btn');
    this.isOpen = false;

    this.triggerElement.addEventListener('click', this.toggleModal.bind(this));
    this.modalOverlay.addEventListener('click', this.toggleModal.bind(this));
  }

  /**
   * Add toggle to modal
   */
  toggleModal() {
    if (this.isOpen) {
      this.closeModal();
    } else {
      this.openModal();
    }
  }

  /**
   * Open the modal
   */
  openModal() {
    const tl = gsap.timeline();
    document.body.style.overflow = 'hidden';
    document.body.style.pointerEvents = 'none';
    this.modalOverlay.style.pointerEvents = 'auto';
    this.modalOverlay.style.display = 'flex';
    tl.to(this.modalOverlay, {
      duration: 0.3,
      opacity: 1,
    });
    tl.to(
      this.modal,
      {
        duration: 0.5,
        y: 0,
        onComplete: () => {
          this.isOpen = true;
          document.body.style.overflow = 'auto';
        },
      },
      '-=0.1'
    );
  }

  /**
   * Close the modal
   */
  closeModal() {
    const tl = gsap.timeline();
    document.body.style.pointerEvents = 'none';
    tl.to(this.modal, {
      duration: 0.5,
      y: '100vh',
    });
    tl.to(
      this.modalOverlay,
      {
        duration: 0.3,
        opacity: 0,
        onComplete: () => {
          document.body.style.overflow = 'auto';
          document.body.style.pointerEvents = 'auto';
          this.modalOverlay.style.pointerEvents = 'none';
          this.modalOverlay.style.display = 'flex';
          this.isOpen = false;
        },
      },
      '-=0.3'
    );
  }
}
