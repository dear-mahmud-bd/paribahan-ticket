
let count = 0;
let valiedNumber = false;

let seatsLeftElement = document.getElementById('seats-left');
let selectedSeatElement = document.getElementById('selected-seat');
let modal = document.getElementById('my_modal_5'); // seat modal ...
let tbody = document.getElementById('seats-table-body');
let totalPriceElement = document.getElementById('total-price');
let grandTotalAmountElement = document.getElementById('grand-total-amount');
let couponInput = document.getElementById('coupon-input');
let couponButton = document.getElementById('coupon-code');
let couponDiv = document.getElementById('coupon-div');
let invalidCouponMessage = document.getElementById('invalid-coupon');
let errorMessage = document.getElementById('error-message'); // phone-number validation...
let nextButton = document.getElementById('next-btn');
let openModalLink = document.getElementById('open-modal-link');


// functionality after clicked the specific seat...
function clickedSeat(target) {
    if (target.classList.contains('seat')) {
        count += 1;
        
        // check next-button...
        nextButtonCheck(valiedNumber, count);

        // add design in selected seat
        target.classList.add('bg-p-color', 'text-white', 'cursor-not-allowed');
        target.classList.remove('seat');

        // remaining seat... 
        let seatsLeft = parseInt(seatsLeftElement.textContent);
        seatsLeft -= 1;
        seatsLeftElement.textContent = seatsLeft;

        // selected seat...
        let selectedSeat = parseInt(selectedSeatElement.textContent);
        selectedSeat += 1;
        selectedSeatElement.textContent = selectedSeat;

        // create row with seat details...
        const newRowHTML = `
            <tr>
                <td class="text-left">${target.id}</td>
                <td class="text-left">Economoy</td>
                <td class="text-right">550</td>
            </tr>
        `;
        // Insert the new row HTML into the tbody
        tbody.insertAdjacentHTML('beforeend', newRowHTML);

        // total price...
        let totalPrice = parseInt(totalPriceElement.textContent);
        totalPrice += 550;
        totalPriceElement.textContent = totalPrice;
        // grand total price...
        let grandTotalAmount = parseInt(grandTotalAmountElement.textContent);
        grandTotalAmount += 550;
        grandTotalAmountElement.textContent = grandTotalAmount;
    }
}

// max 4 seat message...
function showMessage(message, duration) {
    const messageDiv = document.getElementById('seat-message');
    messageDiv.textContent = message;
    messageDiv.classList.add('bg-red-100', 'text-red-800', 'border', 'border-red-300', 'rounded-lg', 'p-4', 'mb-4', 'inline-block'); 

    // Remove the message after the specified duration
    setTimeout(() => {
        messageDiv.textContent = ''; // Clear the message
        messageDiv.classList.remove('bg-red-100', 'text-red-800', 'border', 'border-red-300', 'rounded-lg', 'p-4', 'mb-4', 'inline-block'); 
    }, duration);
}

// next button checker...
function nextButtonCheck(valiedNumber, seatCount){
    if(valiedNumber && seatCount>=1){
        nextButton.disabled = false;
        nextButton.classList.remove('bg-green-500');
        nextButton.classList.add('bg-p-color','hover:bg-green-600');
    }else{
        nextButton.disabled = true;
        nextButton.classList.remove('bg-p-color', 'hover:bg-green-600');
        nextButton.classList.add('bg-green-500');
    }
}

// Select the seat number...
document.getElementById('bus-seats').addEventListener('click', function(event) {
    let target = event.target;
    if (!event.target.classList.contains('seat')) {
        // nothing happend...
    }else if(count == 4){
        // modal.showModal();
        showMessage("You can't select more than 4 seats", 5000); // 5 seconds 
    }else{
        clickedSeat(target);
    }

    // enabled coupon field ...
    if (count >= 4) {
        couponInput.disabled = false;
        couponButton.disabled = false;
        couponButton.classList.remove('bg-green-500')
        couponButton.classList.add('bg-p-color','hover:bg-green-600')
    } 
});

// to apply the coupon code...
function applyCoupon() {
    const couponCode = couponInput.value.trim();
    if (couponCode === 'NEW15') {
        couponText(15);
    } else if (couponCode === 'Couple 20') {
        couponText(20);
    } else {
        invalidCouponMessage.textContent = 'Invalid coupon code. Please try again.';
        invalidCouponMessage.classList.remove('text-green-600');
        invalidCouponMessage.classList.add('text-red-600');
        invalidCouponMessage.classList.remove('hidden'); 
    }
}

// add coupon text...
function couponText(discount) {
    let discountAmount = (550*count)*(discount/100);
    couponDiv.innerHTML="";
    invalidCouponMessage.innerHTML = `<span>Discount ${discount}%</span>
                                      <span id="coupon-discount">BDT -${discountAmount}</span>`;
    invalidCouponMessage.classList.remove('text-red-600');
    invalidCouponMessage.classList.add('text-green-600');
    invalidCouponMessage.classList.remove('hidden'); 
    // Update grand total...
    updateGrandTotal(discount);
}

// Update grand total calculation...
function updateGrandTotal(discount = 0) {
    let totalPrice = parseInt(totalPriceElement.textContent);
    let grandTotal = totalPrice - (totalPrice * discount / 100);
    grandTotalAmountElement.textContent = grandTotal.toFixed(2); // Show grand total with 2 decimal places
}

// phone-number validity ...
document.getElementById('phone-number').addEventListener('keyup', function(event) {
    const phoneInput = event.target;
    const phoneValue = phoneInput.value;
    
    if (isNaN(phoneValue)) {
        valiedNumber = false;
        phoneHTMLStyle(phoneInput, 'Please enter only numbers.', 'border-red-500', 'border-gray-300');
    } else if (phoneValue.length != 11) {
        valiedNumber = false;
        phoneHTMLStyle(phoneInput, 'Phone number length must be 11.', 'border-red-500', 'border-gray-300');
    } else {
        valiedNumber = true;
        phoneHTMLStyle(phoneInput, '', 'border-gray-300', 'border-red-500');
    }

    if(valiedNumber && count>=1){
        nextButtonCheck(valiedNumber, count);
    }else{
        nextButtonCheck(valiedNumber, count);
    }
});

// phone-number tag message and style...
function phoneHTMLStyle(phoneInput, text, add, remove) {
    errorMessage.textContent = text;
    phoneInput.classList.add(add);
    phoneInput.classList.remove(remove);
}

// next-btn to open success modal...
nextButton.addEventListener('click', function() {
    openModalLink.click();
});
