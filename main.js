// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkoFjZ8NzJMDtcmgYYK31-Q7-BQijCo3U",
  authDomain: "uiux-devloperrack.firebaseapp.com",
  projectId: "uiux-devloperrack",
  storageBucket: "uiux-devloperrack.appspot.com",
  messagingSenderId: "716533723534",
  appId: "1:716533723534:web:e2ad6e6c28dcb5f2ac74df",
  measurementId: "G-WKPF2TFG4S"
};

// Initialize Firebase
let auth, provider;

if (typeof firebase !== 'undefined') {
  try {
    console.log("Initializing Firebase...");
    const app = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    provider = new firebase.auth.GoogleAuthProvider();
    
    // Set custom parameters for Google Auth
    provider.setCustomParameters({
      prompt: 'select_account'
    });

    // Set persistence
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .catch((error) => {
        console.error("Error setting persistence:", error);
      });

    console.log("Firebase initialized successfully");
  } catch (error) {
    console.error("Firebase initialization error:", error);
    alert("Failed to initialize authentication service. Please refresh the page.");
  }
}

// DOM Selectors
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
const googleLoginButtons = document.querySelectorAll(".btn.social.google");
const enrolButtons = document.querySelectorAll(".enrol-now, .enrol-icon");
const learnMoreButtons = document.querySelectorAll(".desktop-btn, .mobile-btn");
const allCoursesBtn = document.querySelector(".courses-section .btn");

// DOM Selectors for Desktop Popups
const desktopLoginPopup = document.getElementById("desktopLoginPopup");
const desktopSignupPopup = document.getElementById("desktopSignupPopup");
const desktopShowSignup = document.getElementById("desktopShowSignup");
const desktopShowLogin = document.getElementById("desktopShowLogin");
const desktopCloseButtons = document.querySelectorAll(".desktop-login-popup .close-icon, .desktop-signup-popup .close-icon");
const desktopOverlays = document.querySelectorAll(".desktop-login-popup .popup-overlay, .desktop-signup-popup .popup-overlay");

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

// Enhanced Google Authentication Handler
async function handleGoogleLogin() {
  if (!auth || !provider) {
    alert("Authentication service not ready. Please refresh the page.");
    return;
  }

  try {
    console.log("Attempting Google sign-in...");
    const result = await auth.signInWithPopup(provider);
    const user = result.user;
    
    console.log("Logged in user:", user);
    closeAllModals();
    updateUIAfterLogin(user);
    window.location.href = "user-profile.html";
    
  } catch (error) {
    console.error("Google sign-in error:", error);
    let errorMessage = "Login failed. Please try again.";
    
    switch (error.code) {
      case 'auth/popup-closed-by-user':
        errorMessage = "Login popup was closed. Please try again.";
        break;
      case 'auth/cancelled-popup-request':
        return; // No alert needed
      case 'auth/network-request-failed':
        errorMessage = "Network error. Please check your internet connection.";
        break;
      case 'auth/popup-blocked':
        errorMessage = "Popup was blocked. Please allow popups for this site.";
        break;
      case 'auth/unauthorized-domain':
        errorMessage = "This domain is not authorized. Contact support.";
        break;
    }
    
    alert(errorMessage);
  }
}

// Function to handle email login/signup
function handleEmailAuth(event) {
  event.preventDefault();
  closeAllModals();
  closeDesktopPopups();
  window.location.href = "user-profile.html";
}

// Enhanced UI Update Function
function updateUIAfterLogin(user) {
  const authElements = document.querySelectorAll('.auth-state');
  const loginButtons = document.querySelectorAll('#loginButton');
  
  authElements.forEach(el => {
    if (user) {
      el.innerHTML = `
        <div class="user-profile">
          <span>Welcome, ${user.displayName || user.email}</span>
          <button class="btn logout" onclick="handleLogout()">Logout</button>
        </div>
      `;
      el.style.display = 'block';
    } else {
      el.innerHTML = '';
      el.style.display = 'none';
    }
  });

  loginButtons.forEach(btn => {
    btn.style.display = user ? 'none' : 'block';
  });
}

// Logout Function
function handleLogout() {
  if (auth) {
    auth.signOut()
      .then(() => {
        updateUIAfterLogin(null);
      })
      .catch((error) => {
        console.error("Logout error:", error);
        alert("Logout failed. Please try again.");
      });
  }
}

// Function to close desktop popups
function closeDesktopPopups() {
  desktopLoginPopup.classList.remove("active");
  desktopSignupPopup.classList.remove("active");
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
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
        desktopLoginPopup.classList.add("active");
      }
    });
  }

  // Google Login Buttons (multiple)
  if (googleLoginButtons) {
    googleLoginButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        handleGoogleLogin();
      });
    });
  }

  // Email Login/Signup Buttons
  document.querySelectorAll('.login-box form button[type="submit"], .signup-box form button[type="submit"]').forEach(button => {
    button.addEventListener("click", handleEmailAuth);
  });

  // Enrol Buttons
  if (enrolButtons) {
    enrolButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (isMobileView()) {
          addClass(signupSlideContainer, "active");
        } else {
          desktopSignupPopup.classList.add("active");
        }
      });
    });
  }

  // Learn More Buttons
  if (learnMoreButtons) {
    learnMoreButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const featuresSection = document.querySelector(".features");
        if (featuresSection) {
          featuresSection.scrollIntoView({
            behavior: "smooth"
          });
        }
      });
    });
  }

  // All Courses Button
  if (allCoursesBtn) {
    allCoursesBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "courses.html";
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

  // Close All Modals on Escape Key Press
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllModals();
    }
  });

  // Auth State Listener
  if (auth) {
    auth.onAuthStateChanged((user) => {
      updateUIAfterLogin(user);
    });
  }

  // Desktop close buttons
  desktopCloseButtons.forEach(button => {
    button.addEventListener("click", closeDesktopPopups);
  });

  // Desktop overlays
  desktopOverlays.forEach(overlay => {
    overlay.addEventListener("click", closeDesktopPopups);
  });

  // Desktop signup link in login popup
  if (desktopShowSignup) {
    desktopShowSignup.addEventListener("click", (e) => {
      e.preventDefault();
      desktopLoginPopup.classList.remove("active");
      desktopSignupPopup.classList.add("active");
    });
  }

  // Desktop login link in signup popup
  if (desktopShowLogin) {
    desktopShowLogin.addEventListener("click", (e) => {
      e.preventDefault();
      desktopSignupPopup.classList.remove("active");
      desktopLoginPopup.classList.add("active");
    });
  }

  // Close desktop popups on escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeDesktopPopups();
    }
  });
});