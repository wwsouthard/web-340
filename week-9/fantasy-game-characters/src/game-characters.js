// game-characters.js
const { spawn } = require("child_process");
const path = require("path");

class GameCharacters {
  constructor(scriptFileName) {
    this.scriptPath = path.join(__dirname, scriptFileName);
  }

  getCharacters(callback) {
    const childProcess = spawn("node", [this.scriptPath]);

    let stdoutData = "";
    let stderrData = "";

    // Collect data from stdout
    childProcess.stdout.on("data", (data) => {
      stdoutData += data.toString();
    });

    // Collect data from stderr
    childProcess.stderr.on("data", (data) => {
      stderrData += data.toString();
      console.error(data.toString());
    });

    // Handle process completion
    childProcess.on("close", (code) => {
      if (stderrData) {
        // If there's stderr data, treat it as an error
        console.error(stderrData);
        callback(new Error(stderrData), null);
      } else if (code !== 0) {
        // If exit code is not 0, treat it as an error
        const error = new Error(`Process exited with code ${code}`);
        console.error(error.message);
        callback(error, null);
      } else {
        // Parse and return the data
        try {
          const parsedData = JSON.parse(stdoutData);
          callback(null, parsedData);
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError.message);
          callback(parseError, null);
        }
      }
    });

    // Handle spawn errors (e.g., file not found)
    childProcess.on("error", (error) => {
      console.error("Error spawning child process:", error.message);
      callback(error, null);
    });
  }
}

module.exports = { GameCharacters };
