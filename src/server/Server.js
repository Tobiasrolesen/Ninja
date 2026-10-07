//Importer express
const express = require('express');
class Server {
    constructor(fileController) {
        //file controller sendes direkte ind via constructor
        this.fileController = fileController;
        //Opretter serveren på objektet
        this.app = express();
        this.registerRoutes();
        this.registerNotFound();
    }
    //Hvis en bruger laver en GET request sender vi en godkendt status 200 og noget json tekst.
    registerRoutes() {
        this.app.get('/', (req, res) => {
            res.status(200).json({message: 'Serveren kører!'});
        })
        this.app.get('/readFile', this.fileController.readFile);
    }
    //Hvis det ikke matcher en route vi har sender vi en 404 med en fejl til routen.
    registerNotFound() {
        this.app.use((req, res) => {
            res.status(404).json({error: `ruten ${req.url} findes ikke`});
        });
    }
    //Her starter vi serveren på porten
    start(port){
        this.app.listen(port, () =>{
            console.log(`Server started at http://localhost:${port}`);
        });
    }
}
//Her gør vi filen offentlig for de andre klasser.
module.exports = Server;