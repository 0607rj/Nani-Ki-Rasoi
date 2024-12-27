window.addEventListener("DOMContentLoaded", function () {

    // GSAP Animation for smooth scrolling (on the current page)
    gsap.from(".hero h1", { opacity: 0, y: -50, duration: 1 });
    gsap.from(".hero p", { opacity: 0, y: 50, duration: 1, delay: 0.5 });
    gsap.from("section", { opacity: 0, duration: 1, stagger: 0.3, delay: 1 });
  
    // Smooth Scroll for Navigation (ONLY for sections on the same page)
    document.querySelectorAll("nav ul li a").forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        // Check if the link is an internal page link (like to about.html)
        if (this.getAttribute("href") !== "about.html") {
          e.preventDefault(); // Prevent default if it's scrolling within the current page
          document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth",
          });
        } else {
          // Allow normal navigation for external or page-changing links (like about.html)
          window.location.href = this.getAttribute("href");
        }
      });
    });
  
    // Simple Form Validation for Contact
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      // Form Validation (Example: Check for empty fields)
      const name = form.querySelector('input[name="name"]');
      const email = form.querySelector('input[name="email"]');
      const message = form.querySelector('textarea[name="message"]');
  
      if (name.value.trim() === "" || email.value.trim() === "" || message.value.trim() === "") {
        alert("Please fill out all fields.");
      } else {
        // Simulate successful form submission
        alert("Your message has been sent!");
        form.reset(); // Reset form fields after submission
      }
    });
  });
  