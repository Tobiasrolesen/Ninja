//INGEN try catch i denne klasse da vi håndtere fejlen i de klasser som kalder denne klasse.

//Vi importere fs/promises da det virker med await
const fs = require('fs/promises');
class FileService {
    constructor(filePath){
        this.filePath = filePath;
    }
    //Her bruger vi async (et promise) så vi ved at beskeden kommer senere når det er læst.
    async read(){
        //Her fortæller vi med await and imens den venter kan node tage sig af andre request. (UTF8 er normal tekst i stedet for rå bytes)
        return await fs.readFile(this.filePath, 'utf8')
    }
}
//Vi gør filen offentlig.
module.exports = FileService;