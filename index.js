const exec = require('child_process').exec;
const express = require('express');
const fs = require('fs');
const path = require('path');
const dotenv = require("dotenv");
const cron = require('node-cron');

const logFilePath = path.join(__dirname, '/logs/execution.log');

function logToFile(message) {
    console.log(message);
    const timeStampedMessage = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFile(logFilePath, timeStampedMessage, (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      }
    });
}

const app = express();
dotenv.config();

cron.schedule("* 49 14 * * *", () => {
    try {
        logToFile("Backup Now");
        exec("sh ~/script/script_backup.sh", function(error, stdout, stderr) {
            logToFile('stdout: ' + stdout);
            logToFile('stderr: ' + stderr);
            if (error !== null) {
                logToFile('exec error: ' + error);
            }
        });
        res.status(200).send("Backup Success");
    } catch (error) {
        logToFile(error);
        res.status(500).send("Backup Failed");
    }
});

cron.schedule()

// Server Setup
app.get('/check-node-cron', (req, res) => {
    logToFile("Check Node-Cron");
    console.log(res);
    res.send('Node-cron Is Running');
});

app.get('/backup-now', (req, res) => {
    try {
        logToFile("Backup Now");
        exec("sh ~/script/script_backup.sh", function(error, stdout, stderr) {
            logToFile('stdout: ' + stdout);
            logToFile('stderr: ' + stderr);
            if (error !== null) {
                logToFile('exec error: ' + error);
            }
        });
        res.status(200).send("Backup Success");
    } catch (error) {
        logToFile(error);
        res.status(500).send("Backup Failed");
    }
})

app.listen(process.env.PORT, () => {
  console.log(`Server is Running On Port ${process.env.PORT}`);
});