import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let initialized = false;

export function initGsap() {
  if (initialized) return;
  initialized = true;

  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.config({
    limitCallbacks: true,
    ignoreMobileResize: true,
  });

  ScrollTrigger.defaults({
    toggleActions: 'play none none none',
  });
}

export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}
