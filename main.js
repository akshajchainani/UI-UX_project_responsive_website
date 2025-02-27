const nav = document.querySelector("nav");
const mobileNav = document.querySelector("nav.mobile-nav");
const menuIcon = document.querySelector(".menu-icon");
const closeIcon = document.querySelector(".mobile-menu-container .close-icon");
const mobileMenuContainer = document.querySelector(".mobile-menu-container");

// Function to check if the device is in mobile view
function isMobileView() {
  return window.matchMedia("(max-width: 800px)").matches;
}

// Add scroll event listener for nav and mobile nav
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 60) {
    nav.classList.add("scrolled");
    mobileNav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
    mobileNav.classList.remove("scrolled");
  }
});

// Toggle mobile menu
menuIcon.addEventListener("click", () => {
  if (isMobileView()) {
    mobileMenuContainer.classList.add("active");
  }
});

// Close mobile menu
closeIcon.addEventListener("click", () => {
  mobileMenuContainer.classList.remove("active");
});

// Login functionality
const loginButton = document.getElementById("loginButton");
const loginSlideContainer = document.getElementById("loginSlideContainer");
const closeLoginIcon = document.querySelector(".login-slide-container .close-icon");

loginButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default link behavior

  // Only open the login slide container if the device is in mobile view
  if (isMobileView()) {
    loginSlideContainer.classList.add("active");
  } else {
    alert("Please use a mobile device to access the login page.");
  }
});

// Close login slide container
closeLoginIcon.addEventListener("click", function () {
  loginSlideContainer.classList.remove("active");
});

// Optional: Close login slide container when clicking outside of it
loginSlideContainer.addEventListener("click", function (event) {
  if (event.target === loginSlideContainer) {
    loginSlideContainer.classList.remove("active");
  }
});