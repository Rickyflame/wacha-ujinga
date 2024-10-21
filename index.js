const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const dropdownLinks = document.querySelectorAll('.nav-links > li > a');

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.querySelector('i').classList.toggle('fa-bars');
  menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Handle dropdown menus on mobile
dropdownLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    if (
      window.innerWidth <= 890 &&
      link.nextElementSibling?.classList.contains('submenu')
    ) {
      e.preventDefault();
      link.nextElementSibling.classList.toggle('show');
    }
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
    navLinks.classList.remove('active');
    menuToggle.querySelector('i').classList.remove('fa-times');
    menuToggle.querySelector('i').classList.add('fa-bars');
  }
});

// Carousel
document.addEventListener('DOMContentLoaded', function () {
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.carousel-dot');
  let currentSlide = 0;
  const interval = 5000; // Change slide every 5 seconds

  function nextSlide() {
    // Remove active class from current slide and dot
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    // Move to next slide
    currentSlide = (currentSlide + 1) % slides.length;

    // Add active class to new slide and dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  // Setup manual navigation with dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      // Remove active class from current slide and dot
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');

      // Activate clicked slide
      currentSlide = index;
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    });
  });

  // Start automatic slideshow
  let slideInterval = setInterval(nextSlide, interval);

  // Pause slideshow when hovering over the section
  const section = document.querySelector('.ergonomic-section');

  section.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });

  section.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, interval);
  });
});

// Offer section Carousel
document.addEventListener('DOMContentLoaded', function () {
  const carousel = document.querySelector('.carousel');
  const slides = carousel.querySelector('.carousel-slides');
  const dots = carousel.querySelectorAll('.dot');
  const prevButton = carousel.querySelector('.prev');
  const nextButton = carousel.querySelector('.next');
  let currentSlide = 0;
  const totalSlides = dots.length;

  function goToSlide(index) {
    currentSlide = index;
    slides.style.transform = `translateX(-${
      (100 / totalSlides) * currentSlide
    }%)`;
    dots.forEach((dot, i) =>
      dot.classList.toggle('active', i === currentSlide)
    );
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % totalSlides);
  }

  function prevSlide() {
    goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
  }

  // Event Listeners
  prevButton.addEventListener('click', prevSlide);
  nextButton.addEventListener('click', nextSlide);
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
  });

  // Optional: Auto-advance slides
  const autoAdvance = setInterval(nextSlide, 5000);

  // Pause auto-advance on hover
  carousel.addEventListener('mouseenter', () => clearInterval(autoAdvance));

  // Handle keyboard navigation
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });
});

// Modal functionality
document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('welcomeModal');
  const closeBtn = document.getElementsByClassName('close-modal')[0];

  // Show modal when page loads
  setTimeout(() => {
    modal.style.display = 'block';
  }, 1000); // Show after 1 second

  // Close modal when clicking the X
  closeBtn.onclick = function () {
    modal.style.display = 'none';
  };

  // Close modal when clicking outside
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
});

// Search data structure containing all searchable content
const searchableContent = [
  {
    title: 'Compact Laptop Desk',
    price: '10,000KES',
    description:
      'Designed for small spaces, offering adjustable height to enhance convenience and ergonomics. Ideal for home setups, portable and easy to carry around.',
    image: 'images/laptop-sits-small-table-with-laptop-it.jpg',
    url: 'rising-desks.html#compact-laptop',
  },
  {
    title: 'Full-Size Adjustable Desk',
    price: '20,000KES',
    description:
      'Perfect for both home offices and corporate environments. Features simple button-controlled height adjustment for versatility and comfort.',
    image: 'images/monitor-stand-with-angled-adjustable-base.jpg',
    url: 'rising-desks.html#full-size-adjustable',
  },
  {
    title: 'Premium Electric Standing Desk',
    price: '39,000KES',
    description:
      'Features smooth electric adjustment mechanism and built-in cable management. The ultimate choice for convenience and organization in any workspace.',
    image: 'images/office-workstation-with-standing-desk.jpg',
    url: 'rising-desks.html#premium-electric',
  },
  {
    title: 'Health Benefits',
    description:
      'Learn about the health benefits of standing desks, including improved posture, increased energy levels, and enhanced productivity.',
    url: 'health-benefits.html',
  },
  {
    title: 'Contact Us',
    description:
      'Get in touch with our team for inquiries, support, or custom orders.',
    url: 'contact-us.html',
  },
  {
    title: 'Basket Shop',
    description:
      'Offering a wide range of ergonomic, stylish, and eco-friendly standing desks to suit every workspace and lifestyle.',
    url: 'basket.html',
  },
];

// Search functionality
document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const searchResultsModal = document.getElementById('searchResultsModal');
  const searchResults = document.getElementById('searchResults');
  const closeSearchResults = searchResultsModal.querySelector('.close-modal');

  function highlightText(text, searchTerm) {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span class="search-highlight">$1</span>');
  }

  function performSearch() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (!searchTerm) return;

    const results = searchableContent.filter((item) => {
      return (
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        (item.price && item.price.toLowerCase().includes(searchTerm))
      );
    });

    displayResults(results, searchTerm);
  }

  function displayResults(results, searchTerm) {
    searchResults.innerHTML = '';

    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="no-results">
          <p>No results found for "${searchTerm}"</p>
        </div>
      `;
    } else {
      results.forEach((result) => {
        const resultElement = document.createElement('div');
        resultElement.className = 'search-result-item';
        resultElement.innerHTML = `
          ${
            result.image
              ? `
            <img src="${result.image}" alt="${result.title}" class="search-result-image">
          `
              : ''
          }
          <div class="search-result-info">
            <div class="search-result-title">${highlightText(
              result.title,
              searchTerm
            )}</div>
            ${
              result.price
                ? `<div class="search-result-price">${highlightText(
                    result.price,
                    searchTerm
                  )}</div>`
                : ''
            }
            <div class="search-result-description">${highlightText(
              result.description,
              searchTerm
            )}</div>
          </div>
        `;

        resultElement.addEventListener('click', () => {
          window.location.href = result.url;
        });

        searchResults.appendChild(resultElement);
      });
    }

    searchResultsModal.style.display = 'block';
  }

  // Event listeners
  searchButton.addEventListener('click', performSearch);

  searchInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

  closeSearchResults.addEventListener('click', () => {
    searchResultsModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === searchResultsModal) {
      searchResultsModal.style.display = 'none';
    }
  });
});
