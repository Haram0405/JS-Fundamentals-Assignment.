// =========================================================================
//  IDENTIFYING & FIXING PASS-BY-REFERENCE AND SHALLOW COPY BUGS
// =========================================================================

// -------------------------------------------------------------------------
// 🐛 Bug 1: Cart duplication bug
// -------------------------------------------------------------------------
// (1) What the bug is: 
//     The spread operator only creates a shallow copy. The nested items array 
//     still shares the exact same reference. Pushing to cart2 modifies cart1.
// (2) Current wrong output: ['JS Book', 'React Book', 'Node Book']

// Bug 1 Fix: Explicitly deep copy the items array inside the new object
const cart1 = { items: ['JS Book', 'React Book'], total: 150 };
const cart2 = { ...cart1, items: [...cart1.items] }; 

cart2.items.push('Node Book');

console.log("--- [BUG 1 FIX VERIFICATION] ---");
console.log("Cart 1 Items (Original) ->", cart1.items); 
console.log("Cart 2 Items (Updated)  ->", cart2.items); 
console.log("Status                  -> ✅ SUCCESS: Original Unchanged\n");


// -------------------------------------------------------------------------
// 🐛 Bug 2: Function mutating original
// -------------------------------------------------------------------------
// (1) What the bug is: 
//     Objects are passed by reference. Passing myOrder directly mutates the 
//     property of the original object instead of a fresh isolated copy.
// (2) Current wrong output: 117

// Bug 2 Fix: Create a new object copy inside the function to protect the original
function applyTax(order) {
    const newOrder = { ...order }; 
    newOrder.total = newOrder.total * 1.17; 
    return newOrder;
}

const myOrder = { id: 1, total: 100 };
const taxedOrder = applyTax(myOrder);

console.log("--- [BUG 2 FIX VERIFICATION] ---");
console.log("Original Order Total    ->", myOrder.total); 
console.log("Taxed Order Total       ->", taxedOrder.total); 
console.log("Status                  -> ✅ SUCCESS: Original Unchanged\n");


// -------------------------------------------------------------------------
// 🐛 Bug 3: Config reset that doesn't work
// -------------------------------------------------------------------------
// (1) What the bug is: 
//     Reassigning a parameter variable inside a function only updates its 
//     local reference. We must return a fresh, deep-copied object and reassign it.
// (2) Current wrong output: 'light' and 20

// Bug 3 Fix: Return a fresh, deep-copied configuration object
const defaultConfig = { theme: 'dark', lang: 'en', nested: { fontSize: 14 } };

function resetConfig() {
    return { 
        ...defaultConfig, 
        nested: { ...defaultConfig.nested } 
    };
}

let appConfig = { theme: 'light', lang: 'ur', nested: { fontSize: 20 } };
appConfig = resetConfig(); 

console.log("--- [BUG 3 FIX VERIFICATION] ---");
console.log("App Theme               ->", appConfig.theme);           
console.log("App Font Size           ->", appConfig.nested.fontSize);  
console.log("Status                  -> ✅ SUCCESS: State Reset Correctly\n");

console.log("==================================================");
console.log("             DIAGNOSTICS COMPLETED                ");
console.log("==================================================");
