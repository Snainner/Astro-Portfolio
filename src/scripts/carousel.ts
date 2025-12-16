// src/scripts/carousel.ts
import EmblaCarousel from 'embla-carousel';
import type  { EmblaCarouselType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';
import AutoHeight from 'embla-carousel-auto-height';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

let lightboxInstance: PhotoSwipeLightbox | null = null;
const carouselInstances = new Map<HTMLElement, EmblaCarouselType>();

function initCarousels() {
  console.log("init carousel");
  
  document.querySelectorAll<HTMLElement>('.embla').forEach(container => {
    if (container.dataset.initialized === 'true') return;
    container.dataset.initialized = 'true';

    const loop = container.dataset.loop === 'true';
    const autoplay = container.dataset.autoplay === 'true';
    const delay = parseInt(container.dataset.delay || '3000') || 3000;

    // Build plugins array with AutoHeight always included
    const plugins = [AutoHeight()];
    if (autoplay) {
      plugins.push(Autoplay({ delay, stopOnInteraction: true }));
    }
    
    const viewport = container.querySelector<HTMLElement>('.embla__viewport');
    if (!viewport) return;
    
    const embla = EmblaCarousel(viewport, { loop }, plugins);
    
    // Store the instance for later reference
    carouselInstances.set(container, embla);
    
    const prev = container.querySelector<HTMLButtonElement>('.embla__btn--prev');
    const next = container.querySelector<HTMLButtonElement>('.embla__btn--next');
    const dotsContainer = container.querySelector<HTMLElement>('.embla__dots');
    
    prev?.addEventListener('click', () => embla.scrollPrev());
    next?.addEventListener('click', () => embla.scrollNext());
    
    const dots = embla.slideNodes().map((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'embla__dot';
      dot.onclick = () => embla.scrollTo(i);
      dotsContainer?.appendChild(dot);
      return dot;
    });
    
    const updateUI = () => {
      const selected = embla.selectedScrollSnap();
      dots.forEach((d, i) => d.classList.toggle('embla__dot--selected', i === selected));
      if (prev) prev.disabled = !embla.canScrollPrev();
      if (next) next.disabled = !embla.canScrollNext();
    };
    
    embla.on('select', updateUI);
    embla.on('init', updateUI);
    
    // Wait for all images/videos to load before initializing height
    const mediaElements = container.querySelectorAll<HTMLImageElement | HTMLVideoElement>('img, video');
    let loadedCount = 0;
    const totalMedia = mediaElements.length;
    
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === totalMedia) {
        embla.reInit();
        console.log('All media loaded, reInit called');
      }
    };
    
    mediaElements.forEach(media => {
      if (media.tagName === 'IMG') {
        const img = media as HTMLImageElement;
        if (img.complete && img.naturalHeight !== 0) {
          checkAllLoaded();
        } else {
          img.addEventListener('load', checkAllLoaded);
          img.addEventListener('error', checkAllLoaded);
        }
      } else if (media.tagName === 'VIDEO') {
        const video = media as HTMLVideoElement;
        // Force load the video metadata
        video.load();
        if (video.readyState >= 1) { // HAVE_METADATA
          checkAllLoaded();
        } else {
          video.addEventListener('loadedmetadata', checkAllLoaded);
          video.addEventListener('error', checkAllLoaded);
          // Fallback timeout for stubborn videos
          setTimeout(checkAllLoaded, 1000);
        }
      }
    });
    
    // Fallback if no media elements
    if (totalMedia === 0) {
      embla.reInit();
    }
  });

  // Destroy old lightbox instance
  if (lightboxInstance) {
    lightboxInstance.destroy();
    console.log("Destroying lightbox instance");
  }

  // Create new PhotoSwipe instance
  lightboxInstance = new PhotoSwipeLightbox({
    gallery: '.embla',
    children: '.embla__clickable',
    pswpModule: () => import('photoswipe'),
    imageClickAction: 'close',
    tapAction: 'close',
    bgOpacity: 0.95,
  });
  
  // Fix z-index and prevent carousel interference
  lightboxInstance.on('beforeOpen', () => {
    // Disable AutoHeight temporarily to prevent layout shifts
    carouselInstances.forEach(embla => {
      const container = embla.rootNode().parentElement;
      if (container instanceof HTMLElement) {
        container.style.pointerEvents = 'none';
      }
    });
  });
  
  lightboxInstance.on('afterInit', () => {
    // Ensure PhotoSwipe is on top
    const pswp = document.querySelector<HTMLElement>('.pswp');
    if (pswp) {
      pswp.style.zIndex = '99999';
    }
  });
  
  lightboxInstance.on('close', () => {
    // Re-enable carousel interaction
    carouselInstances.forEach(embla => {
      const container = embla.rootNode().parentElement;
      if (container instanceof HTMLElement) {
        container.style.pointerEvents = 'auto';
      }
    });
  });
  
  lightboxInstance.init();
  console.log("Lightbox initialized");
}

// Prevent default link behavior globally
document.addEventListener('click', (e) => {
  const target = (e.target as HTMLElement)?.closest('.embla__clickable');
  if (target && target.hasAttribute('data-prevent-default')) {
    e.preventDefault();
  }
}, true);

initCarousels();

document.addEventListener('astro:page-load', () => {
  // Clear old instances
  carouselInstances.forEach(instance => instance.destroy());
  carouselInstances.clear();
  
  // Reset initialization flags
  document.querySelectorAll<HTMLElement>('.embla').forEach(container => {
    container.dataset.initialized = 'false';
  });
  
  initCarousels();
  console.log("page load event init");
});