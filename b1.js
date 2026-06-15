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

// Part 1: Fixed by declaring variables before logging them
var a = 10;
let b = 20;
const c = 30;

console.log(a); // Output: 10
console.log(b); // Output: 20
console.log(c); // Output: 30

// Part 2: Fixed by updating values instead of illegally re-declaring them
a = 99; // Updated var value
b = 88; // Updated let value
// Note: 'const c' cannot be updated, so we leave it or use a new variable name.

// Part 3: Fixed by removing the illegal object reassignment
const user = { name: 'Asad' };
user.name = 'Ali'; // Allowed: Mutating property
//user = {}; // Not allowed: Reassigning const variable
