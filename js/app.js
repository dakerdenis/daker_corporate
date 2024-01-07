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