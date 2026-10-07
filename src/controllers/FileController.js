class FileController {
    //Controlleren får her en service injected ind så den ikke selv skal lave den.
    constructor(fileService) {
        this.fileService = fileService;
    }

    //Vi laver en metode readFile med try catch
    readFile = async (req, res) => {
        //Vi prøver at læse filen, ved succes sender vi 200 med content
        try {
            const content = await this.fileService.read();
            res.status(200).json({content: content});

            //Ved fejl sender vi 500 med en tekst "Kunne ikke læse filen"
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Kunne ikke læse filen'});
        }
    }

    writeFile = async (req, res) => {
        //tjekker om der overhovedet findes en body
        if (!req.body || req.body.content === undefined) {
            return res.status(400).json({error: "Feltet `content` mangler"})
        }

        //gemmer værdien af body.content på et objekt med navn content
        const content = req.body.content;

        //Tjekker om content fx er en string eller og om det er tomt for tekst.
        if (typeof content !== 'string' || content.trim() === '') {
            return res.status(400).json({error: "`content` skal være en tekst og må ikke være tom"})
        }

        //Vi skriver til filen med succes eller fejl
        try {
            await this.fileService.write(content);
            res.status(200).json({message: 'filen er opdateret', content: content});

        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'kunne ikke skrive til filen'})
        }
    }
}

//Filen gøres offentlig
module.exports = FileController;