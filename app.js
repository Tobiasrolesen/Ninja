//Vi opretter en const som tilgår server/Server mappen og starter serveren
const Server = require('./src/server/Server');
const server = new Server();
server.start(3000);