import { data } from './data.js';

export const getRotationSpeed = (element) => {
  const elementRotation = data[element].sideralRotation;
  // the sideralRotation of a planet is set in hours.
  // the earth rotates 360deg = 2*phi (rad) in 24h.
  const earthRotation = data.earth.sideralRotation;
  // The rotation of earth is set to 0.01
  const rotationConst = 0.01;
  // the rotation of all other planets is then calculated from earth rotation like this:
  // (earthRotation/sideralRotation) * rotationConst
  // Example Mars: (23.9345/24.6229) * 0.01 = 0.00972
  return (earthRotation / elementRotation) * rotationConst;
};

export const getSideralOrbit = (element) => {
  const elementOrbit = data[element].sideralOrbit;
  // the sideralOrbit of a planet is set in days.
  // the earth rotates 360deg = 2*phi (rad) in 24h.
  const earthOrbit = data.earth.sideralOrbit;
  // The orbit of earth is set to 3.65
  const orbitConst = 3.65;
  // the orbits of all other planets is then calculated from earth orbit like this:
  // (earthOrbit/sideralOrbit) * rotationConst
  return (earthOrbit / elementOrbit) * orbitConst;
};

export const getElementDistanceFromSun = (element) => {
  const elementPerihelion = data[element].perihelion;
  const elementAphelion = data[element].aphelion;

  const earthPerihelion = data.earth.perihelion;
  const earthAphelion = data.earth.aphelion;

  const perihelionConst = 900;
  const AphelionConst =
    perihelionConst * (elementAphelion / elementPerihelion);

  const perihelion =
    (elementPerihelion / earthPerihelion) * perihelionConst;
  const aphelion = (elementAphelion / earthAphelion) * AphelionConst;

  return { perihelion, aphelion };
};

export const getElementDiameter = (element) => {
  const earthRadius = data.earth.equaRadius;
  const elementRadius = data[element].equaRadius;
  return 2 * (elementRadius / earthRadius);
};

export const getRingsDiameter = (element) => {
  const earthRadius = data.earth.equaRadius;
  const ringsInnerRadius = data[element].ringsInnerRadius;
  const ringsOuterRadius = data[element].ringsOuterRadius;
  const ringsInnerDiameter = 2 * (ringsInnerRadius / earthRadius);
  const ringsOuterDiameter = 2 * (ringsOuterRadius / earthRadius);
  return { ringsInnerDiameter, ringsOuterDiameter };
};

export const getAxialTiltInRad = (element) => {
  const tiltDeg = data[element].axialTilt;
  const tiltRad = tiltDeg * (Math.PI / 180);
  return tiltRad;
};
