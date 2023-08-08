const helper = require('./helper');

const pointA = [36.40825445236362, 140.3528147857511];
const pointB = [36.40825121436827, 140.35342901162116];
const pointC = [36.40819778741302, 140.35342431775524];
const pointD = [36.40820156507774, 140.35281009187443];
const numRows = 3;
const numCols = 3;

const coordinates = helper.calculateCoordinates(pointA, pointB, pointC, pointD, numRows, numCols);

const result = [];
for (let col = 0; col < numCols; col++) {
    for (let row = 0; row < numRows; row++) {
        result.push(
            {
                array_name: 'Array Name',
                top_left_lat: coordinates[row][col].latitude,
                top_left_long: coordinates[row][col].longitude,
                top_right_lat: coordinates[row][col+1].latitude,
                top_right_long: coordinates[row][col+1].longitude,
                bottom_left_lat: coordinates[row+1][col].latitude,
                bottom_left_long: coordinates[row+1][col].longitude,
                bottom_right_lat: coordinates[row+1][col+1].latitude,
                bottom_right_long: coordinates[row+1][col+1].longitude,
            }
        );
    }
}

// console.log(result);

// Write to CSV file
helper.writeCSV(result, 'coordinates.csv');

// get list points with coordinates to verify on the maps
const listPoints = helper.listPoints(coordinates);
// This is the list of points with coordinates to verify on the maps
console.log('Copy the list point below to index.html to see the list of points in the google maps')
console.log(listPoints);
console.log('\n');