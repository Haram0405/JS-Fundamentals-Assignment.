
// ==========================================
// SCENARIO 3: GRADE MANAGEMENT REPORT SYSTEM
// ==========================================

/*
  SYSTEM ARCHITECTURE RULES SUMMARY:
  - getAverage     -> Pure function. Coerces strings, skips nulls, handles empty arrays, rounds to 1 decimal place.
  - getGrade       -> Pure function. Converts averages into letter brackets (A+, A, B, C, D, F).
  - generateReport -> Pure function. Returns a new array containing complete metadata without mutating the base data.
  - getSummary     -> Pure function. Reduces the report map down to global class performance benchmarks.
*/

// Provided source array (DO NOT MODIFY)
const students = [
  { name: 'Asad', scores: [85, 90, 78, 92], present: true },
  { name: 'Sara', scores: [70, 65, '80', 75], present: true },
  { name: 'Ali', scores: [55, 60, 50, null], present: false },
  { name: 'Ayesha', scores: [95, 98, 100, 92], present: true },
  { name: 'Umar', scores: [], present: true },
];

// --- 1. Pure Average Calculation Function ---
function getAverage(scores) {
  if (!Array.isArray(scores) || scores.length === 0) {
    return 0;
  }

  let totalSum = 0;
  let validScoresCount = 0;

  for (let i = 0; i < scores.length; i++) {
    const currentScore = scores[i];

    // Explicitly bypass null or undefined entries
    if (currentScore === null || currentScore === undefined) {
      continue;
    }

    // Coerce values to a numbers via the Number constructor
    const coercedScore = Number(currentScore);

    // Filter out invalid conversions or boolean inputs mixed into the data
    if (isNaN(coercedScore) || typeof currentScore === 'boolean') {
      continue;
    }

    totalSum += coercedScore;
    validScoresCount++;
  }

  if (validScoresCount === 0) {
    return 0;
  }

  const exactAverage = totalSum / validScoresCount;
  
  // Format result down to 1 decimal place safely returning a float value
  return Number(exactAverage.toFixed(1));
}

// --- 2. Pure Grade Map Converter Function ---
function getGrade(average) {
  if (average >= 90 && average <= 100) return 'A+';
  if (average >= 80 && average < 90) return 'A';
  if (average >= 70 && average < 80) return 'B';
  if (average >= 60 && average < 70) return 'C';
  if (average >= 50 && average < 60) return 'D';
  return 'F';
}

// --- 3. Pure Comprehensive Report Generator Function ---
function generateReport(studentList) {
  // Use map to generate an isolated, completely non-mutated data structure
  return studentList.map(student => {
    const currentAverage = getAverage(student.scores);
    const calculatedGrade = getGrade(currentAverage);
    const mappedStatus = student.present ? 'present' : 'absent';
    
    // Core Rule: Student passes only if average is 60+ AND they were physically present
    const hasPassed = currentAverage >= 60 && student.present === true;

    return {
      name: student.name,
      average: currentAverage,
      grade: calculatedGrade,
      status: mappedStatus,
      passed: hasPassed
    };
  });
}

// --- 4. Pure Global Metrics Compiler Function ---
function getSummary(reportList) {
  if (!Array.isArray(reportList) || reportList.length === 0) {
    return { total: 0, passed: 0, failed: 0, topStudent: 'N/A', classAverage: 0 };
  }

  let passedCount = 0;
  let failedCount = 0;
  let classRunningTotal = 0;
  
  let highestAverage = -1;
  let topStudentName = '';

  for (let i = 0; i < reportList.length; i++) {
    const record = reportList[i];

    // Compute passed vs failed metrics
    if (record.passed) {
      passedCount++;
    } else {
      failedCount++;
    }

    // Accumulate total class scores
    classRunningTotal += record.average;

    // Evaluate top performer benchmarks
    if (record.average > highestAverage) {
      highestAverage = record.average;
      topStudentName = record.name;
    }
  }

  const computedClassAverage = classRunningTotal / reportList.length;

  return {
    total: reportList.length,
    passed: passedCount,
    failed: failedCount,
    topStudent: topStudentName,
    classAverage: Number(computedClassAverage.toFixed(1))
  };
}


// ==========================================
// SYSTEM EXECUTION PROOFS & LOG OUTPUTS
// ==========================================

console.log('--- 1. IMMUTABILITY SAFETY CHECK (BEFORE) ---');
// Displays the base state of the raw student data prior to compilation processing
console.log('Original students array snapshot:', students);

// Fire the compilation operations
const finalReport = generateReport(students);
const classSummary = getSummary(finalReport);

console.log('\n--- 2. DETAILED GENERATED REPORT MAP ---');
// Displays the newly mapped independent collection of student report summaries
console.log('Generated Report Data Struct:', finalReport);

console.log('\n--- 3. SYSTEM METRICS AND CLASS SUMMARY ---');
// Displays compiled class data highlights (Ayesha tracking top performance, etc.)
console.log('Final Metrics Aggregate Object:', classSummary);

console.log('\n--- 4. IMMUTABILITY SAFETY CHECK (AFTER) ---');
// Proof Requirement ⑤: Evaluates whether any array items mutated down the chain
console.log('Original students array snapshot:', students);

console.log('\n--- Final System Diagnostic Check Done ---');
