/**
 * All  ( ID )
 * seats-left ----->40 max
 * bus-seats
 * seat-message
 * selected-seat --> 4 max
 * seats-table-body
 * total-price
 * 
 * coupon-div
 * coupon-input
 * coupon-code
 * coupon-discount
 * grand-total
 * phone-number
 * 
 * 
 */


function showMessage(message, duration) {
    const messageDiv = document.getElementById('seat-message');
    messageDiv.textContent = message;
    messageDiv.classList.add('bg-red-100', 'text-red-800', 'border', 'border-red-300', 'rounded-lg', 'p-4', 'mb-4', 'inline-block'); // Add a class for styling

    // Remove the message after the specified duration
    setTimeout(() => {
        messageDiv.textContent = ''; // Clear the message
        messageDiv.classList.remove('bg-red-100', 'text-red-800', 'border', 'border-red-300', 'rounded-lg', 'p-4', 'mb-4', 'inline-block'); // Remove the styling class
    }, duration);
}

let count = 0;
document.getElementById('bus-seats').addEventListener('click', function(event) {
    let target = event.target;
    // Check if the clicked element is a cell
    if (!event.target.classList.contains('seat')) {

    }else if(count == 4){
        const modal = document.getElementById('my_modal_5');
        modal.showModal();
        showMessage("You can't select more than 4 seats", 5000); // 5 seconds 
    }else{
        if (event.target.classList.contains('seat')) {
            count += 1;
            console.log('Count-',count,', Clicked element ID:', event.target.id);
            target.classList.add('bg-p-color', 'text-white', 'cursor-not-allowed');
            target.classList.remove('seat');

            // remaining seat... 
            let seatsLeftElement = document.getElementById('seats-left');
            let seatsLeft = parseInt(seatsLeftElement.textContent);
            if (seatsLeft > 0) {
                seatsLeft -= 1;
                seatsLeftElement.textContent = seatsLeft;
            }

            // selected seat...
            let selectedSeatElement = document.getElementById('selected-seat');
            let selectedSeat = parseInt(selectedSeatElement.textContent);
            if (selectedSeat < 4) {
                selectedSeat += 1;
                selectedSeatElement.textContent = selectedSeat;
            }
            const newRowHTML = `
                <tr>
                    <td class="text-left">${event.target.id}</td>
                    <td class="text-left">Economoy</td>
                    <td class="text-right">550</td>
                </tr>
            `;
            // Get the tbody element
            const tbody = document.getElementById('seats-table-body');

            // Insert the new row HTML into the tbody
            tbody.insertAdjacentHTML('beforeend', newRowHTML);

            // total price
            let totalPriceElement = document.getElementById('total-price');
            let grandTotalAmountElement = document.getElementById('grand-total-amount');
            let totalPrice = parseInt(totalPriceElement.textContent);
            let grandTotalAmount = parseInt(grandTotalAmountElement.textContent);
            if(totalPrice < 2200){
                totalPrice += 550;
                grandTotalAmount += 550;
                totalPriceElement.textContent = totalPrice;
                grandTotalAmountElement.textContent = grandTotalAmount;
            }
        }
    }
    

    const couponInput = document.getElementById('coupon-input');
    const couponButton = document.getElementById('coupon-code');
    if (count >= 4) {
        couponInput.disabled = false;
        couponButton.disabled = false;
        couponButton.classList.remove('bg-green-500')
        couponButton.classList.add('bg-p-color','hover:bg-green-600')
    } else {
        couponInput.disabled = true;
        couponButton.disabled = true;
    }
});


function applyCoupon() {
    const couponDiv = document.getElementById('coupon-div');
    const couponInput = document.getElementById('coupon-input');
    const couponCode = couponInput.value.trim();
    const invalidCouponMessage = document.getElementById('invalid-coupon');
    let discount = 0;

    if (couponCode === 'NEW15') {
        discount = 15;
        couponDiv.innerHTML="";
        invalidCouponMessage.innerHTML = `<span>Discount ${discount}%</span>
                                          <span id="coupon-discount">BDT -330</span>`;
        invalidCouponMessage.classList.remove('text-red-600');
        invalidCouponMessage.classList.add('text-green-600');
        invalidCouponMessage.classList.remove('hidden'); // Show message
    } else if (couponCode === 'Couple 20') {
        discount = 20;
        couponDiv.innerHTML="";
        invalidCouponMessage.innerHTML = `<span>Discount ${discount}%</span>
                                          <span id="coupon-discount">BDT -440</span>`;
        invalidCouponMessage.classList.remove('text-red-600');
        invalidCouponMessage.classList.add('text-green-600');
        invalidCouponMessage.classList.remove('hidden'); // Show message
    } else {
        invalidCouponMessage.textContent = 'Invalid coupon code. Please try again.';
        invalidCouponMessage.classList.remove('text-green-600');
        invalidCouponMessage.classList.add('text-red-600');
        invalidCouponMessage.classList.remove('hidden'); // Show message
    }
    // Update grand total
    updateGrandTotal(discount);
}

function updateGrandTotal(discount = 0) {
    const totalPriceElement = document.getElementById('total-price');
    const grandTotalElement = document.getElementById('grand-total-amount');
    let totalPrice = parseInt(totalPriceElement.textContent);
    
    let grandTotal = totalPrice - (totalPrice * discount / 100);
    grandTotalElement.textContent = grandTotal.toFixed(2); // Show grand total with 2 decimal places
}

// phone-number
document.getElementById('phone-number').addEventListener('keyup', function(event) {
    const phoneInput = event.target;
    const errorMessage = document.getElementById('error-message');
    const phoneValue = phoneInput.value;
    
    if (isNaN(phoneValue)) {
        errorMessage.textContent = 'Please enter only numbers.';
        phoneInput.classList.add('border-red-500');
        phoneInput.classList.remove('border-gray-300');
    } else if (phoneValue.length < 11 || phoneValue.length > 11) {
        errorMessage.textContent = 'Phone number length must be 11.';
        phoneInput.classList.add('border-red-500');
        phoneInput.classList.remove('border-gray-300');
    } else {
        errorMessage.textContent = '';
        phoneInput.classList.add('border-gray-300');
        phoneInput.classList.remove('border-red-500');
    }

    const nextButton = document.getElementById('next-btn');
    if(phoneValue.length==11 && count>=1){
        nextButton.disabled = false;
        nextButton.classList.remove('bg-green-500');
        nextButton.classList.add('bg-p-color','hover:bg-green-600');
    }else{
        nextButton.disabled = true;
        nextButton.classList.remove('bg-p-color', 'hover:bg-green-600');
        nextButton.classList.add('bg-green-500');
    }
});

// next-btn
// Get the link element
const openModalLink = document.getElementById('open-modal-link');
// Get the button element
const triggerClickButton = document.getElementById('next-btn');

// Add event listener to the button
triggerClickButton.addEventListener('click', function() {
    // Programmatically click the link
    openModalLink.click();
});



// Attach an event listener to the "Continue" button
document.getElementById('continue-button').addEventListener('click', function(event) {
    // event.preventDefault(); // Prevent the default link behavior
    // location.reload(); // Refresh the page
});
