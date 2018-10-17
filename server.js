const fetch = require('node-fetch');

const url = "http://localhost:18443";
const password = "mySecretPassword";

const express = require("express");
const app = express();
const port = 8080;

app.use(express.static(__dirname + "/static"));

app.get("/api/balance", (req, res) => {
    sendRequest({
        method: "getbalance"
    }, res)
});

app.get("/api/newaddress", (req, res) => {
    sendRequest({
        method: "getnewaddress",
    }, res)
});

app.post("/api/send", (req, res) => {
    sendRequest({
        method: "sendtoaddress",
        params: [req.query.address, req.query.amount]
    }, res)
});

app.get("/api/unspenttransactions", (req, res) => {
    sendRequest({
        method: "listunspent",
        params: [req.query.unconfirmed === "true" ? 0 : 1]
    }, res)
});

app.listen(port, () => {
    console.log("running");
});

function sendRequest(rpc, res) {
    let rpcBody = JSON.stringify(rpc);
    let httpRequest = {
        method: "POST",
        headers: {
            "Authorization": "Basic " + Buffer.from(":" + password).toString("base64"),
            "Content-Type": "text/plain"
        },
        body: rpcBody
    };

    fetch(url, httpRequest)
        .then(response => response.json())
        .then(json => {
            console.log(rpc.method + ": " + JSON.stringify(json.result, null, 2));
            res.json(json.result);
        })
        .catch(error => console.error(error));
}