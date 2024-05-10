import _http from "http";
import _https from "https";
import _url from "url";
import _fs from "fs";
import _express from "express";
import _dotenv from "dotenv";
import _cors from "cors";
import _sql from "mssql";
import { Server, Socket } from "socket.io";

//#region SETUP
const app = _express();

_dotenv.config({ "path": ".env" });

let error_page;

// HTTP
const PORT: number = parseInt(process.env.PORT) || 3000;
const http_server = _http.createServer(app);
http_server.listen(PORT, () => {
    init();
    console.log(`Server HTTP in ascolto sulla porta ${PORT}`);
});

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: 'localhost',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: false // change to true for local dev / self-signed certs
    }
}


// HTTPS
/*const PORT: number = parseInt(process.env.PORT);
const PRIVATE_KEY = _fs.readFileSync("./keys/privateKey.pem", "utf8");
const CERTIFICATE = _fs.readFileSync("./keys/certificate.crt", "utf8");
const CREDENTIALS = { "key": PRIVATE_KEY, "cert": CERTIFICATE };
const https_server = _https.createServer(CREDENTIALS, app);
https_server.listen(PORT, () => {
    init();
    console.log(`Server HTTPS in ascolto sulla porta ${PORT}`);
});
*/

function init() {
    _fs.readFile("./static/error.html", function (err, data) {
        if (err) {
            error_page = `<h1>Risorsa non trovata</h1>`;
        }
        else {
            error_page = data.toString();
        }
    });
}
//#endregion

//#region MIDDLEWARES
app.use("/", (req: any, res: any, next: any) => {
    console.log(`-----> ${req.method}: ${req.originalUrl}`);
    next();
});

app.use("/", _express.static("./static"));

app.use("/", _express.json({ "limit": "50mb" }));

app.use("/", _express.urlencoded({ "limit": "50mb", "extended": true }));

app.use("/", (req: any, res: any, next: any) => {
    if (Object.keys(req["query"]).length > 0) {
        console.log(`       ${JSON.stringify(req["query"])}`);
    }
    if (Object.keys(req["body"]).length > 0) {
        console.log(`       ${JSON.stringify(req["body"])}`);
    }
    next();
});

const corsOptions = {
    origin: function (origin, callback) {
        return callback(null, true);
    },
    credentials: true
};

app.use("/", _cors(corsOptions));

//#endregion

//#region ROUTES

//#region GET

app.get("/api/login", async (req, res, next) => {
    try {
        const PIN = req.query.pin;

        await _sql.connect(sqlConfig);
        const result = await _sql.query`SELECT s.Nominativo, g.Id FROM Gruppi g, Partecipanti p, Studenti s WHERE g.PIN=${PIN} AND p.IdGruppo=g.Id AND p.IdStudente=s.Id`;
        if (result.recordset.length > 0) {
            res.status(200).send(result.recordset[0]);
        } else {
            res.status(401).send("PIN is incorrect");
        }
    } catch (err) {
        console.log(err)
        res.status(404).send(err.message);
    }
});

app.get("/api/gruppi", async (req, res, next) => {
    try {
        await _sql.connect(sqlConfig);
        const result = await _sql.query`SELECT * FROM Gruppi`;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(404).send(err.message);
    }
});

app.get("/api/gruppi/:id", async (req, res, next) => {
    try {
        await _sql.connect(sqlConfig);
        const result = await _sql.query`SELECT * FROM Gruppi WHERE Id=${req.params.id}`;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send(result)
    } catch (err) {
        res.status(404).send(err.message);
    }
});

app.get("/api/studenti", async (req, res, next) => {
    try {
        const gruppo = req.query.gruppo;
        await _sql.connect(sqlConfig);
        const result = await _sql.query`SELECT s.Id, s.Nominativo, s.ScuolaProvenienza, s.isPresente, s.SlotITI, s.SlotLICEO, s.SlotAFM
                                        FROM Studenti s, Partecipanti p, Gruppi g WHERE s.Id=p.IdStudente AND p.IdGruppo=g.Id AND g.Id=${gruppo}`;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send(result
        )
    } catch (err) {
        console.log(err)
        res.status(404).send(err.message);
    }
});

app.get("/api/partecipanti", async (req, res, next) => {
    try {
        await _sql.connect(sqlConfig);
        const result = await _sql.query`SELECT * FROM Partecipanti`;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(404).send(err.message);
    }
});

app.get("/api/laboratori", async (req, res, next) => {
    try {
        await _sql.connect(sqlConfig);
        const result = await _sql.query`SELECT * FROM Laboratori`;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(404).send(err.message);
    }
});

app.get("/api/laboratoriByGruppo/:id", async (req, res, next) => {
    try {
        const idGruppo = req.params.id;
        await _sql.connect(sqlConfig);
        const result = await _sql.query`SELECT * FROM Laboratori l, Orari o WHERE o.IdGruppo=${idGruppo} AND l.Id=o.IdLaboratorio`;
        const countResult = await _sql.query`SELECT COUNT(*) as count FROM Laboratori l, Orari o WHERE o.IdGruppo=${idGruppo} AND l.Id=o.IdLaboratorio`;
        result.recordset.push({ "num_studenti": countResult.recordset[0].count });
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send(result)
    } catch (err) {
        res.status(404).send(err.message);
    }
});

app.get("/api/orari", async (req, res, next) => {
    try {
        await _sql.connect(sqlConfig);
        const result = await _sql.query`SELECT * FROM Orari`;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(404).send(err.message);
    }
});

app.get("/api/utenti", async (req, res, next) => {
    try {
        await _sql.connect(sqlConfig);
        const result = await _sql.query`SELECT * FROM Utenti`;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(404).send(err.message);
    }
});

app.get("/api/messaggi", async (req, res, next) => {
    try {
        await _sql.connect(sqlConfig);
        const result = await _sql.query`SELECT * FROM Messaggi ORDER BY IdDestinatario ASC, Data ASC, Orario ASC`;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(404).send(err.message);
    }
});

app.get("/api/messaggiById", async (req, res, next) => {
    try {
        let mittente = req.query.utente1;
        let destinatario = req.query.utente2;

        await _sql.connect(sqlConfig);
        const result = await _sql.query`SELECT * FROM Messaggi WHERE 
                IdMittente=${mittente} AND IdDestinatario=${destinatario}
                OR IdMittente=${destinatario} AND IdDestinatario=${mittente}`;

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(404).send(err.message);
    }
});

app.get("/api/ultimiMessaggi", async (req, res, next) => {
    try {
        let gruppi = req.query.gruppi;
        let mittente: string = '000';
        let result: any;
        let ultimiMessaggi = [];

        await _sql.connect(sqlConfig);
        for (let gruppo of gruppi) {
            let destinatario = gruppo;
            result = await _sql.query`SELECT * FROM Messaggi WHERE 
                IdMittente=${mittente} AND IdDestinatario=${destinatario}
                OR IdMittente=${destinatario} AND IdDestinatario=${mittente}`;
            if (result.recordset.length > 0) {
                ultimiMessaggi.push(result.recordset[result.recordset.length - 1]);
            }
        }

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send(ultimiMessaggi)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message);
    } finally {
        await _sql.close();
    }
});

//#endregion

//#region POST

app.post("/api/gruppoStudente", async (req, res, next) => {
    try {
        const gruppo = req.body.gruppo;
        const studente = req.body.studente;

        await _sql.connect(sqlConfig);
        const result = await _sql.query`UPDATE Partecipanti SET IdGruppo=${gruppo} FROM Partecipanti WHERE IdStudente=${studente}`;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send(result);
    } catch (err) {
        console.log(err)
        res.status(404).send(err.message);
    }
});

app.post("/api/pinGruppo/:gruppo", async (req, res, next) => {
    try {
        const gruppo = req.params.gruppo;
        const pin = req.body.pin;
        await _sql.connect(sqlConfig);
        const result = await _sql.query`UPDATE Gruppi SET PIN=${pin} WHERE Id=${gruppo}`;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send(result);
    } catch (err) {
        console.log(err)
        res.status(404).send(err.message);
    }
});

app.post("/api/presenza/:idStudente", async (req, res, next) => {
    try {
        const idStudente = req.params.idStudente;
        const isPresente = req.body.isPresente;
        await _sql.connect(sqlConfig);
        const result = await _sql.query`UPDATE Studenti SET isPresente=${isPresente} WHERE Id=${idStudente}`;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send(result);
    } catch (err) {
        console.log(err)
        res.status(404).send(err.message);
    }
});

app.post("/api/aggiungiStudenti", async (req, res, next) => {
    try {
        const studenti = req.body.students;
        await _sql.connect(sqlConfig);
        for (let studente of studenti) {
            const result = await _sql.query`INSERT INTO Studenti (Nominativo, ScuolaProvenienza, SlotITI, SlotLICEO, SlotAFM, isPresente) VALUES (${studente.Nominativo}, ${studente.ScuolaProvenienza}, ${studente.SlotITI}, ${studente.SlotLICEO}, ${studente.SlotAFM}, 0)`;
        }
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send("OK");
    } catch (err) {
        console.log(err)
        res.status(404).send(err.message);
    }
});

//#endregion

app.patch("/api/", async (req, res, next) => { });

app.put("/api/", async (req, res, next) => { });

//#region DELETE

app.delete("/api/", async (req, res, next) => { });

//#endregion

//#endregion

//#region DEFAULT ROUTES
app.use("/", (req, res, next) => {
    res.status(404);
    if (req.originalUrl.startsWith("/api/")) {
        res.send(`Api non disponibile`);
    }
    else {
        res.send(error_page);
    }
});

app.use("/", (err, req, res, next) => {
    console.log("************* SERVER ERROR ***************\n", err.stack);
    res.status(500).send(err.message);
});
//#endregion

//#region SOCKET.IO

const io = require("socket.io")(http_server, {
    cors: {
        origin: function (origin, callback) {
            return callback(null, true);
        },
        credentials: true
    }
});
io.on("connection", function (clientSocket: Socket) {
    clientSocket.on("online", function (data) {
        console.log(data)
        clientSocket.emit("JOIN-RESULT", "OK");
    });

    clientSocket.on("SEND-MESSAGE", async function (messaggio: any) {
        const now = new Date();
        const data = now.toLocaleDateString();
        const orario = now.toLocaleTimeString();

        await _sql.connect(sqlConfig);
        const result = await _sql.query`INSERT INTO Messaggi (IdMittente, IdDestinatario, Testo, Data, Orario, IdMessaggioRisposta) 
                                    VALUES (${messaggio.IdMittente}, ${messaggio.IdDestinatario}, ${messaggio.Testo}, ${data}, ${orario}, ${messaggio.IdMessaggioRisposta});
                                    SELECT SCOPE_IDENTITY() AS IdMessaggio;`;

        const IdMessaggio = result.recordset[0].IdMessaggio;
        if (IdMessaggio) {
            messaggio.Id = IdMessaggio;
            clientSocket.emit("RECEIVE-MESSAGE", messaggio);
        }
    });

    clientSocket.on("DELETE-MESSAGE", async function (idMessaggio: any) {
        await _sql.connect(sqlConfig);
        const result = await _sql.query`DELETE FROM Messaggi WHERE Id=${idMessaggio}`;
        if (result) {
            clientSocket.emit("DELETED-MESSAGE", idMessaggio);
        }
    });
});

//#endregion