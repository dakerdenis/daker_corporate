function openTab(tabName) {
    // Hide all tab contents
    var tabContents = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContents.length; i++) {
      tabContents[i].classList.remove("show");
    }
  
    // Show the selected tab content
    var selectedTab = document.getElementById(tabName);
    selectedTab.classList.add("show");
  
    // Update the style of the active tab button
    var tabButtons = document.getElementsByClassName("tab");
    for (var i = 0; i < tabButtons.length; i++) {
      tabButtons[i].classList.remove("active");
    }
    document.querySelector('.tab[data-tab="' + tabName + '"]').classList.add("active");
  }















  var modal = document.getElementById('imageModal');
  var modalImage = document.getElementById('modalImage');
  var openImages = document.getElementsByClassName('openImage');
  
  // Array to store image sources
  var imageSources = [
    "./style/imgs/seit1.png",
    "./style/imgs/seit2.png",
    // Add more image sources as needed
  ];
  
  // Loop through each image and attach a click event
  for (var i = 0; i < openImages.length; i++) {
    openImages[i].addEventListener('click', function () {
      // Find the index of the clicked image
      var index;
      for (var j = 0; j < openImages.length; j++) {
        if (openImages[j] === this) {
          index = j;
          break;
        }
      }
  
      // Set the source of the modal image based on the index
      modalImage.src = imageSources[index];
  
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Disable scrolling on the page
  
      console.log("Modal opened with image source:", modalImage.src);
    });
  }
  
  // Function to close the modal
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scrolling on the page
  
    console.log("Modal closed");
  }
  
  // Close the modal if the user clicks outside of the modal content
  window.onclick = function (event) {
    if (event.target === modal) {
      closeModal();
    }
  };
  

