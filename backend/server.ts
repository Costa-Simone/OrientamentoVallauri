import _http from "http";
import _https from "https";
import _url from "url";
import _fs from "fs";
import _express from "express";
import _dotenv from "dotenv";
import _cors from "cors";
import _sql from "mssql";
import { Server, Socket } from "socket.io";
import _bcrypt from "bcryptjs";
import _jwt from "jsonwebtoken";

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

const SIMMETRIC_KEY = _fs.readFileSync("./keys/encryptionKey.txt", "utf8")

const io = require("socket.io")(http_server, {
    cors: {
        origin: function (origin, callback) {
            return callback(null, true);
        },
        credentials: true
    }
});

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

//8 LOGIN
app.post("/api/loginAdmin", async (req, res, next) => {
    let username = req.body.username
    let password = req.body.password

    await _sql.connect(sqlConfig);
    // da aggiornare con la pwd cryptata
    const result = await _sql.query`SELECT * FROM Admin WHERE Id=${username}`;
    let user = result["recordset"][0]
    console.log(user)
    if (!user) {
        res.status(401).send("Username o password errati");
    } else {
        _bcrypt.compare(password, user["Password"], (err, success) => {
            if (err) {
                res.status(401).send("Username o password errati");
            } else {
                let token = creaToken(user)

                res.setHeader("authorization", token)
                //! Fa si che la header authorization venga restituita al client
                res.setHeader("access-control-expose-headers", "authorization")

                res.send(JSON.stringify("Ok"))
            }
        })
        // if (user["Password"].trim() == password) {
        //     let token = creaToken(user)

        //     res.setHeader("authorization", token)
        //     //! Fa si che la header authorization venga restituita al client
        //     res.setHeader("access-control-expose-headers", "authorization")

        //         res.send(JSON.stringify("Ok"))
        //     } else {
        //         res.status(401).send("Username o password errati");
        //     }
        // }
    }
});


function creaToken(user) {
    let currentDate = Math.floor(new Date().getTime() / 1000)
    let payLoad = {
        "username": user["Id"] || user["username"],
        "iat": user.iat || currentDate,
        "exp": currentDate + parseInt(process.env.TOKEN_DURATION!)
    }

    return _jwt.sign(payLoad, SIMMETRIC_KEY)
}

// 10. Controllo del token
// app.use("/api/", (req, res, next) => {
//     if (req["body"]["skipCheckToken"]) {
//         next()
//     } else {
//         if (!req.headers["authorization"]) {
//             res.status(403).send("Token mancante")
//         }
//         else {
//             let token = req.headers["authorization"]
//             _jwt.verify(token, SIMMETRIC_KEY, (err, payload) => {
//                 if (err) {
//                     res.status(403).send("Token corrotto " + err)
//                 }
//                 else {
//                     let token = creaToken(payload)

//                     res.setHeader("authorization", token)
//                     //! Fa si che la header authorization venga restituita al client
//                     res.setHeader("access-control-expose-headers", "authorization")
//                     req["payload"] = payload
//                     next()
//                 }
//             })
//         }
//     }
// })

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
        const result = await _sql.query`SELECT * FROM Gruppi WHERE Id != '000' AND Id != '999'`;
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
        const result = await _sql.query`SELECT l.*, o.IdLaboratorio,o.OrarioEffettivoIngresso FROM Laboratori l, Orari o WHERE o.IdGruppo=${idGruppo} AND l.Id=o.IdLaboratorio`;
        const countResult = await _sql.query`SELECT COUNT(*) as count FROM Laboratori l, Orari o WHERE o.IdGruppo=${idGruppo} AND l.Id=o.IdLaboratorio`;
        result.recordset.push({ "num_studenti": countResult.recordset[0].count });
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send(result)
    } catch (err) {
        res.status(404).send(err.message);
    }
});

app.get("/api/laboratorio/:idGruppo/:idLaboratorio", async (req, res, next) => {
    try {
        await _sql.connect(sqlConfig);
        const result = await _sql.query`SELECT * FROM Orari WHERE IdLaboratorio=${req.params.idLaboratorio} AND IdGruppo=${req.params.idGruppo}`;
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

        let result: any;
        await _sql.connect(sqlConfig);

        if (mittente == '999' || destinatario == '999') {
            result = await _sql.query`SELECT * FROM Messaggi WHERE IdDestinatario='999'`;
        } else
            result = await _sql.query`SELECT * FROM Messaggi WHERE 
                IdMittente=${mittente} AND IdDestinatario=${destinatario}
                OR IdMittente=${destinatario} AND IdDestinatario=${mittente}`


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
        if (Array.isArray(gruppi)) {
            for (let gruppo of gruppi) {
                let destinatario = gruppo;
                result = await _sql.query`SELECT * FROM Messaggi WHERE 
                    IdMittente=${mittente} AND IdDestinatario=${destinatario}
                    OR IdMittente=${destinatario} AND IdDestinatario=${mittente}`;
                if (result.recordset.length > 0) {
                    ultimiMessaggi.push(result.recordset[result.recordset.length - 1]);
                }
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

app.get("/api/orari/:id", async (req, res, next) => {
    try {
        await _sql.connect(sqlConfig);
        const result = await _sql.query`SELECT * FROM Orari WHERE IdGruppo=${req.params.id}`;

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(404).send(err.message);
    }
})

app.get("/api/orariByLab/:lab", async (req, res, next) => {
    try {
        await _sql.connect(sqlConfig);
        const result = await _sql.query`SELECT o.* FROM Orari o, Laboratori l WHERE o.IdLaboratorio=l.Id AND l.Indirizzo=${req.params.lab}`;

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(404).send(err.message);
    }
})

//#endregion

//#region POST

app.post("/api/gruppi", async (req, res, next) => {
    try {
        await _sql.connect(sqlConfig);

        for (let element of req.body.gruppi) {
            const result = await _sql.query`INSERT INTO Gruppi (Id, Orario, OrarioFine) VALUES (${element.Id}, ${element.Orario}, ${element.OrarioFine})`;
        }

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send(JSON.stringify("ok"))
    } catch (err) {
        console.log(err)
        res.status(404).send(err.message);
    }
})

app.post("/api/orari", async (req, res, next) => {
    try {
        await _sql.connect(sqlConfig);

        for (let element of req.body.orari) {
            console.log(element)
            const result = await _sql.query`INSERT INTO Orari (IdGruppo, IdLaboratorio, OrarioPrevistoIngresso) VALUES (${element.IdGruppo}, ${element.IdLaboratorio}, ${element.OrarioPrevistoIngresso})`;
        }

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send("ok")
    } catch (err) {
        console.log(err)
        res.status(404).send(err.message);
    }
})


app.post("/api/orarioEntrata", async (req, res, next) => {
    try {
        const idLaboratorio = req.body.IdLaboratorio;
        const idGruppo = req.body.IdGruppo;
        const hour = new Date().getHours().toString().padStart(2, '0');
        const minutes = new Date().getMinutes().toString().padStart(2, '0');
        const time = hour + ':' + minutes;

        await _sql.connect(sqlConfig);
        const result = await _sql.query`UPDATE Orari SET OrarioEffettivoIngresso=${time} WHERE IdLaboratorio=${idLaboratorio} AND IdGruppo=${idGruppo};
                                        UPDATE Laboratori SET IdGruppo=${idGruppo} WHERE Id=${idLaboratorio}`;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send(result);

        io.emit("ENTRATA-LAB", JSON.stringify({ "IdLaboratorio": idLaboratorio, "IdGruppo": idGruppo, "OrarioEffettivoIngresso": time }));

    } catch (err) {
        console.log(err)
        res.status(404).send(err.message);
    }
});

app.post("/api/gruppoStudente", async (req, res, next) => {
    try {
        const gruppo = req.body.gruppo;
        const studente = req.body.studente;
        const oldGruppo = req.body.oldGruppo;

        await _sql.connect(sqlConfig);
        const result1 = await _sql.query`UPDATE Studenti SET SlotITI=${gruppo} FROM Studenti WHERE Id=${studente}`;
        const result = await _sql.query`UPDATE Partecipanti SET IdGruppo=${gruppo} FROM Partecipanti WHERE IdStudente=${studente} AND IdGruppo=${oldGruppo}`;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send(result);
    } catch (err) {
        console.log(err)
        res.status(404).send(err.message);
    }
});

app.post("/api/aggiungiGruppo", async (req, res, next) => {
    try {
        const gruppo = req.body.gruppo;

        await _sql.connect(sqlConfig);
        const result = await _sql.query`INSERT INTO Gruppi (Id, PIN, Orario, OrarioFine) VALUES (${gruppo.Id}, ${gruppo.PIN}, ${gruppo.Orario}, ${gruppo.OrarioFine})`;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send(result);
    } catch (err) {
        console.log(err)
        res.status(404).send(err.message);
    }
})

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
        console.log(studenti)
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

app.post("/api/aggiungiStudente", async (req, res, next) => {
    try {
        const studente = req.body.studente;
        await _sql.connect(sqlConfig);
        const result = await _sql.query`INSERT INTO Studenti (Nominativo, ScuolaProvenienza, SlotITI, SlotLICEO, SlotAFM, isPresente) VALUES (${studente.Nominativo}, ${studente.ScuolaProvenienza}, ${studente.SlotITI}, ${studente.SlotLICEO}, ${studente.SlotAFM}, 0)`;
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.status(200).send(JSON.stringify("Ok"));
    } catch (err) {
        console.log(err)
        res.status(404).send(err.message);
    }
});

//#endregion

//#region PATCH


//#endregion

//#region DELETE

app.delete("/api/studenti", async (req, res, next) => {
    try {
        await _sql.connect(sqlConfig);
        const result = await _sql.query`DELETE FROM Partecipanti; DELETE FROM Studenti`;

        if (result) {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(200).send("OK");
        }
    } catch (err) {
        console.log(err)
        res.status(404).send(err.message);
    }
});

app.delete("/api/gruppi", async (req, res, next) => {
    try {
        await _sql.connect(sqlConfig);
        const result = await _sql.query`DELETE FROM Partecipanti; DELETE FROM Studenti;
                                        DELETE FROM Messaggi; 
                                        UPDATE Laboratori SET IdGruppo='FFF' WHERE IdGruppo != 'FFF';
                                        DELETE FROM Gruppi WHERE Id != '000' AND Id != '999' AND Id != 'FFF';
                                        DELETE FROM Orari`;

        if (result) {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(200).send("OK");
        }
    } catch (err) {
        console.log(err)
        res.status(404).send(err.message);
    }
});

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

io.on("connection", function (clientSocket: Socket) {

    clientSocket.on("online", function (data) {
        console.log(data)
        clientSocket.emit("JOIN-RESULT", "OK");
    });

    //#region CHAT

    clientSocket.on("JOIN-CHAT", async function (idUtente: any) {
        console.log(`Utente ${idUtente} connesso`);
        clientSocket.join(idUtente);
    });

    clientSocket.on("LEAVE-CHAT", async function (idUtente: any) {
        console.log(`Utente ${idUtente} disconnesso`);
        clientSocket.leave(idUtente);
    });

    clientSocket.on("SEND-MESSAGE", async function (messaggio: any) {
        const now = new Date();
        const data = now.toLocaleDateString();
        const orario = now.toLocaleTimeString().split(" ")[0];

        await _sql.connect(sqlConfig);
        const result = await _sql.query`INSERT INTO Messaggi (IdMittente, IdDestinatario, Testo, Data, Orario, IdMessaggioRisposta) 
                                    VALUES (${messaggio.IdMittente}, ${messaggio.IdDestinatario}, ${messaggio.Testo}, ${data}, ${orario}, ${messaggio.IdMessaggioRisposta});
                                    SELECT SCOPE_IDENTITY() AS IdMessaggio;`;

        const IdMessaggio = result.recordset[0].IdMessaggio;
        if (IdMessaggio) {
            messaggio.Id = IdMessaggio;
            messaggio.Orario = orario;

            console.log(messaggio);
            if (messaggio.IdMittente == '999' || messaggio.IdDestinatario == '999') {
                clientSocket.to(messaggio.IdDestinatario).emit('NEW-MESSAGE', messaggio);
            } else {
                clientSocket.to(messaggio.IdDestinatario).emit('NEW-MESSAGE', messaggio);
                clientSocket.to(messaggio.IdMittente).emit('NEW-MESSAGE', messaggio);
            }

            // clientSocket.emit(`INSERTED-MESSAGE-${messaggio.IdDestinatario}`, messaggio); //quando viene mandato un messaggio, lo inoltro a chi deve riceverlo
            clientSocket.emit("INSERTED-MESSAGE", messaggio);
        }
    });

    clientSocket.on("DELETE-MESSAGE", async function (messaggio: any) {
        await _sql.connect(sqlConfig);
        const result = await _sql.query`DELETE FROM Messaggi WHERE Id=${messaggio.id}`;
        console.log(messaggio)
        if (result) {
            clientSocket.to(messaggio.idDestinatario).emit("DELETED-MESSAGE", messaggio.id);
        }
    });

    //#endregion
});

//#endregion