window.addEventListener("DOMContentLoaded", function () {

  // GSAP Animation for smooth scrolling (on the current page)
  gsap.from(".hero h1", { opacity: 0, y: -50, duration: 1 });
  gsap.from(".hero p", { opacity: 0, y: 50, duration: 1, delay: 0.5 });
  gsap.from("section", { opacity: 0, duration: 1, stagger: 0.3, delay: 1 });

  // No navigation prevention, so links will work as expected
  document.querySelectorAll("nav ul li a").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      // No e.preventDefault() here, so navigation happens normally
      console.log("Navigating to:", this.getAttribute("href"));
    });
  });

  // Smooth scroll for internal links (without preventing any navigation)
  document.querySelectorAll("nav ul li a").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      // Check if the link is an internal anchor (same-page navigation)
      if (this.hash !== "") {
        e.preventDefault(); // Prevent default action (navigation) for anchors only
        const targetElement = document.querySelector(this.hash);
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // No prevention for form submission, so form will submit normally
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      // No e.preventDefault() here, so form submits and page reloads
      console.log("Form submitted.");
    });
  }
});
