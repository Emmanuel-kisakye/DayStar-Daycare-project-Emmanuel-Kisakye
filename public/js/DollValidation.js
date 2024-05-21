document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.form-container form');

  form.addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get form input fields
    const dollnameInput = form.querySelector('input[name="dollname"]');
    const quantityInput = form.querySelector('input[name="quantity"]');
    const costInput = form.querySelector('input[name="cost"]');

    // Validate dollname field
    if (dollnameInput.value.trim() === '') {
      alert('Please enter a Doll Name');
      return;
    }

    // Validate quantity field
    const quantityValue = parseInt(quantityInput.value);
    if (isNaN(quantityValue) || quantityValue < 1) {
      alert('Please enter a valid Quantity (minimum 1)');
      return;
    }

    // Validate cost field
    const costValue = parseInt(costInput.value);
    if (isNaN(costValue) || costValue < 0 || costValue % 2000 !== 0) {
      alert('Please enter a valid Cost (must be a positive multiple of 2000)');
      return;
    }

    // If all fields are valid, submit the form
    form.submit();
  });
});
