// Smooth scroll for anchor links (jQuery present only)
if (window.jQuery) {
  $('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          event.preventDefault();
          $('html, body').animate({ scrollTop: target.offset().top }, 1000);
        }
      }
    });
}

// Scroll event for sticky header (jQuery present only)
if (window.jQuery) {
  $(window).on('scroll', function () {
    var header = $(document).scrollTop();
    var headerHeight = $(".header").outerHeight();
    var firstSection = $(".main-container section:nth-of-type(1)").outerHeight();

    if (header > headerHeight) {
      $(".header").addClass("fixed");
    } else {
      $(".header").removeClass("fixed");
    }

    if (header > firstSection) {
      $(".header").addClass("in-view");
    } else {
      $(".header").removeClass("in-view");
    }
  });
}

// AJAX form submission and form reset
(function () {
  const formEl = document.querySelector('#contact-form');
  if (!formEl) return;
  formEl.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting the default way

    const form = e.target; // Get the form
    const formData = new FormData(form); // Collect form data

    // Send the AJAX request using Fetch API
    fetch(form.action, {
      method: 'POST',
      body: formData,
    }).then(response => {
      if (response.ok) {
        alert('Your message has been sent successfully!'); // Success message
        form.reset(); // Clear the form fields
      } else {
        alert('Oops! Something went wrong. Please try again.'); // Failure message
      }
    }).catch(error => {
      alert('An error occurred. Please try again later.'); // Error handling
    });
  });
})();


// ===== Packages slider — isolated (no Bootstrap/jQuery dependencies) =====
(() => {
  const root = document.querySelector('#packages .pkg-slider');
  if (!root) return;
  const slides = Array.from(root.querySelectorAll('.pkg-slide'));
  if (!slides.length) return;

  // ensure one active
  let current = slides.findIndex(s => s.classList.contains('is-active'));
  if (current < 0) { slides[0].classList.add('is-active'); current = 0; }

  const setSlide = (i) => {
    slides[current].classList.remove('is-active');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('is-active');
  };

  const prevBtn = root.querySelector('.pkg-arrow--left');
  const nextBtn = root.querySelector('.pkg-arrow--right');
  if (prevBtn) prevBtn.addEventListener('click', () => setSlide(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => setSlide(current + 1));

  // Optional: keyboard navigation while hovering over the slider
  root.addEventListener('mouseenter', () => root.dataset.hover = '1');
  root.addEventListener('mouseleave', () => root.dataset.hover = '');
  addEventListener('keydown', (e) => {
    if (root.dataset.hover !== '1') return;
    if (e.key === 'ArrowRight') setSlide(current + 1);
    if (e.key === 'ArrowLeft') setSlide(current - 1);
  });
})();