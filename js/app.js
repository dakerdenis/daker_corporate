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








    // Function to clear previous error messages
    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach((message) => {
            message.style.display = 'none';
            message.innerText = ''; // Clear any previous messages
        });
    }

    // Function to show an error message
    function showError(inputElement, message) {
        const errorContainer = inputElement.parentElement.querySelector('.error-message');
        errorContainer.innerText = message;
        errorContainer.style.display = 'block';
    }

    // Function to validate the form
    function validateForm() {
        let isValid = true;
        clearErrors();

        const name = document.querySelector('input[placeholder="Your name"]');
        const number = document.querySelector('input[placeholder="Your number"]');
        const email = document.querySelector('input[placeholder="Your email"]');
        const contactMethod = document.querySelector('input[name="group1"]:checked');
        const consent = document.getElementById('javascript');

        // Validate name
        if (!name.value.trim()) {
            showError(name, 'Name is required.');
            isValid = false;
        }

        // Validate number
        if (!number.value.trim()) {
            showError(number, 'Number is required.');
            isValid = false;
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError(email, 'Email is required.');
            isValid = false;
        } else if (!emailPattern.test(email.value.trim())) {
            showError(email, 'Please enter a valid email address.');
            isValid = false;
        }

        // Validate contact method
        if (!contactMethod) {
            const contactMethodError = document.querySelector('.__contact__form__element__radio .error-message');
            contactMethodError.innerText = 'Please select a contact method.';
            contactMethodError.style.display = 'block';
            isValid = false;
        }

        // Validate consent checkbox
        if (!consent.checked) {
            const consentError = document.querySelector('.__contact__form__terms .error-message');
            consentError.innerText = 'You must accept the terms and conditions.';
            consentError.style.display = 'block';
            isValid = false;
        }

        return isValid;
    }

    // Function to show the success popup
    function showSuccessPopup() {
        const popup = document.getElementById('success-popup');
        popup.style.display = 'block';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 4000); // Hide after 4 seconds
    }

    // Function to send the form data using AJAX
    function sendEmail() {
        const name = document.querySelector('input[placeholder="Your name"]').value;
        const number = document.querySelector('input[placeholder="Your number"]').value;
        const email = document.querySelector('input[placeholder="Your email"]').value;
        const message = document.querySelector('textarea').value;
        const contactMethod = document.querySelector('input[name="group1"]:checked').nextElementSibling.innerText;

        // Create a FormData object
        const formData = new FormData();
        formData.append('name', name);
        formData.append('number', number);
        formData.append('email', email);
        formData.append('message', message);
        formData.append('contact_method', contactMethod);

        // Send the form data to the PHP script using fetch
        fetch('send_email.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                showSuccessPopup(); // Show the popup on success
            } else {
                alert('Failed to send the email: ' + data.message);
            }
        })
        .catch(error => {
            alert('Failed to send the email: ' + error);
        });
    }

    // Form submission handler
    document.querySelector('.__contact__container__form__form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form from submitting the traditional way

        if (validateForm()) {
            sendEmail();
        }
    });




