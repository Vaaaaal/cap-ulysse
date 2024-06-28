import gsap from 'gsap';

/**
 * Class representing the navbar menu element
 */
export class Menu {
  button: HTMLButtonElement;
  panel: HTMLButtonElement;
  state: boolean;
  dropdown: boolean;

  /**
   * Constructor
   * @param button The button element who launch the transformation
   * @param panel The panel element who will be affected by the transformation
   * @param state State variable to define if the menu is open or not
   */
  constructor(button: HTMLButtonElement, panel: HTMLButtonElement) {
    this.button = button;
    this.panel = panel;
    this.state = false;
    this.dropdown = false;
    this.init();
  }

  /**
   * Initialize the menu
   */
  init() {
    $(this.button).on('click', () => {
      this.toggleMenu();
    });

    // Add hover effect on the main menu links
    $('.navbar_link').on('mouseenter', (evt: JQuery.Event) => {
      gsap.to('.navbar_link', {
        opacity: 0.2,
        duration: 0.3,
        ease: 'power2.easeOut',
      });

      if (evt.target && !$(evt.target).hasClass('is-dropdown')) {
        this.dropdown = false;
        this.hideDropdown();
        $('.navbar_link:not(.is-dropdown)').removeClass('is-deactived');
      }
    });
    $('.navbar_link').on('mouseleave', () => {
      gsap.to('.navbar_link', {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.easeIn',
      });
    });

    // Display dropdown links on click
    $('.navbar_link.is-dropdown').on('click', () => {
      $('.navbar_link:not(.is-dropdown)').addClass('is-deactived');
      this.displayDropdown();
      this.dropdown = true;
    });

    // Add hover effect on the second menu links
    $('.navbar_link_second').on('mouseenter', () => {
      gsap.to('.navbar_link_second', {
        opacity: 0.2,
        duration: 0.3,
        ease: 'power2.easeOut',
      });
    });
    $('.navbar_link_second').on('mouseleave', () => {
      gsap.to('.navbar_link_second', {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.easeIn',
      });
    });
  }

  /**
   * Toggle the menu
   */
  toggleMenu() {
    if (this.state) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  /**
   * Open the menu
   */
  openMenu() {
    $('body').css('overflow', 'hidden');
    $(this.button).css('pointer-events', 'none');
    $(this.panel).find('.navbar_panel_overlay').css('display', 'block');
    gsap.set($(this.panel).find('.navbar_link div'), { yPercent: 130 });
    const tl = gsap.timeline();

    gsap.to($(this.button).find('.button_text'), {
      text: {
        value: 'Fermer',
        speed: 10,
        preserveSpaces: true,
      },
    });

    tl.to($(this.panel).find('.navbar_panel_overlay'), {
      opacity: 1,
      duration: 0.6,
    })
      .to(
        $(this.panel).find('.navbar_panel'),
        {
          yPercent: 100,
          duration: 0.7,
          ease: 'power2.easeOut',
        },
        '<'
      )
      .to($(this.panel).find('.navbar_link div'), {
        yPercent: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.easeOut',
        onComplete: () => {
          $(this.button).css('pointer-events', 'auto');
          this.state = true;
        },
      })
      .to(
        $(this.panel).find('.navbar_link .navbar_link_arrow'),
        {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.easeOut',
        },
        '-=0.1'
      );
  }

  /**
   * Close the menu
   */
  closeMenu() {
    $(this.button).css('pointer-events', 'none');
    const tl = gsap.timeline();

    gsap.to($(this.button).find('.button_text'), {
      text: {
        value: 'Menu',
        speed: 10,
        preserveSpaces: true,
      },
    });

    tl.to($(this.panel).find('.navbar_link .navbar_link_arrow'), {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.easeInOut',
    })
      .to($(this.panel).find('.navbar_link div'), {
        yPercent: 130,
        duration: 0.5,
        ease: 'power2.easeInOut',
      })

      .to($(this.panel).find('.navbar_panel_overlay'), {
        opacity: 0,
        duration: 0.6,
      })
      .to(
        $(this.panel).find('.navbar_panel'),
        {
          yPercent: 0,
          duration: 0.6,
          ease: 'power2.easeIn',
          onComplete: () => {
            $('body').css('overflow', 'auto');
            $(this.panel).find('.navbar_panel_overlay').css('display', 'none');
            $(this.button).css('pointer-events', 'auto');
            this.state = false;
          },
        },
        '<'
      );
  }

  /**
   * Display the dropdown
   */
  displayDropdown() {
    gsap.set('.navbar_link_list_second', { display: 'flex' });
    gsap.to('.navbar_link_second', {
      opacity: 1,
      duration: 0.3,
      stagger: {
        amount: 0.1,
      },
      ease: 'power2.easeOut',
    });
  }

  /**
   * Hide the dropdown
   */
  hideDropdown() {
    gsap.to('.navbar_link_second', {
      opacity: 0,
      stagger: {
        amount: 0.1,
        from: 'end',
      },
      duration: 0.3,
      ease: 'power2.easeIn',
      onComplete: () => {
        gsap.set('.navbar_link_list_second', { display: 'none' });
      },
    });
  }
}
