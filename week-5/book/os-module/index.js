"use strict";

// os-user-config.js
const os = require("os");
const path = require("path");

const userInfo = os.userInfo();
const homeDir = userInfo.homedir;

let settingsFile = `${userInfo.username}_settings.json`;
let settingsFilePath = path.join(homeDir, settingsFile);

console.log(`Hello, ${userInfo.username}! Your settings file will be stored in this file:
${settingsFilePath}.`);

// OS Information
console.group(`\nThis computer's OS information is:`);
console.log(`This computer's host name is ${os.hostname()}.`);
console.log(`This computer's operating system is ${os.type()}.`);
console.log(`This computer's operating system platform is ${os.platform()}.`);
console.log(`This computer's operating system release is ${os.release()}.`);
console.log(`This computer's operating system architecture is ${os.arch()}.`);
console.log(`This computer's operating system version is ${os.version()}.`);
console.groupEnd();

//System resources:
console.group(`\nThis computer's system resources are:`);
console.log(`This computer has ${os.cpus().length} CPUs.`);
console.log(`This computer has ${os.totalmem()} total memory.`);
console.log(`This computer has ${os.freemem()} free memory.`);
console.log(`This computer has been up for ${os.uptime()} seconds.`);
console.groupEnd();

//User information:
console.group(`\nThis computer's user information is:`);
console.log(`This computer's user info is:`);
console.log(os.userInfo());
console.log(`This computer's user ID is ${os.userInfo().uid}.`);
console.log(`This computer's group ID is ${os.userInfo().gid}.`);
console.log(`This computer's user name is ${os.userInfo().username}.`);
console.log(`This computer's home directory is ${os.userInfo().homedir}.`);
console.log(`This computer's shell is ${os.userInfo().shell}.`);
console.groupEnd();

// Define a new file in the user's home directory
let file = "plants.txt";

// Use the path module to join the home directory and the file name
let filePath = path.join(homeDir, file);
console.log(`The file path is ${filePath}.`);

