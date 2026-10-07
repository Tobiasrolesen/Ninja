//Sender 10 GET-requests til serveren på samme tid.
const sendRequest = async (i) => {
    try {
        //Bruger fetch på read-file
        const res = await fetch('http://localhost:3000/read-file');
        const data = await res.json();
        console.log(`Klient ${i}:`, res.status, data);
    } catch (error) {
        console.error(`Klient ${i} fejl:`, error.message);
    }
};

//Ingen await i løkken, så alle requests sendes afsted med det samme uden at vente på hinanden.
for (let i = 1; i <= 10; i++) {
    sendRequest(i);
}
