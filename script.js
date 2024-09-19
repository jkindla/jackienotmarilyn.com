// Smooth scroll for anchor links
$('a[href*="#"]')
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000); // Smooth scroll duration
      }
    }
  });

// Scroll event for sticky header
$(window).scroll(function() {
    var header = $(document).scrollTop();
    var headerHeight = $(".header").outerHeight();
    var firstSection = $(".main-container section:nth-of-type(1)").outerHeight();
    
    // Add or remove 'fixed' class based on scroll position
    if (header > headerHeight) {
      $(".header").addClass("fixed");
    } else {
      $(".header").removeClass("fixed");
    }
    
    // Add 'in-view' class for first section scroll
    if (header > firstSection) {
      $(".header").addClass("in-view");
    } else {
      $(".header").removeClass("in-view");
    }
});

// AJAX form submission and form reset
document.querySelector('#contact-form').addEventListener('submit', function(e) {
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

