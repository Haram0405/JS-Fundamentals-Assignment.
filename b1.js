//📝 Part 1: Predict and explain...(Hoisting and TDZ)

//  **...Question...**

console.log(a); // Output: ?
console.log(b); // Output: ?
console.log(c); // Output: ?
var a = 10;
let b = 20;
const c = 30;

//  **...Solution...**

console.log(a);
// Output: undefined
// Why: Variables declared with var are hoisted and automatically initialized to undefined.

console.log(b);
// Output: ReferenceError
// Why: Variables declared with let are hoisted but remain uninitialized in the Temporal Dead Zone (TDZ) until their declaration is reached.

console.log(c);
// Output: ReferenceError
// Why: Variables declared with const are also in the Temporal Dead Zone (TDZ) before their declaration.

//📝 Part 2: Predict...(Re-declaration Rules)

//  **...Question...**

var a = 99; // re-declaring var
let b = 88; // re-declaring let
const c = 77; // re-declaring const

//  **...Solution...**

var a = 99;
// Output: Allowed.
// Why: JavaScript permits re-declaring var variables within the same scope.

let b = 88;
// Output: SyntaxError
// Why: You cannot re-declare a let variable within the same scope.

const c = 77;
// Output: SyntaxError
// Why: You cannot re-declare a const variable within the same scope.

//📝 Part 3: Predict...(Const Mutability)

//  **...Question...**
const user = { name: 'Asad' };
user.name = 'Ali'; // is this allowed?
user = {}; // is this allowed?

//  **...Solution...**

user.name = 'Ali';
// Output: Allowed.
// Why: Properties inside a const object can be mutated (changed).

user = {};
// Output: TypeError
// Why: A const variable cannot be reassigned to a completely new reference or value.

//💻 Corrected Code Block
// =========================================================================
//  JAVASCRIPT SCOPING & VARIABLE MUTATION AUDIT
// =========================================================================

// -------------------------------------------------------------------------
// Part 1: Hoisting and Initialization Fixes
// -------------------------------------------------------------------------
// Fixed by declaring variables before logging to avoid TDZ (Temporal Dead Zone) errors.
var a = 10;
let b = 20;
const c = 30;

console.log("--- [PART 1: INITIALIZATION PROOF] ---");
console.log("var a (Function/Global Scoped) ->", a); // Output: 10
console.log("let b (Block Scoped Primitive) ->", b); // Output: 20
console.log("const c (Block Scoped Constant)->", c); // Output: 30
console.log("Status                         -> ✅ SUCCESS: Initialized Correctly\n");


// -------------------------------------------------------------------------
// Part 2: Value Mutation and Reassignment Constraints
// -------------------------------------------------------------------------
// Fixed by updating existing values instead of illegally re-declaring them.
a = 99; // Mutating var value is allowed
b = 88; // Reassigning let value is allowed

console.log("--- [PART 2: MUTATION PROOF] ---");
console.log("var a (Updated Value)          ->", a);  // Output: 99
console.log("let b (Reassigned Value)       ->", b);  // Output: 88
console.log("const c (Immutable Primitive)  ->", c);  // Output: 30 (Untouched)
console.log("Status                         -> ✅ SUCCESS: Reassignment Validated\n");


// -------------------------------------------------------------------------
// Part 3: Reference Immutability vs Object Mutation
// -------------------------------------------------------------------------
// Fixed by modifying the internal property rather than breaking the binding.
const user = { name: 'Asad' };

// Allowed: Mutating an internal property of a heap-allocated object.
user.name = 'Ali'; 

// Not Allowed (Commented Out to Prevent Crash): 
// user = {}; // TypeError: Assignment to constant variable.

console.log("--- [PART 3: REFERENCE BINDING PROOF] ---");
console.log("Object Reference State         ->", user); // Output: { name: 'Ali' }
console.log("Status                         -> ✅ SUCCESS: Property Mutated Safely\n");

console.log("==================================================");
console.log("          ALL MEMORY TESTS COMPLETED              ");
console.log("==================================================");
