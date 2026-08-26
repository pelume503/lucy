// Lucy Devenish site — shared page-transition behaviour
document.addEventListener('DOMContentLoaded', function () {
  // fade the page in on load
  requestAnimationFrame(function () {
    document.body.classList.add('page-visible');
  });

  // intercept internal link clicks so the page fades out (and the
  // tapped item fades faintly, via CSS :active) before navigating
  var links = document.querySelectorAll('a[href]');
  links.forEach(function (link) {
    var href = link.getAttribute('href');
    if (
      !href ||
      href.charAt(0) === '#' ||
      href.indexOf('mailto:') === 0 ||
      href.indexOf('tel:') === 0 ||
      href.indexOf('http://') === 0 ||
      href.indexOf('https://') === 0 ||
      link.target === '_blank'
    ) {
      return;
    }

    link.addEventListener('click', function (e) {
      e.preventDefault();
      document.body.classList.remove('page-visible');
      document.body.classList.add('page-leaving');
      setTimeout(function () {
        window.location.href = href;
      }, 220);
    });
  });

  // back-to-top link
  var scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    scrollTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // "load more" posts on the exhibitions listing page
  var loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function () {
      document.querySelectorAll('.exhibition-item.hidden-item').forEach(function (item) {
        item.classList.remove('hidden-item');
      });
      loadMoreBtn.classList.add('gone');

      // newly revealed links also need the fade-navigation behaviour
      document.querySelectorAll('.exhibition-item').forEach(function (link) {
        var href = link.getAttribute('href');
        if (!href || href.charAt(0) === '#') return;
        link.addEventListener('click', function (e) {
          e.preventDefault();
          document.body.classList.remove('page-visible');
          document.body.classList.add('page-leaving');
          setTimeout(function () {
            window.location.href = href;
          }, 220);
        });
      });
    });
  }

  // homepage slideshow
  var slides = document.querySelectorAll('.slideshow .slide');
  if (slides.length > 1) {
    var current = 0;
    setInterval(function () {
      slides[current].classList.remove('is-active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('is-active');
    }, 4500);
  }
});
