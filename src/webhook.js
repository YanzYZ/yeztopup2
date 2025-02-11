const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const config = require("../config/config.json");
const { sendRconCommand } = require("./rcon");

const app = express();
const PORT = config.server.port;

// Middleware buat parsing JSON
app.use(bodyParser.json());

// Webhook Handler
app.post("/webhook", async (req, res) => {
    const signature = req.headers["x-signature"];
    const payload = JSON.stringify(req.body);
    const computedSignature = crypto.createHmac("sha256", config.secret_key).update(payload).digest("hex");

    if (signature !== computedSignature) {
        return res.status(403).send("Invalid signature");
    }

    const { customer_name, package_name } = req.body;

    let command;
    if (package_name === "VIP") {
        command = `lp user ${customer_name} parent add vip`;
    } else if (package_name === "Saldo 10000") {
        command = `points give ${customer_name} 10000`;
    }

    if (command) {
        await sendRconCommand(command);
        res.status(200).json({ status: "success", message: "Command sent" });
    } else {
        res.status(400).json({ status: "failed", message: "Invalid package" });
    }
});

// Jalankan server webhook
app.listen(PORT, () => {
    console.log(`Webhook listening on port ${PORT}`);
});
