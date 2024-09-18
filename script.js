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

// Contact form reset
document.querySelector('#contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  e.target.elements.name.value = '';
  e.target.elements.email.value = '';
  e.target.elements.message.value = '';
});


