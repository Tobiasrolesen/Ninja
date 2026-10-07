//Importer express
const express = require('express');

class Server {
    constructor(fileController, logger) {
        //file controller sendes direkte ind via constructor
        this.fileController = fileController;
        this.logger = logger;
        //Opretter serveren på objektet
        this.app = express();
        this.registerMiddleware();
        this.registerRoutes();
        this.registerNotFound();
        this.registerErrorHandler();
    }

    registerMiddleware() {
        //en middleWare modtager req, res og next af express derfor parameter.
        this.app.use((req, res, next) => {
            //Vi gemmer tidspunkt.
            const start = Date.now();
            //Vi ved ikke hvad svaret er endnu, derfor venter vi på res.on('finish') med at emitte, til svaret er sendt". Når vi kender svaret sender vi afsted.
            res.on('finish', () => {
                //Her sender vi data afsted med alle de nødvendige variabler
                this.logger.emit('request', {
                    timestamp: new Date().toISOString(),
                    method: req.method,
                    url: req.originalUrl,
                    status: res.statusCode,
                    durationMs: Date.now() - start,
                });
            });
            //Vi ville hænge fast hvis vi ikke brugte next, vi sender videre på samlebåndet her.
            next();
        });
        this.app.use(express.json());
    }

    //Hvis en bruger laver en GET request sender vi en godkendt status 200 og noget json tekst.
    registerRoutes() {
        this.app.get('/', (req, res) => {
            res.status(200).json({message: 'Serveren kører!'});
        })
        this.app.get('/read-file', this.fileController.readFile);
        this.app.post('/write-file', this.fileController.writeFile);
    }

    //Hvis det ikke matcher en route vi har sender vi en 404 med en fejl til routen.
    registerNotFound() {
        this.app.use((req, res) => {
            res.status(404).json({error: `ruten ${req.url} findes ikke`});
        });
    }

    //Til at håndtere fejl.
    registerErrorHandler() {
        this.app.use((error, req, res, next) => {
            //entity.pase.failed er den måde at express.json fortæller at json ikke kunne læses derfor fejlhåndtere vi den
            if (error.type === 'entity.parse.failed') {
                return res.status(400).json({error: 'Ugyldigt JSON'});
            }
            console.error(error);
            res.status(500).json({error: 'Intern server fejl'});
        });
    }

    //Her starter vi serveren på porten
    start(port) {
        this.app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    }
}

//Her gør vi filen offentlig for de andre klasser.
module.exports = Server;