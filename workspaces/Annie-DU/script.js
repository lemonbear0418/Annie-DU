document.addEventListener('DOMContentLoaded', function () {
  const boxes = document.querySelectorAll('.design1');
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

  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {
    const summary = dropdown.querySelector('summary');
    const options = dropdown.querySelectorAll('.dropdown-option');

    summary.addEventListener('click', () => {
      dropdowns.forEach(other => {
        if (other !== dropdown) {
          other.removeAttribute('open');
        }
      });
    });

    options.forEach(option => {
      option.addEventListener('click', () => {
        dropdown.removeAttribute('open');
      });
    });
  });

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
    // Skip .h link as it has its own handler
    if (link.classList.contains('h')) return;
    
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href')?.slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target && target.tagName.toLowerCase() === 'details') {
        dropdowns.forEach(other => {
          if (other !== target) {
            other.removeAttribute('open');
          }
        });
        target.setAttribute('open', '');
      }
    });
  });
});
