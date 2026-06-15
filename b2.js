// Question: Definition Of Function:

//A function is a reusable block of code designed to perform a specific task.


function typeAnalyser(value) {
    return {
        input: value,
        typeofResult: typeof value,
        isArray: Array.isArray(value),
        isNull: value === null,
        toNumber: Number(value),
        toBoolean: Boolean(value),
        toString: String(value)
    };
}

// ==========================================
// ALL 8 REQUIRED TEST CALLS WITH CONSOLE.LOG
// ==========================================

// Test Case 1: Number
console.log(typeAnalyser(42));

// Test Case 2: String
console.log(typeAnalyser('hello'));

// Test Case 3: Null
console.log(typeAnalyser(null));

// Test Case 4: Array
console.log(typeAnalyser([]));

// Test Case 5: Undefined
console.log(typeAnalyser(undefined));

// Test Case 6: Boolean
console.log(typeAnalyser(true));

// Test Case 7: Falsy Number (Zero)
console.log(typeAnalyser(0));

// Test Case 8: Empty String
console.log(typeAnalyser(''));
