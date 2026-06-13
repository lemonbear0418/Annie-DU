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
});
