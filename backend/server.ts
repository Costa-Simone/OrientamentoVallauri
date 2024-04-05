import _http from "http";
import _https from "https";
import _url from "url";
import _fs from "fs";
import _express from "express";
import _dotenv from "dotenv";
// import _cors from "cors";
import _sql from "mssql";
import { error } from "console";

//#region SETUP
const app = _express();

_dotenv.config({ "path": ".env" });

let error_page;

// HTTP
const PORT: number = parseInt(process.env.PORT) || 3001;
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
/*
const whitelist = [
    "http://localhost:3000",
    "https://localhost:3001",
    "http://localhost:4200",
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) // browser direct call
            return callback(null, true);
        if (whitelist.indexOf(origin) === -1) {
            var msg = "The CORS policy for this site does not allow access from the specified Origin."
            return callback(new Error(msg), false);
        }
        else
            return callback(null, true);
    },
    credentials: true
};

app.use("/", _cors(corsOptions));*/
//#endregion

//#region ROUTES
app.get("/api/laboratori", async (req, res, next) => {
    try {
        await _sql.connect(sqlConfig);
        const result = await _sql.query`SELECT * FROM Laboratori`;
        res.status(200).send(result)
    } catch (err) {
        res.status(404).send(error_page);
    }
});

app.get("/api/gruppi", async (req, res, next) => {
    try {
        await _sql.connect(sqlConfig);
        const result = await _sql.query`SELECT * FROM Gruppi`;
        res.status(200).send(result["recordset"])
    } catch (err) {
        res.status(404).send(error_page);
    }
});

app.get("/api/partecipanti", async (req, res, next) => {
    try {
        await _sql.connect(sqlConfig);
        const result = await _sql.query`SELECT * FROM Partecipanti`;
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(404).send(error_page);
    }
});

app.get("/api/studenti", async (req, res, next) => {
    try {
        await _sql.connect(sqlConfig);
        const result = await _sql.query`SELECT * FROM Studenti`;
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(404).send(error_page);
    }
});

app.get("/api/utenti", async (req, res, next) => {
    try {
        await _sql.connect(sqlConfig);
        const result = await _sql.query`SELECT * FROM Utenti`;
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(404).send(error_page);
    }
});

app.get("/api/messaggi", async (req, res, next) => {
    try {
        await _sql.connect(sqlConfig);
        const result = await _sql.query`SELECT * FROM Messaggi`;
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(404).send(error_page);
    }
});

app.get("/api/orari", async (req, res, next) => {
    try {
        await _sql.connect(sqlConfig);
        const result = await _sql.query`SELECT * FROM Orari`;
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(404).send(error_page);
    }
});

app.post("/api/", async (req, res, next) => { });

app.patch("/api/", async (req, res, next) => { });

app.put("/api/", async (req, res, next) => { });

app.delete("/api/", async (req, res, next) => { });
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