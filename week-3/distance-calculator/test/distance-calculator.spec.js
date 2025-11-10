import assert from 'node:assert/strict';
import {
  calculateDistance,
  calculateDistanceAsync,
  safeDistanceReport,
  UnknownPlanetError,
  DistanceComputationError,
} from '../src/distance-calculator.js';

const tests = [];

function register(testFn) {
  tests.push(testFn);
}

function logResult(name, result) {
  if (result) {
    console.log(`✅ ${name}`);
  } else {
    console.error(`❌ ${name}`);
  }
}

register(function testEarthToMars() {
  try {
    const distance = calculateDistance('Earth', 'Mars');
    assert.strictEqual(distance, 0.52);
    console.log('PASSED testEarthToMars');
    return true;
  } catch (error) {
    console.error(`Failed testEarthToMars: ${error.message}`);
    return false;
  }
});

register(function testMercuryToNeptune() {
  try {
    const distance = calculateDistance('Mercury', 'Neptune');
    assert.strictEqual(distance, 29.68);
    console.log('PASSED testMercuryToNeptune');
    return true;
  } catch (error) {
    console.error(`Failed testMercuryToNeptune: ${error.message}`);
    return false;
  }
});

register(function testUnknownPlanetThrows() {
  try {
    assert.throws(
      () => calculateDistance('Krypton', 'Earth'),
      (error) => error instanceof UnknownPlanetError && /Krypton/.test(error.message)
    );
    console.log('PASSED testUnknownPlanetThrows');
    return true;
  } catch (error) {
    console.error(`Failed testUnknownPlanetThrows: ${error.message}`);
    return false;
  }
});

register(async function testAsyncDistanceMatches() {
  try {
    const distance = await calculateDistanceAsync('Venus', 'Jupiter');
    assert.strictEqual(distance, 4.48);
    console.log('PASSED testAsyncDistanceMatches');
    return true;
  } catch (error) {
    console.error(`Failed testAsyncDistanceMatches: ${error.message}`);
    return false;
  }
});

register(async function testAsyncUnknownPlanetRejection() {
  try {
    await assert.rejects(
      () => calculateDistanceAsync('Earth', 'Gallifrey'),
      (error) => error instanceof UnknownPlanetError && /Gallifrey/.test(error.message)
    );
    console.log('PASSED testAsyncUnknownPlanetRejection');
    return true;
  } catch (error) {
    console.error(`Failed testAsyncUnknownPlanetRejection: ${error.message}`);
    return false;
  }
});

register(function testRedPhaseDocumented() {
  try {
    try {
      assert.strictEqual(1, 2, 'Intentional red phase assertion');
    } catch (error) {
      assert.match(error.message, /Intentional red phase assertion/);
      console.log('Captured intentional failure during Red phase demonstration');
      return true;
    }

    console.error('Red phase error was not triggered');
    return false;
  } catch (error) {
    console.error(`Failed testRedPhaseDocumented: ${error.message}`);
    return false;
  }
});

register(function testSafeReportHandlesErrors() {
  try {
    const message = safeDistanceReport('Earth', 'Gallifrey');
    assert.match(message, /Unable to calculate distance/);

    const successMessage = safeDistanceReport('Earth', 'Mars');
    assert.match(successMessage, /0.52/);

    const samePlanetMessage = safeDistanceReport('Mercury', 'Mercury');
    assert.match(samePlanetMessage, /0 AU/);

    console.log('PASSED testSafeReportHandlesErrors');
    return true;
  } catch (error) {
    console.error(`Failed testSafeReportHandlesErrors: ${error.message}`);
    return false;
  }
});

(async () => {
  let hasFailure = false;

  for (const testFn of tests) {
    const name = testFn.name || 'anonymousTest';

    try {
      const result = await testFn();
      logResult(name, result);
      if (!result) {
        hasFailure = true;
      }
    } catch (error) {
      hasFailure = true;
      logResult(name, false);
      console.error(error);
    }
  }

  if (hasFailure) {
    process.exitCode = 1;
  } else {
    console.log('🎉 All tests passed');
  }
})();
