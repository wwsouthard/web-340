'use strict';

/**
 * Average orbital radii (Astronomical Units) sourced from NASA fact sheets.
 * Values are rounded to two decimal places for the purposes of this exercise:
 * - https://nssdc.gsfc.nasa.gov/planetary/factsheet/planetfact_notes.html
 */
export const PLANETARY_DISTANCES = Object.freeze(
  new Map([
    ['Mercury', 0.39],
    ['Venus', 0.72],
    ['Earth', 1.0],
    ['Mars', 1.52],
    ['Jupiter', 5.2],
    ['Saturn', 9.58],
    ['Uranus', 19.22],
    ['Neptune', 30.07],
  ])
);

/**
 * Custom error raised when the caller provides a planet name we do not track.
 */
export class UnknownPlanetError extends Error {
  constructor(planetName) {
    super(`Unknown planet provided: ${planetName}`);
    this.name = 'UnknownPlanetError';
    this.planetName = planetName;
  }
}

/**
 * Wraps unexpected exceptions so that callers can branch on the error type
 * while still accessing the underlying cause when required.
 */
export class DistanceComputationError extends Error {
  constructor(message, { cause } = {}) {
    super(message);
    this.name = 'DistanceComputationError';
    this.cause = cause;
  }
}

function validatePlanet(planetName) {
  if (typeof planetName !== 'string' || planetName.trim().length === 0) {
    throw new UnknownPlanetError(String(planetName));
  }

  if (!PLANETARY_DISTANCES.has(planetName)) {
    throw new UnknownPlanetError(planetName);
  }
}

function formatDistance(value) {
  return Number(Math.abs(value).toFixed(2));
}

/**
 * Calculates the distance (in AU) between two planets using their average
 * orbital radii. Throws {@link UnknownPlanetError} for invalid names and wraps
 * other issues in {@link DistanceComputationError} to aid troubleshooting.
 */
export function calculateDistance(planetA, planetB) {
  try {
    validatePlanet(planetA);
    validatePlanet(planetB);

    const originDistance = PLANETARY_DISTANCES.get(planetA);
    const targetDistance = PLANETARY_DISTANCES.get(planetB);

    return formatDistance(originDistance - targetDistance);
  } catch (error) {
    if (error instanceof UnknownPlanetError) {
      throw error;
    }

    throw new DistanceComputationError('Unexpected failure while calculating distance.', {
      cause: error,
    });
  }
}

/**
 * Promise-based wrapper around {@link calculateDistance}. Demonstrates the
 * same error paths while allowing asynchronous workflows (e.g., CLI).
 */
export async function calculateDistanceAsync(planetA, planetB) {
  return new Promise((resolve, reject) => {
    queueMicrotask(() => {
      try {
        resolve(calculateDistance(planetA, planetB));
      } catch (error) {
        reject(
          error instanceof UnknownPlanetError || error instanceof DistanceComputationError
            ? error
            : new DistanceComputationError('Async distance calculation failed.', { cause: error })
        );
      }
    });
  });
}

/**
 * Safely formats the result for display, collapsing expected errors into
 * user-friendly strings while preserving unexpected failures.
 */
export function safeDistanceReport(planetA, planetB) {
  try {
    const distance = calculateDistance(planetA, planetB);
    return `The distance between ${planetA} and ${planetB} is ${distance} AU.`;
  } catch (error) {
    if (error instanceof UnknownPlanetError) {
      return `Unable to calculate distance: ${error.message}`;
    }

    if (error instanceof DistanceComputationError) {
      return 'An unexpected processing error occurred while calculating distance.';
    }

    return 'An unknown error occurred.';
  }
}
