const exec = require('child_process');
const express = require('express');
const dotenv = require('dotenv');
const fs = require('fs');

const logFilePath = path.join(__dirname, '/logs/execution.log');

function logToFile(message) {
    const timeStampedMessage = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFile(logFilePath, timeStampedMessage, (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      }
    });
}

const express = require('express');
const app = express();
dotenv.config();


// Server Setup
app.get('/check-node-cron', (req, res) => {
    logToFile("Check Node-Cron");
    console.log(res);
    res.send('Node-cron Is Running');
});

app.get('/backup-now', (req, res) => {
    logToFile("Backup Now");
    exec("sh ~/script/script_backup.sh", function(error, stdout, stderr) {
        logToFile('stdout: ' + stdout);
        logToFile('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });
    res.status(200).send("Backup Success");
})

app.listen(process.env.PORT, () => {
  console.log(`Server is Running On Port ${process.env.PORT}`);
});