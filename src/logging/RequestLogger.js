//Import af events
const EventEmitter = require('events');
const fs = require('fs/promises');

//Arv så vi kan bruge on og emit
class RequestLogger extends EventEmitter {
    constructor(logFilePath) {
        //Vi kalder EventEmitters super klasse.
        super();
        this.logFilePath = logFilePath;
        //Vi tilmelder en "lytter" når objektet oprettes.
        this.on('request', (entry) => {
            this.log(entry);
        })
    }

    //Vi logger til konsollen her
    async log(entry) {
        //Her fortæller vi hvad loggen skal indeholde, tid, metode (GET/POST), url og status og duration i ms)
        //Her vi notere det der skal sendes fra vores registerMiddleware
        const line = `[${entry.timestamp}] ${entry.method} ${entry.url} ${entry.status} (${entry.durationMs} ms)`;
        console.log(line);

        //Try/catch så serveren fortsætter selv ved fejl med fil skrivning
        //Emit venter ikke på async lyttere derfor skal vi fange fejlen direkte i log ellers er der ingen der fanger den. Emit kalder nemlig selv log
        try {
            //appendFile gør at vi skriver videre på en eksisterende fil istedet for at overwrite med writeFile, vi skifter og linje med \n
            await fs.appendFile(this.logFilePath, line + '\n', 'utf8');
        } catch (error){
            console.error('Kunne ikke skrive til logfilen:');
        }
    }
}

//Synliggøre klassen
module.exports = RequestLogger;