const { Rcon } = require("rcon-client");
const config = require("../config/config.json");

async function sendRconCommand(command) {
    const rcon = new Rcon({
        host: config.rcon.host,
        port: config.rcon.port,
        password: config.rcon.password,
    });

    try {
        await rcon.connect();
        const response = await rcon.send(command);
        console.log("RCON Response:", response);
        await rcon.end();
    } catch (err) {
        console.error("RCON Error:", err);
    }
}

module.exports = { sendRconCommand };
