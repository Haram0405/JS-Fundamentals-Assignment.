
// ==========================================
// SCENARIO 1: Shopping Cart System
// ==========================================

// ==========================================
// TASK 1: Predictions & Explanations
// ==========================================

// --- Question1: ---

//console.log('Tab 1 cart items:', cartA.items.length); 
// Output: 2
// What is wrong: Tab 1 items increased to 2 without adding anything in Tab 1.
// Why it happens: Objects in JS are copied by reference. `cartB = cartA` made both tabs point to the exact same array in memory.

// --- Question2: ---

//console.log('Tab 1 total:', cartA.total); 
// Output: 152500
// What is wrong: Tab 1's total price automatically increased.
// Why it happens: Since both variables share the same object block, changing `cartB.total` instantly overwrites `cartA.total`.

// --- Question3: ---

//console.log('Original total:', originalCart.total); 
// Output: 450
// What is wrong: The original item price was permanently altered and corrupted from 500 to 450.
// Why it happens: `applyPromo` is an impure function. It mutates the input argument directly instead of returning a new copy.


// ==========================================
// TASK 2: Bug Identification
// ==========================================

// BUG 1: Using 'var' allows variable hoisting and can cause scope-related bugs. Should use let or const.
var cartA = { owner: 'Asad', items: [{ name: 'Laptop', price: 150000 }], total: 150000 };

// BUG 2: Shallow reference assignment. This creates a pointer linking cartB to cartA instead of making a distinct, independent copy.
var cartB = cartA; 

// BUG 3: Mutating shared state. Since the items array is shared, pushing here inadvertently alters Tab 1's data.
cartB.items.push({ name: 'Mouse', price: 2500 });

// BUG 4: Mutating shared state. Directly overwrites the total property belonging to both tabs.
cartB.total = cartB.total + 2500;

console.log('Tab 1 cart items:', cartA.items.length);
console.log('Tab 1 total:', cartA.total);

// BUG 5: Impure function. It modifies the incoming 'cart' parameter directly, producing unintended side effects outside its scope.
function applyPromo(cart, discount) {
 cart.total = cart.total - discount;
 cart.promoApplied = true;
 return cart;
}


// ==========================================
// TASK 3: Fixed Version (Deep Copy & Immutability)
// ==========================================

// 1. Correct variable declarations using const
const fixedCartA = { 
  owner: 'Asad', 
  items: [{ name: 'Laptop', price: 150000 }], 
  total: 150000 
};

// 2. Creating an independent deep copy for Tab 2
const fixedCartB = {
  ...fixedCartA,
  items: fixedCartA.items.map(item => ({ ...item }))
};

// 3. Isolated, independent modifications for Tab 2
fixedCartB.items.push({ name: 'Mouse', price: 2500 });
fixedCartB.total += 2500;

// 4. Pure applyPromo function (Returns a new object, zero mutations)
function fixedApplyPromo(cart, discount) {
  return {
    ...cart,
    items: cart.items.map(item => (typeof item === 'object' ? { ...item } : item)),
    total: cart.total - discount,
    promoApplied: true
  };
}

const fixedOriginalCart = { owner: 'Sara', items: ['Book'], total: 500 };
const fixedDiscountedCart = fixedApplyPromo(fixedOriginalCart, 50);

// --- VERIFICATION TEST FOR TASK 3 ---

console.log('-----------------------------\n');

console.log('***---Bug Fix Verification ---***');
console.log('Fixed Tab 1 cart items:', fixedCartA.items.length); 
// Output: 1 (Success! The mouse did not leak into Tab 1)

console.log('Fixed Tab 1 total:', fixedCartA.total);       
// Output: 150000 (Success! Price is untouched)

console.log('Fixed Tab 2 cart items:', fixedCartB.items.length); 
// Output: 2 (Laptop and Mouse)

console.log('Fixed Tab 2 total:', fixedCartB.total);       
// Output: 152500
console.log('------------------------------------\n');


// ==========================================
// TASK 4: Pure addItem Function & Proof
// ==========================================

function addItem(cart, item) {
  return {
    ...cart,
    items: [...cart.items, item], // Generates a new array to preserve original reference integrity
    total: cart.total + item.price
  };
}

// Verification Setup
const testCart = { owner: 'Asad', items: [{ name: 'Keyboard', price: 5000 }], total: 5000 };
const newItem = { name: 'Mousepad', price: 1000 };

console.log('***--- Immutability Verification ---***');

// BEFORE: Reviewing initial state
console.log('Original BEFORE addItem:', testCart);

// Executing operation and storing the distinct new cart reference
const updatedCart = addItem(testCart, newItem);

// AFTER: Confirming isolation
console.log('New Updated Cart:', updatedCart);
console.log('Original AFTER addItem (Unchanged):', testCart);

console.log('   --- Verification End ---');
