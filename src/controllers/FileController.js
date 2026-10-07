class FileController {
    //Controlleren får her en service injected ind så den ikke selv skal lave den.
    constructor(fileService) {
        this.fileService = fileService;
    }
    //Vi laver en metode readFile med try catch
    readFile = async (req, res) => {
        //Vi prøver at læse fejlen, ved succes sender vi 200 med content
        try {
            const content = await this.fileService.read();
            res.status(200).json({content: content});

        //Ved fejl sender vi 500 med en tekst "Kunne ikke læse filen"
        } catch (error){
            res.status(500).json({error: 'Kunne ikke læse filen'});
        }
    }
}
module.exports = FileController;