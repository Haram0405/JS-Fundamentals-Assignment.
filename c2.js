
// ==========================================
// SCENARIO 2: BACKEND REGISTRATION VALIDATION
// ==========================================

/*
  VALIDATION ENGINE RULES SUMMARY:
  - name     -> Must be a non-empty string.
  - email    -> Must be a string containing both '@' and '.' symbols.
  - age      -> Must be a valid number (or coercible string) between 13 and 120.
  - password -> Must be a string with a minimum length of 8 characters.
  - role     -> Optional. Must be 'admin', 'editor', or 'user'. Defaults to 'user'.
*/

function validateUser(data) {
  const errors = [];

  // Rule 1: Name Validation
  if (typeof data.name !== 'string' || data.name.trim() === '') {
    errors.push('Name must be a non-empty string.');
  }

  // Rule 2: Email Validation
  if (typeof data.email !== 'string' || !data.email.includes('@') || !data.email.includes('.')) {
    errors.push('Email must contain both "@" and "." symbols.');
  }

  // Rule 3: Age Validation & Type Coercion
  const coercedAge = Number(data.age);
  if (isNaN(coercedAge) || typeof data.age === 'boolean' || data.age === null) {
    errors.push('Age must be a valid number.');
  } else if (coercedAge < 13 || coercedAge > 120) {
    errors.push('Age must be between 13 and 120.');
  }

  // Rule 4: Password Validation
  if (typeof data.password !== 'string' || data.password.length < 8) {
    errors.push('Password must be at least 8 characters long.');
  }

  // Rule 5: Role Validation & Nullish Coalescing (??) Defaulting
  const allowedRoles = ['admin', 'editor', 'user'];
  const assignedRole = data.role ?? 'user'; 

  if (!allowedRoles.includes(assignedRole)) {
    errors.push('Role must be either admin, editor, or user.');
  }

  // Guard Clause: Instantly stop and output failures if validation links break
  if (errors.length > 0) {
    return { valid: false, errors };
  }

  // Pure Output Structure: Returns an isolated, clean data payload
  return {
    valid: true,
    user: {
      name: data.name.trim(),
      email: data.email.trim(),
      age: coercedAge,
      password: data.password,
      role: assignedRole
    }
  };
}


// ==========================================
// MANDATORY TEST CASES & EXECUTION PROOF
// ==========================================

// --- TEST CASE 1 ---
// Input: { name: 'Ali', email: 'ali@test.com', age: '25', password: 'pass1234' }
// Expected Outcome: VALID (Age string '25' successfully coerced to number 25, role defaulted to 'user')
console.log('--- Executing Test Case 1 ---');
console.log(validateUser({ name: 'Ali', email: 'ali@test.com', age: '25', password: 'pass1234' }));


// --- TEST CASE 2 ---
// Input: { name: '', email: 'notanemail', age: 10, password: 'abc' }
// Expected Outcome: INVALID (Triggers errors for empty name, bad email syntax, underage value, short password)
console.log('\n--- Executing Test Case 2 ---');
console.log(validateUser({ name: '', email: 'notanemail', age: 10, password: 'abc' }));


// --- TEST CASE 3 ---
// Input: { name: 'Sara', email: 'sara@x.io', age: 30, password: 'secure99', role: 'admin' }
// Expected Outcome: VALID (All conditions satisfied with an explicit 'admin' role designation)
console.log('\n--- Executing Test Case 3 ---');
console.log(validateUser({ name: 'Sara', email: 'sara@x.io', age: 30, password: 'secure99', role: 'admin' }));


// --- TEST CASE 4 ---
// Input: { name: 'X', email: 'x@x.com', age: '17abc', password: 'hello123' }
// Expected Outcome: INVALID (Fails parsing test because age string '17abc' is not coercible to a pure number)
console.log('\n--- Executing Test Case 4 ---');
console.log(validateUser({ name: 'X', email: 'x@x.com', age: '17abc', password: 'hello123' }));
