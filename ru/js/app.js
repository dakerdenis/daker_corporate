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













  function openModal(imageSrc) {
    document.getElementById('modal-image').src = imageSrc;
    document.getElementById('modal').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

window.onclick = function (event) {
    var modal = document.getElementById('modal');
    if (event.target == modal) {
        closeModal();
    }
};










document.addEventListener('DOMContentLoaded', function () {
  const burgerIcon = document.querySelector('.header__circle__burger');
  const expandedBlockContainer = document.getElementById('expandedBlockContainer');

  // Function to toggle the block (open/close)
  function toggleBlock() {
      if (expandedBlockContainer.style.width === '300px') {
          collapseBlock();
      } else {
          expandBlock();
      }
  }

  // Function to expand the block
  function expandBlock() {
      expandedBlockContainer.style.width = '300px';
  }

  // Function to collapse the block
  function collapseBlock() {
      expandedBlockContainer.style.width = '0';
  }

  // Function to handle smooth scrolling to the target section
  function scrollToSection(target) {
      const section = document.getElementById(target);

      if (section) {
          const offset = 20; // Set your desired offset value
          const scrollPosition = section.offsetTop - offset;

          window.scrollTo({
              top: scrollPosition,
              behavior: 'smooth'
          });
      }
  }

  // Click event listener on the document
  document.addEventListener('click', function (event) {
      // Check if the clicked element is the burger icon or its child image
      if (event.target === burgerIcon || burgerIcon.contains(event.target)) {
          toggleBlock(); // Toggle the block (open/close)
      } else {
          // Check if the clicked element is a link inside the expanded block
          const targetSection = event.target.getAttribute('data-target');
          if (targetSection) {
              scrollToSection(targetSection);
              collapseBlock(); // Collapse the block after clicking a link
          }
      }
  });
});
