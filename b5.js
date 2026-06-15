


// =================================================================
// (Pure Function Library with Immutability Proof)
// =================================================================

// 1. addToCart(cart, item)
function addToCart(cart, item) {
    return [...cart, item]; 
}

// 2. updateUserAge(user, newAge)
function updateUserAge(user, newAge) {
    return { ...user, age: newAge }; 
}

// 3. incrementScore(scores, playerName)
function incrementScore(scores, playerName) {
    return { 
        ...scores, 
        [playerName]: (scores[playerName] || 0) + 1 
    };
}

// 4. reverseString(str)
function reverseString(str) {
    return str.split('').reverse().join('');
}

// 5. removeItem(arr, index)
function removeItem(arr, index) {
    return arr.filter((_, i) => i !== index); 
}

// =================================================================
// TEST CALLS PROVING ORIGINAL DATA IS UNCHANGED
// =================================================================

// **....Test Case 1:....**

console.log("--- Test 1: addToCart ---");
const initialCart = ['Apple', 'Banana'];
const updatedCart = addToCart(initialCart, 'Orange');
console.log("Returned New Array: ", updatedCart); 
console.log("Original Array Proof:", initialCart); // Output: ['Apple', 'Banana']

// **....Test Case 2:....**

console.log("\n--- Test 2: updateUserAge ---");
const primaryUser = { name: 'Asad', age: 25 };
const upgradedUser = updateUserAge(primaryUser, 26);
console.log("Returned New Object:", upgradedUser); 
console.log("Original Object Proof:", primaryUser); // Output: { name: 'Asad', age: 25 }

//**....Test Case 3:....**
    
console.log("\n--- Test 3: incrementScore ---");
const currentScores = { Ali: 10, Sana: 15 };
const newScores = incrementScore(currentScores, 'Ali');
console.log("Returned New Object:", newScores);     
console.log("Original Object Proof:", currentScores); // Output: { Ali: 10, Sana: 15 }

//**....Test Case 4:....**

console.log("\n--- Test 4: reverseString ---");
const originalText = 'hello';
const reversedText = reverseString(originalText);
console.log("Returned New String:", reversedText); 
console.log("Original String Proof:", originalText); // Output: 'hello'

//**....Test Case 5:....**

console.log("\n--- Test 5: removeItem ---");
const originalList = ['HTML', 'CSS', 'JavaScript'];
const filteredList = removeItem(originalList, 1); 
console.log("Returned New Array: ", filteredList); 
console.log("Original Array Proof:", originalList); // Output: ['HTML', 'CSS', 'JavaScript']
