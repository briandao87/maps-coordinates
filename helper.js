const geolib = require('geolib');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const getPoint = (coordinate) => {
    return { latitude: coordinate[0], longitude: coordinate[1] };
}

const getVerticalCoordinate = (coordinates, numRows, column) => {
    for(let i = 1; i < numRows; i++) {
        const distance = geolib.getDistance(coordinates[0][column], coordinates[numRows][column])/numRows;
        const bearing = geolib.getRhumbLineBearing(coordinates[0][column], coordinates[numRows][column]);
        coordinates[i][column] = geolib.computeDestinationPoint(coordinates[0][column], distance * i, bearing);
    }
}

const getHorizontalCoordinate = (coordinates, numCols, row) => {
    for(let i = 1; i < numCols; i++) {
        const distance = geolib.getDistance(coordinates[row][0], coordinates[row][numCols])/numCols;
        const bearing = geolib.getRhumbLineBearing(coordinates[row][0], coordinates[row][numCols]);
        coordinates[row][i] = geolib.computeDestinationPoint(coordinates[row][0], distance * i, bearing);
    }
}

exports.calculateCoordinates = (pointA, pointB, pointC, pointD, numRows, numCols) => {
    const coordinates = Array.from({ length: numRows + 1 }, () => Array(numCols + 1).fill(0));
    coordinates[0][0] = getPoint(pointA);
    coordinates[0][numCols] = getPoint(pointB);
    coordinates[numRows][numCols] = getPoint(pointC);
    coordinates[numRows][0] = getPoint(pointD);

    // get coordinate of first vertical line
    getVerticalCoordinate(coordinates, numRows, 0);

    // get coordinate of last vertical line
    getVerticalCoordinate(coordinates, numRows, numCols);

    for (let i = 0; i <= numRows; i++) {
        getHorizontalCoordinate(coordinates, numCols, i);
    }

    return coordinates;
}

exports.writeCSV = (data, fileName) => {
    // Define the CSV fields and create a CSV writer
const csvWriter = createCsvWriter({
    path: fileName,
    header: Object.keys(data[0]).map(key => ({ id: key, title: key })),
});

// Write JSON data to CSV
csvWriter.writeRecords(data)
    .then(() => {
        console.log('CSV file has been written successfully.');
        console.log('Open "coordinates.csv" and update Array_name.\n');
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });
}

exports.listPoints = (coordinates) => {
    const listPoints = [];
    for (let row = 0; row < coordinates.length; row++) {
        for (let column = 0; column < coordinates[row].length; column++) {
            listPoints.push(
                {
                    lat: coordinates[row][column].latitude,
                    lng: coordinates[row][column].longitude
                }
            );
        }
    }
    return listPoints;
}