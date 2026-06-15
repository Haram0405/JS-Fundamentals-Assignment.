
//  **...Question...**

// Write a function calculateDiscount(price, userType, isMember) that returns the final price after discount.

//  **...Solution...**

function calculateDiscount(price, userType, isMember) {
    // 1. Validation rule
    if (typeof price !== 'number' || price <= 0 || isNaN(price)) {
        return 'Invalid price';
    }

    let finalPrice = price;

    // 2, 3, 4. Base discount rules
    if (userType === 'admin') {
        finalPrice = price * 0.50; // 50% off
    } else if (price > 1000) {
        finalPrice = price * 0.80; // 20% off
    } else if (price > 500) {
        finalPrice = price * 0.90; // 10% off
    }

    // 5. Additional member discount (Applied AFTER)
    if (isMember === true) {
        finalPrice = finalPrice * 0.95; // 5% off
    }

    // 6. Minimum price rule
    if (finalPrice < 1) {
        finalPrice = 1;
    }

    // 7. Round to 2 decimal places
    return Number(finalPrice.toFixed(2));
}

// Required Test Cases
console.log(calculateDiscount(1200, 'user', false)); //Output: 960.00
console.log(calculateDiscount(1200, 'user', true)); //Output: 912.00
console.log(calculateDiscount(600, 'admin', true)); //Output: 270.00
console.log(calculateDiscount(-50, 'user', false)); //Output: 'Invalid price'
console.log(calculateDiscount('abc', 'user', false)); //Output: 'Invalid price'
