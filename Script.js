// Navbar Toggle
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('show-menu');
  navToggle.classList.toggle('animate-toggle');
});

// Style Switcher
const styleSwitcher = document.getElementById('style-switcher');
const switcherToggle = document.getElementById('switcher-toggle');
const switcherClose = document.getElementById('switcher-close');

switcherToggle.addEventListener('click', () => {
  styleSwitcher.classList.add('show-switcher');
});

switcherClose.addEventListener('click', () => {
  styleSwitcher.classList.remove('show-switcher');
});

// Theme Colors
// 🎨 Persistent Color Switcher
const colors = document.querySelectorAll('.style-switcher-color');

// ✅ Load saved color from localStorage OR set default
const savedColor = localStorage.getItem('selected-color');
if (savedColor) {
  document.documentElement.style.setProperty('--hue', savedColor);

  // Mark saved color as active
  colors.forEach(c => {
    const hue = c.style.getPropertyValue('--hue');
    if (hue === savedColor) {
      c.classList.add('active-color');
    } else {
      c.classList.remove('active-color');
    }
  });
}



// ✅ Handle color change
colors.forEach(color => {
  color.addEventListener('click', () => {
    const activeColor = color.style.getPropertyValue('--hue');

    // Remove active class from all colors
    colors.forEach(c => c.classList.remove('active-color'));

    // Add active class to selected color
    color.classList.add('active-color');

    // Apply selected color to root
    document.documentElement.style.setProperty('--hue', activeColor);

    // Save selected color in localStorage
    localStorage.setItem('selected-color', activeColor);
  });
});


// Theme Mode
// Theme Switcher with Persistent Mode
const themeInputs = document.querySelectorAll('input[name=body-theme]');

// Load theme from localStorage OR set default
let currentTheme = localStorage.getItem('selected-theme') || 'Light';
document.documentElement.className = currentTheme; // <- Apply to <html>

// Update radio buttons based on saved theme
themeInputs.forEach(input => {
  if (input.value === currentTheme) {
    input.checked = true;
  }

  // Listen for theme changes
  input.addEventListener('change', () => {
    currentTheme = input.value;

    // Apply theme to <html>
    document.documentElement.className = currentTheme;

    // Save theme in localStorage
    localStorage.setItem('selected-theme', currentTheme);
  });
});


// Swipers
var servicesSwiper = new Swiper(".services-swiper", {
  spaceBetween: 32,
  pagination: { el: ".swiper-pagination", clickable: true },
  breakpoints: { 768: { slidesPerView: 2 }, 1208: { slidesPerView: 3 } }
});

var testimonialsSwiper = new Swiper(".testimonials-swiper", {
  spaceBetween: 32,
  pagination: { el: ".swiper-pagination", clickable: true },
  breakpoints: { 768: { slidesPerView: 2 }, 1208: { slidesPerView: 3 } }
});

// MixItUp Filter
var mixer = mixitup('.work-container', {
  selectors: { target: '.mix' },
  animation: { duration: 300 }
});

// Work Items Active State
const linkWork = document.querySelectorAll('.work-item');
linkWork.forEach(a => a.addEventListener('click', function () {
  linkWork.forEach(item => item.classList.remove('active-work'));
  this.classList.add('active-work');
}));

// Accordion
const accordionItems = document.querySelectorAll('.resume-item');
accordionItems.forEach(item => {
  const header = item.querySelector('.resume-header');
  const content = item.querySelector('.resume-content');
  const icon = item.querySelector('.resume-icon i');

  header.addEventListener('click', () => {
    const isOpen = item.classList.toggle('accordion-open');
    content.style.height = isOpen ? content.scrollHeight + 'px' : '0';
    icon.className = isOpen ? 'ri-subtract-line' : 'ri-add-line';

    accordionItems.forEach(other => {
      if (other !== item && other.classList.contains('accordion-open')) {
        other.querySelector('.resume-content').style.height = '0';
        other.querySelector('.resume-icon i').className = "ri-add-line";
        other.classList.remove('accordion-open');
      }
    });
  });
});

// Contact Form
const contactForm = document.getElementById('contact-form');
const contactName = document.getElementById('contact-name');
const contactEmail = document.getElementById('contact-email');
const contactSubject = document.getElementById('contact-subject');
const contactMessage = document.getElementById('contact-message');
const message = document.getElementById('message');

const sendEmail = (e) => {
  e.preventDefault();
  if (!contactName.value || !contactEmail.value || !contactSubject.value || !contactMessage.value) {
    message.classList.add('color-red');
    message.textContent = 'Write all the input fields';
    setTimeout(() => message.textContent = '', 3000);
  } else {
    emailjs.sendForm('service_gscs4mu', 'template_0qavcty', '#contact-form', '8cyyjJWb9a_gZ1uqL').then(() => {
      message.classList.add('color-first');
      message.textContent = 'Message sent ✔️';
      setTimeout(() => message.textContent = '', 5000);
    }).catch(error => {
      console.error('EmailJS Error:', error);
      alert('Oops! Something went wrong ❌');
    });
    contactName.value = '';
    contactEmail.value = '';
    contactSubject.value = '';
    contactMessage.value = '';
  }
};

contactForm.addEventListener('submit', sendEmail);

// Sticky Header
const scrollHeader = () => {
  const header = document.getElementById('header');
  window.scrollY >= 20 ? header.classList.add('bg-header') : header.classList.remove('bg-header');
};
window.addEventListener('scroll', scrollHeader);

// Active Nav Link
const navLink = document.querySelectorAll('.nav-link');
const navAction = () => {
  navToggle.classList.remove('animate-toggle');
  navMenu.classList.remove('show-menu');
};
navLink.forEach(n => n.addEventListener('click', navAction));

// Scroll Active Sections
const sections = document.querySelectorAll('section[id]');
const scrollActive = () => {
  const scrollY = window.pageYOffset;
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 80;
    const sectionId = current.getAttribute('id');
    const sectionClass = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionClass.classList.add('active-link');
    } else {
      sectionClass.classList.remove('active-link');
    }
  });
};
window.addEventListener('scroll', scrollActive);
window.addEventListener('load', scrollActive);

// Typing Effect
document.addEventListener("DOMContentLoaded", () => {
  const job = document.querySelector(".home-job");
  if (!job) return;
  setTimeout(() => job.classList.add("typing-done"), 5000);
});


// Modal Image Gallery / Slider
const showMoreButtons = document.querySelectorAll('.show-more');
const modal = document.getElementById('imageModal');
const modalSlides = document.getElementById('modalSlides');
const closeBtn = document.querySelector('.close');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentGallery = [];
let currentIndex = 0;
let autoPlayInterval = null;

// Open Modal with Slider
showMoreButtons.forEach(button => {
  button.addEventListener('click', () => {
    const galleryData = button.getAttribute('data-gallery');
    currentGallery = galleryData.split(',').map(src => src.trim());

    // Clear previous slides
    modalSlides.innerHTML = '';

    // Create images dynamically
    currentGallery.forEach((imgSrc) => {
      const img = document.createElement('img');
      img.src = imgSrc;
      modalSlides.appendChild(img);
    });

    currentIndex = 0;
    modal.style.display = "block";
    updateSlider();
    startAutoPlay();
  });
});

// Update slider position
function updateSlider() {
  modalSlides.style.transform = `translateX(${-currentIndex * 100}%)`;
}

// Next / Previous Image
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % currentGallery.length;
  updateSlider();
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  updateSlider();
});

// Autoplay Images
function startAutoPlay() {
  stopAutoPlay();
  autoPlayInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    updateSlider();
  }, 3000);
}

// Stop autoplay
function stopAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
}

// Close Modal
closeBtn.onclick = () => {
  modal.style.display = "none";
  stopAutoPlay();
};

// Close Modal on outside click
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    stopAutoPlay();
  }
};






const texts = [
  "3D Modeler",
  "3D Visualizer",
  "Interior & Exterior Designer",
  "3D Animator"
];



let count = 0;
let index = 0;
let isDeleting = false;
const changingText = document.getElementById("changing-text");

function typeEffect() {
  const current = texts[count];
  const speed = isDeleting ? 60 : 120; // Smooth speed

  changingText.textContent = current.substring(0, index);

  if (!isDeleting && index < current.length) {
    index++;
    setTimeout(typeEffect, speed);
  }
  else if (isDeleting && index > 0) {
    index--;
    setTimeout(typeEffect, speed / 1.5);
  }
  else if (!isDeleting && index === current.length) {
    // Pause before deleting
    setTimeout(() => {
      isDeleting = true;
      typeEffect();
    }, 1500);
  }
  else if (isDeleting && index === 0) {
    // Move to next word
    isDeleting = false;
    count = (count + 1) % texts.length;
    setTimeout(typeEffect, 300);
  }
}

typeEffect();









 const counters = document.querySelectorAll('.home-data-no');

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    let count = 0;

    const speed = 50; // smaller = faster

    const updateCount = () => {
      const increment = Math.ceil(target / speed);

      if (count < target) {
        count += increment;
        counter.innerText = count > target ? target : count;
        setTimeout(updateCount, 150);
      } else {
        counter.innerText = target;
      }
    };

    updateCount();
  });