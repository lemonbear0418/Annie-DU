document.addEventListener('DOMContentLoaded', function () {
  const boxes = document.querySelectorAll('.gallery-section');
  if (!boxes.length) return;

  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  boxes.forEach(box => io.observe(box));

  // Handle email copy on click for .h nav-link
  const emailLink = document.querySelector('.nav-link.h');
  if (emailLink) {
    emailLink.addEventListener('click', event => {
      event.preventDefault();
      const email = 'and073939@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        alert('Email copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy email:', err);
      });
    });
  }

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.classList.contains('h')) return;
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href')?.slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Lightbox: open image in overlay when thumbnail clicked
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox?.querySelector('.lightbox-img');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');
  const lightboxPrev = lightbox?.querySelector('.lightbox-prev');
  const lightboxNext = lightbox?.querySelector('.lightbox-next');
  let currentGallery = [];
  let currentIndex = -1;

  function updateLightboxImage(index) {
    if (!lightbox || !lightboxImg || index < 0 || index >= currentGallery.length) return;
    const img = currentGallery[index];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    currentIndex = index;
  }

  function openLightbox(gallery, index) {
    if (!lightbox || !lightboxImg || !gallery || index < 0 || index >= gallery.length) return;
    currentGallery = gallery;
    updateLightboxImage(index);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImg) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    currentGallery = [];
    currentIndex = -1;
  }

  function showNextImage() {
    if (currentIndex < 0 || currentGallery.length === 0) return;
    const nextIndex = (currentIndex + 1) % currentGallery.length;
    updateLightboxImage(nextIndex);
  }

  function showPrevImage() {
    if (currentIndex < 0 || currentGallery.length === 0) return;
    const prevIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    updateLightboxImage(prevIndex);
  }

  document.querySelectorAll('.image-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const parentSection = btn.closest('.gallery-section');
      if (!parentSection) return;
      const gallery = Array.from(parentSection.querySelectorAll('.image-button img'));
      const img = btn.querySelector('img');
      const index = gallery.indexOf(img);
      openLightbox(gallery, index);
    });
  });

  // close handlers
  lightbox?.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
  lightboxClose?.addEventListener('click', closeLightbox);
  lightboxPrev?.addEventListener('click', showPrevImage);
  lightboxNext?.addEventListener('click', showNextImage);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'ArrowLeft') showPrevImage();
  });
});
