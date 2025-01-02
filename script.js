window.addEventListener("DOMContentLoaded", function () {
  const gallery = document.getElementById('gallery');

  // Check if there are any images/videos stored in localStorage
  const storedFiles = JSON.parse(localStorage.getItem('galleryFiles')) || [];
  // Display stored files when the page loads
  storedFiles.forEach((file, index) => {
    const element = file.type.startsWith('video') 
      ? `<div class="gallery-item" data-index="${index}">
           <video src="${file.url}" controls style="opacity: 1; transform: scale(1);"></video>
           <button class="remove-btn">Remove</button>
         </div>`
      : `<div class="gallery-item" data-index="${index}">
           <img src="${file.url}" alt="Uploaded file" style="opacity: 1; transform: scale(1);">
           <button class="remove-btn">Remove</button>
         </div>`;
    gallery.innerHTML += element;
  });

  // Remove item from gallery and localStorage
  gallery.addEventListener('click', function (e) {
    if (e.target.classList.contains('remove-btn')) {
      const item = e.target.closest('.gallery-item');
      const index = item.getAttribute('data-index'); // Get the index of the file

      // Remove the file from the gallery
      item.remove();

      // Remove the file from the localStorage array
      storedFiles.splice(index, 1);

      // Update localStorage with the new array
      localStorage.setItem('galleryFiles', JSON.stringify(storedFiles));
    }
  });

  // Gallery Upload Functionality
  const uploadForm = document.getElementById('upload-form');
  const fileInput = document.getElementById('file-input');

  if (uploadForm && fileInput && gallery) {
    uploadForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent form from refreshing the page
      const file = fileInput.files[0];

      if (!file) {
        alert("Please select a file to upload.");
        return;
      }

      const url = URL.createObjectURL(file); // Temporary URL for the file
      const fileData = {
        type: file.type,
        url: url
      };

      // Add new file to the gallery
      const element = file.type.startsWith('video') 
        ? `<div class="gallery-item">
             <video src="${url}" controls style="opacity: 0; transform: scale(0.9); transition: all 0.3s ease;"></video>
             <button class="remove-btn">Remove</button>
           </div>` 
        : `<div class="gallery-item">
             <img src="${url}" alt="Uploaded file" style="opacity: 0; transform: scale(0.9); transition: all 0.3s ease;">
             <button class="remove-btn">Remove</button>
           </div>`;

      gallery.innerHTML += element; // Add the file to the gallery
      fileInput.value = ''; // Clear the file input

      // Save the file to localStorage
      storedFiles.push(fileData);
      localStorage.setItem('galleryFiles', JSON.stringify(storedFiles));

      // Trigger animation for new item
      setTimeout(() => {
        const newItem = gallery.lastElementChild;
        newItem.style.opacity = 1;
        newItem.style.transform = "scale(1)";
      }, 100);
    });
  }

  // Add animation to gallery items when they appear in the viewport (Lazy Load)
  document.addEventListener('scroll', () => {
    const galleryItems = document.querySelectorAll('#gallery img, #gallery video');
    galleryItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        item.style.opacity = 1;
        item.style.transform = 'scale(1)';
      } else {
        item.style.opacity = 0.5;
        item.style.transform = 'scale(0.9)';
      }
    });
  });

  // Apply hover effect to gallery items (Zoom in on hover)
  const applyHoverEffect = () => {
    const galleryItems = document.querySelectorAll('#gallery img, #gallery video');
    galleryItems.forEach(item => {
      item.addEventListener('mouseover', () => {
        item.style.transform = 'scale(1.1)';
        item.style.transition = 'transform 0.3s ease';
        item.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.2)';
      });
      item.addEventListener('mouseout', () => {
        item.style.transform = 'scale(1)';
        item.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      });
    });
  };

  applyHoverEffect(); // Initial call to apply hover effect
});
