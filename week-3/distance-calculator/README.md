# Distance Calculator – Chapter 3 Programming Exercise

## Overview
This project satisfies the Chapter 3 programming exercise from *Pragmatic Node.js (1st Edition)*. It calculates the distance between two planets (in Astronomical Units) while demonstrating Test-Driven Development, Node.js error handling, and the `assert` testing workflow outlined in the book.

## Project Structure
```
distance-calculator/
├── package.json
├── README.md
├── src
│   └── distance-calculator.js
└── test
    └── distance-calculator.spec.js
```

## TDD (Red → Green → Refactor)
1. **Red:** Authored failing tests first (`testEarthToMars`, error scenarios, async expectations). The suite’s `testRedPhaseDocumented` preserves the original failing assertion to record the initial red state.
2. **Green:** Implemented `calculateDistance` with minimal logic to satisfy the happy-path test, then expanded error handling and the async wrapper until all tests passed.
3. **Refactor:** Extracted validation helpers, introduced custom error classes, and added `safeDistanceReport` for user-friendly messages while keeping the test suite green throughout.

## Astronomical Unit Data
Average orbital radii were sourced from NASA fact sheets (rounded to two decimals for readability):
- Mercury: 0.39 AU
- Venus: 0.72 AU
- Earth: 1.00 AU
- Mars: 1.52 AU
- Jupiter: 5.20 AU
- Saturn: 9.58 AU
- Uranus: 19.22 AU
- Neptune: 30.07 AU

These constants are documented directly in `src/distance-calculator.js` with a link to the NASA resource.

## Error Handling & Edge Cases
- Invalid or blank planet names raise `UnknownPlanetError` for both sync and async code paths.
- Unexpected issues are wrapped in `DistanceComputationError`, preserving the original cause for debugging.
- `safeDistanceReport` demonstrates graceful recovery by converting expected errors into user-friendly messages.
- Asynchronous flows (`calculateDistanceAsync`) show how Promise rejections propagate those custom errors.

## Scripts
- `npm test` — runs the Node.js assert-based suite (`test/distance-calculator.spec.js`).

> **Strict mode:** The project uses ES Modules with `"type": "module"` (strict by default) and also includes an explicit `'use strict';` directive at the top of `src/distance-calculator.js` per the assignment note.

## Usage
```bash
npm install
npm test
```

The module exports `calculateDistance`, `calculateDistanceAsync`, and `safeDistanceReport` for use in applications or CLI utilities.
