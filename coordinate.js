const geolib = require('geolib');

const pointA = { latitude: 36.408184528499255, longitude: 140.35281391591622 };
const pointB = { latitude: 36.408182369833256, longitude: 140.3532229528019 };

// Calculate the distance from A to B
const distanceAB = geolib.getDistance(pointA, pointB);

// Calculate the distances from A to C, C to D, and D to B
const distanceAC = distanceAB / 3;

// Calculate the coordinates of points C and D
const bearingAB = geolib.getRhumbLineBearing(pointA, pointB);

const pointC = geolib.computeDestinationPoint(pointA, distanceAC, bearingAB);
const pointD = geolib.computeDestinationPoint(pointA, 2 * distanceAC, bearingAB);

console.log("Point C Latitude:", pointC.latitude);
console.log("Point C Longitude:", pointC.longitude);
console.log("Point D Latitude:", pointD.latitude);
console.log("Point D Longitude:", pointD.longitude);
