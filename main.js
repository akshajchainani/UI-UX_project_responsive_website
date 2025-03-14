// Selectors
const nav = document.querySelector("nav");
const mobileNav = document.querySelector("nav.mobile-nav");
const menuIcon = document.querySelector(".menu-icon");
const closeIcon = document.querySelector(".mobile-menu-container .close-icon");
const mobileMenuContainer = document.querySelector(".mobile-menu-container");
const loginButton = document.getElementById("loginButton");
const loginSlideContainer = document.getElementById("loginSlideContainer");
const signupSlideContainer = document.getElementById("signupSlideContainer");
const closeLoginIcon = document.querySelector(".login-slide-container .close-icon");
const closeSignupIcon = document.querySelector(".signup-slide-container .close-icon");
const showSignupLink = document.getElementById("showSignup");
const showLoginLink = document.getElementById("showLogin");

// Helper Functions
function isMobileView() {
  return window.matchMedia("(max-width: 800px)").matches;
}

function toggleClass(element, className) {
  if (element) {
    element.classList.toggle(className);
  }
}

function addClass(element, className) {
  if (element) {
    element.classList.add(className);
  }
}

function removeClass(element, className) {
  if (element) {
    element.classList.remove(className);
  }
}

function closeAllModals() {
  removeClass(mobileMenuContainer, "active");
  removeClass(loginSlideContainer, "active");
  removeClass(signupSlideContainer, "active");
}

// Scroll Event Listener
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 60) {
    addClass(nav, "scrolled");
    addClass(mobileNav, "scrolled");
  } else {
    removeClass(nav, "scrolled");
    removeClass(mobileNav, "scrolled");
  }
});

// Mobile Menu Toggle
if (menuIcon) {
  menuIcon.addEventListener("click", () => {
    if (isMobileView()) {
      addClass(mobileMenuContainer, "active");
    }
  });
}

// Close Mobile Menu
if (closeIcon) {
  closeIcon.addEventListener("click", () => {
    removeClass(mobileMenuContainer, "active");
  });
}

// Login Functionality
if (loginButton) {
  loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (isMobileView()) {
      addClass(loginSlideContainer, "active");
    } else {
      alert("Please use a mobile device to access the login page.");
    }
  });
}

// Close Login Slide Container
if (closeLoginIcon) {
  closeLoginIcon.addEventListener("click", () => {
    removeClass(loginSlideContainer, "active");
  });
}

// Close Login Slide Container When Clicking Outside
if (loginSlideContainer) {
  loginSlideContainer.addEventListener("click", (event) => {
    if (event.target === loginSlideContainer) {
      removeClass(loginSlideContainer, "active");
    }
  });
}

// Signup Functionality
if (showSignupLink) {
  showSignupLink.addEventListener("click", (event) => {
    event.preventDefault();
    removeClass(loginSlideContainer, "active");
    addClass(signupSlideContainer, "active");
  });
}

// Close Signup Slide Container
if (closeSignupIcon) {
  closeSignupIcon.addEventListener("click", () => {
    removeClass(signupSlideContainer, "active");
  });
}

// Close Signup Slide Container When Clicking Outside
if (signupSlideContainer) {
  signupSlideContainer.addEventListener("click", (event) => {
    if (event.target === signupSlideContainer) {
      removeClass(signupSlideContainer, "active");
    }
  });
}

// Toggle Between Login and Signup
if (showLoginLink) {
  showLoginLink.addEventListener("click", (event) => {
    event.preventDefault();
    removeClass(signupSlideContainer, "active");
    addClass(loginSlideContainer, "active");
  });
}

// Optional: Close All Modals on Escape Key Press
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAllModals();
  }
});