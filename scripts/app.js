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
 * 
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
            target.classList.add('bg-green-600', 'text-white', 'cursor-not-allowed');
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