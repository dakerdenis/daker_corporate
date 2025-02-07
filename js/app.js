// Cache reusable DOM elements
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const burgerIcon = document.querySelector('.header__circle__burger');
const expandedBlockContainer = document.getElementById('expandedBlockContainer');
const form = document.querySelector('.__contact__container__form__form');

// Tabs functionality
function openTab(tabName) {
  const tabContents = document.querySelectorAll(".tab-content");
  const tabButtons = document.querySelectorAll(".tab");

  // Hide all tab contents
  tabContents.forEach(tab => tab.classList.remove("show"));

  // Show the selected tab content
  document.getElementById(tabName).classList.add("show");

  // Update the style of the active tab button
  tabButtons.forEach(tab => tab.classList.remove("active"));
  document.querySelector(`.tab[data-tab="${tabName}"]`).classList.add("active");
}

// Modal functionality
function openModal(imageSrc) {
  modalImage.src = imageSrc;
  modal.classList.add('visible');
  document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeModal() {
  modal.classList.remove('visible');
  document.body.style.overflow = 'auto'; // Restore scrolling
}

window.addEventListener('click', function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

// Burger menu toggle
function toggleBlock() {
  if (expandedBlockContainer.style.width === '300px') {
    collapseBlock();
  } else {
    expandBlock();
  }
}

function expandBlock() {
  expandedBlockContainer.style.width = '300px';
}

function collapseBlock() {
  expandedBlockContainer.style.width = '0';
}

// Smooth scrolling to sections
function scrollToSection(target) {
  const section = document.getElementById(target);
  if (section) {
    const offset = 20; // Customize offset
    const scrollPosition = section.offsetTop - offset;
    window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
  }
}

// Event listeners
document.addEventListener('click', function (event) {
  if (event.target === burgerIcon || burgerIcon.contains(event.target)) {
    toggleBlock();
  } else {
    const targetSection = event.target.getAttribute('data-target');
    if (targetSection) {
      scrollToSection(targetSection);
      collapseBlock();
    }
  }
});

// Form validation
function clearErrors() {
  const errorMessages = document.querySelectorAll('.error-message');
  errorMessages.forEach(message => {
    message.style.display = 'none';
    message.innerText = '';
  });
}

function showError(inputElement, message) {
  const errorContainer = inputElement.parentElement.querySelector('.error-message');
  if (errorContainer) {
    errorContainer.innerText = message;
    errorContainer.style.display = 'block';
    errorContainer.setAttribute('role', 'alert'); // Accessibility improvement
  }
}

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

// Success popup
function showSuccessPopup() {
  const popup = document.getElementById('success-popup');
  popup.classList.add('visible');
  setTimeout(() => {
    popup.classList.remove('visible');
  }, 4000);
}

// AJAX form submission
async function sendEmail() {
  const name = document.querySelector('input[placeholder="Your name"]').value;
  const number = document.querySelector('input[placeholder="Your number"]').value;
  const email = document.querySelector('input[placeholder="Your email"]').value;
  const message = document.querySelector('textarea').value;
  const contactMethod = document.querySelector('input[name="group1"]:checked').nextElementSibling.innerText;

  const formData = new FormData();
  formData.append('name', name);
  formData.append('number', number);
  formData.append('email', email);
  formData.append('message', message);
  formData.append('contact_method', contactMethod);

  try {
    const response = await fetch('send_email.php', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.status === 'success') {
      showSuccessPopup();
    } else {
      alert('Failed to send the email: ' + data.message);
    }
  } catch (error) {
    alert('Failed to send the email: ' + error);
  }
}

// Form submission handler
form.addEventListener('submit', function (event) {
  event.preventDefault();

  if (validateForm()) {
    sendEmail();
  }
});
