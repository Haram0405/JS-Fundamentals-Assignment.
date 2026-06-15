//  **...Question...**

//Identify the bugs caused by pass-by-reference and shallow copy — then fix each one correctly.

//  **...Solution...**


//🐛 Bug 1: Cart duplication bug

// (1) What the bug is: 
//          The spread operator const cart2 = { ...cart1 }; only creates a shallow copy. The nested items array still shares the exact same reference in memory. Therefore, pushing a new item to cart2 unintentionally modifies cart1.
// (2) Current wrong output: 
//          ['JS Book', 'React Book', 'Node Book']
// (3) Fixed code:

// Bug 1 Fix: Explicitly deep copy the array inside the object
const cart1 = { items: ['JS Book', 'React Book'], total: 150 };
const cart2 = { ...cart1, items: [...cart1.items] }; // Deep copy items
cart2.items.push('Node Book');
console.log(cart1.items); // Correct Output: ['JS Book', 'React Book']

//🐛 Bug 2: Function mutating original

// (1) What the bug is: 
//          Objects are passed by reference in JavaScript. When myOrder is passed into the function, the function directly mutates (changes) the property of the original object instead of working on a copy.
// (2) Current wrong output: 
//          117
// (3) Fixed code:

// Bug 2 Fix: Create a new object copy inside the function to protect the original
function applyTax(order) {
    const newOrder = { ...order }; // Create a shallow copy
    newOrder.total = newOrder.total * 1.17; 
    return newOrder;
}
const myOrder = { id: 1, total: 100 };
const taxedOrder = applyTax(myOrder);
console.log(myOrder.total); // Correct Output: 100

//🐛 Bug 3: Config reset that doesn't work

// (1) What the bug is: 
//          Reassigning the parameter variable config = { ...defaultConfig } only updates its local reference inside the function scope; it does not affect the external appConfig object. Furthermore, mutating config.nested.fontSize affects the shared nested reference of defaultConfig due to the shallow copy.
// (2) Current wrong output: 
//          console.log(appConfig.theme); \(\rightarrow \) 'light'
//          console.log(appConfig.nested.fontSize); \(\rightarrow \) 20
// (3) Fixed code:

// Bug 3 Fix: Return a fresh, deep-copied default configuration object
const defaultConfig = { theme: 'dark', lang: 'en', nested: { fontSize: 14 } };

function resetConfig() {
    // Return a deeply copied fresh configuration object
    return { 
        ...defaultConfig, 
        nested: { ...defaultConfig.nested } 
    };
}

let appConfig = { theme: 'light', lang: 'ur', nested: { fontSize: 20 } };
appConfig = resetConfig(); // Reassign the returned object to overwrite appConfig

console.log(appConfig.theme);           // Correct Output: 'dark'
console.log(appConfig.nested.fontSize);  // Correct Output: 14

