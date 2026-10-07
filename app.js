//Denne klasse opretter kun objekter og giver dem til hinanden.
const path = require('path');
const Server = require('./src/server/Server');
const FileService = require('./src/services/FileService');
const FileController = require('./src/controllers/FileController');

//Vi opretter en fuld sti til filen så det ikke betyder så meget hvilken mappe vi starter ved.
const dataFile = path.join(__dirname, 'data', 'data.txt');

//årsagen til at module.exports er vigtig i hver klasse så vi kan tilgå det her.
const fileService = new FileService(dataFile);
const fileController = new FileController(fileService);
const server = new Server(fileController);

//Sever starter på port 3000.
server.start(3000);
