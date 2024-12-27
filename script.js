// GSAP Animation for smooth scrolling
window.addEventListener("DOMContentLoaded", function () {
    gsap.from(".hero h1", { opacity: 0, y: -50, duration: 1 });
    gsap.from(".hero p", { opacity: 0, y: 50, duration: 1, delay: 0.5 });
    gsap.from("section", { opacity: 0, duration: 1, stagger: 0.3, delay: 1 });
  
    // Image Gallery Animation
    const gallery = document.getElementById("image-gallery");
  
    // Simple image upload simulation
    function openUpload() {
      let input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*,video/*';
      input.multiple = true;
      input.click();
  
      input.onchange = function (event) {
        let files = event.target.files;
        for (let i = 0; i < files.length; i++) {
          let file = files[i];
          let reader = new FileReader();
          reader.onload = function (e) {
            let newImage = document.createElement('img');
            newImage.src = e.target.result;
            gallery.appendChild(newImage);
          };
          reader.readAsDataURL(file);
        }
      };
    }
  
    // Smooth Scroll for Navigation
    document.querySelectorAll("nav ul li a").forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  
    // Simple Form Validation for Contact
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Your message has been sent!");
    });
  });
  