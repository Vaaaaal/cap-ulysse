import gsap from 'gsap';

export function pageTransition(destination) {
  gsap.set('.page-transition_wrapper', { display: 'flex' });

  const tl = gsap.timeline();
  tl.to('.page-transition_shape', {
    scale: 3,
    duration: 1.4,
    stagger: 0.4,
    ease: 'power2.inOut',
    transformOrigin: 'center',
    onComplete: () => {
      window.location = destination;
    },
  });
}
