import { data, SIZE_CONST } from './data.js';

export const getRotationSpeed = (element) => {
  const elementRotation = data[element].sideralRotation;
  // the sideralRotation of a planet is set in hours.
  // the earth rotates 360deg = 2*phi (rad) in 24h.
  // hours in seconds = hours * 3600
  return elementRotation * 3600;
};

const getSideralOrbit = (element) => {
  const elementOrbit = data[element].sideralOrbit;
  // the sideralOrbit of a planet is set in days.
  // the earth orbits around the sun (360deg = 2*phi (rad)) in 365days.
  // days in seconds = days * 86400
  return elementOrbit * 86400;
};

export const getElementDistanceFromSun = (element, realDistance) => {
  // this is the ratio of the defined sun radius to the real sun radius
  // all the other distances are calculated from this ratio
  const sizeRatio = SIZE_CONST / data.sun.equaRadius;

  const elementsDistance = {
    mercury: realDistance
      ? sizeRatio * data.mercury.semimajorAxis
      : SIZE_CONST * 3 + 1,
    venus: realDistance
      ? sizeRatio * data.venus.semimajorAxis
      : SIZE_CONST * 3 + 51,
    earth: realDistance
      ? sizeRatio * data.earth.semimajorAxis
      : SIZE_CONST * 3 + 101,
    mars: realDistance
      ? sizeRatio * data.mars.semimajorAxis
      : SIZE_CONST * 3 + 151,
    jupiter: realDistance
      ? sizeRatio * data.jupiter.semimajorAxis
      : SIZE_CONST * 3 + 251,
    saturn: realDistance
      ? sizeRatio * data.saturn.semimajorAxis
      : SIZE_CONST * 3 + 351,
    uranus: realDistance
      ? sizeRatio * data.uranus.semimajorAxis
      : SIZE_CONST * 3 + 451,
    neptune: realDistance
      ? sizeRatio * data.neptune.semimajorAxis
      : SIZE_CONST * 3 + 551,
    moon: realDistance ? sizeRatio * data.moon.semimajorAxis : 20, // moons distance from earth
  };
  return elementsDistance[element];
};

export const getElementDiameter = (element, realDiameter) => {
  // this is the ratio of the defined sun radius to the real sun radius
  // all the other radius are calculated from this ratio
  const sizeRatio = SIZE_CONST / data.sun.equaRadius;

  const elementsDiameter = {
    mercury: realDiameter
      ? sizeRatio * data.mercury.equaRadius
      : SIZE_CONST * 0.1,
    venus: realDiameter
      ? sizeRatio * data.venus.equaRadius
      : SIZE_CONST * 0.2,
    earth: realDiameter
      ? sizeRatio * data.earth.equaRadius
      : SIZE_CONST * 0.2,
    mars: realDiameter
      ? sizeRatio * data.mars.equaRadius
      : SIZE_CONST * 0.2,
    jupiter: realDiameter
      ? sizeRatio * data.jupiter.equaRadius
      : SIZE_CONST * 0.5,
    saturn: realDiameter
      ? sizeRatio * data.saturn.equaRadius
      : SIZE_CONST * 0.4,
    uranus: realDiameter
      ? sizeRatio * data.uranus.equaRadius
      : SIZE_CONST * 0.3,
    neptune: realDiameter
      ? sizeRatio * data.neptune.equaRadius
      : SIZE_CONST * 0.3,
    moon: realDiameter
      ? sizeRatio * data.moon.equaRadius
      : SIZE_CONST *
        0.2 *
        (data.moon.equaRadius / data.earth.equaRadius),
  };
  return elementsDiameter[element];
};

export const getRingsDiameter = (element, realDiameter) => {
  // this is the ratio of the defined sun radius to the real sun radius
  // all the other real radius are calculated from this ratio
  const sizeRatio = SIZE_CONST / data.sun.equaRadius;

  const saturnRadius = getElementDiameter('saturn', realDiameter);
  const uranusRadius = getElementDiameter('uranus', realDiameter);

  const ringsDiameter = {
    saturn: {
      ringsInnerDiameter: realDiameter
        ? sizeRatio * data.saturn.ringsInnerRadius
        : saturnRadius *
          (data.saturn.ringsInnerRadius / data.saturn.equaRadius),
      ringsOuterDiameter: realDiameter
        ? sizeRatio * data.saturn.ringsOuterRadius
        : saturnRadius *
          (data.saturn.ringsOuterRadius / data.saturn.equaRadius),
    },
    uranus: {
      ringsInnerDiameter: realDiameter
        ? sizeRatio * data.uranus.ringsInnerRadius
        : uranusRadius *
          (data.uranus.ringsInnerRadius / data.uranus.equaRadius),
      ringsOuterDiameter: realDiameter
        ? sizeRatio * data.uranus.ringsOuterRadius
        : uranusRadius *
          (data.uranus.ringsOuterRadius / data.uranus.equaRadius),
    },
  };
  return ringsDiameter[element];
};

export const getAxialTiltInRad = (element) => {
  const tiltDeg = data[element].axialTilt;
  const tiltRad = tiltDeg * (Math.PI / 180);
  return tiltRad;
};

export const getElementData = (element) => {
  const distance = getElementDistanceFromSun(element);
  const orbit = getSideralOrbit(element);
  const rotation = getRotationSpeed(element);
  return { distance, orbit, rotation };
};
