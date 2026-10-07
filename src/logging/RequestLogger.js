//Import af events
const EventEmitter = require('events');

//Arv så vi kan bruge on og emit
class RequestLogger extends EventEmitter {
    constructor() {
        //Vi kalder EventEmitters super klasse.
        super();
        //Vi tilmelder en "lytter" når objektet oprettes.
        this.on('request', (entry) => {
            this.log(entry);
        })
    }

    //Vi logger til konsollen her
    log(entry) {
        //Her fortæller vi hvad loggen skal indeholde, tid, metode (GET/POST), url og status og duration i ms)
        //Her vi notere det der skal sendes fra vores registerMiddleware
        const line = `[${entry.timestamp}] ${entry.method} ${entry.url} ${entry.status} (${entry.durationMs} ms)`;
        console.log(line);
    }
}

//Synliggøre klassen
module.exports = RequestLogger;