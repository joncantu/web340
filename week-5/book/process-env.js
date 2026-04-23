
// process-env.js
// Set the environment
process.env.NODE_ENV = process.env.NODE_ENV || "development";

// Display a message based on the environment
if (process.env.NODE_ENV === "development") {
  console.log("Running in development mode");
} else if (process.env.NODE_ENV === "test") {
  console.log("Running in test mode");
} else if (process.env.NODE_ENV === "production") {
  console.log("Running in production mode");
} else {
  console.log(`Running in UNSUPPORTED mode: ${process.env.NODE_ENV}`);
}

// print the process Id
console.log(process.pid);

//Process Version:
console.log(process.version);

// print the process platform
console.log(process.platform);

// print the process title
console.log(process.title);

// print the process arguments
console.log(process.argv);

// set a process environment variable
process.env.HELLO = "Hello World";
console.log(process.env.HELLO);

// print the current working directory
console.log(process.cwd());

// print the memory usage
console.log(process.memoryUsage());

// print the uptime
console.log(process.uptime());

// print the execPath
console.log(process.execPath);

