import _http from "http";
import _https from "https";
import _url from "url";
import _fs from "fs";
import _express from "express";
import _dotenv from "dotenv";
import _cors from "cors";
import _mssql from "mssql";

//#region SETUP
const CONNECTION_STRING: string = process.env.CONNECTION_STRING;
const app = _express();

_dotenv.config({ "path": ".env" });

// HTTP
const PORT: number = parseInt(process.env.PORT);
let error_page;
const http_server = _http.createServer(app);
http_server.listen(PORT, () => {
    init();
    console.log(`Server HTTP in ascolto sulla porta ${PORT}`);
});

// HTTPS
/*const PORT: number = parseInt(process.env.PORT);
let error_page;
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

const whitelist = [
    "http://localhost:3000",
    "https://localhost:3001",
    "http://localhost:4200"
];

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) // browser direct call
            return callback(null, true);
        if (whitelist.indexOf(origin) === -1) {
            var msg = `The CORS policy for this site does not allow access from the specified Origin.`
            return callback(new Error(msg), false);
        }
        else
            return callback(null, true);
    },
    credentials: true
};
app.use("/", _cors(corsOptions));
//#endregion

//#region ROUTES
app.get("/api/", async (req, res, next) => { });

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