# Chapter 5: Process, OS, Events, and Event Loop

This project implements the Chapter 5 Programming Exercise from "Pragmatic NodeJS (1st ed.)" by Richard Krasso. It demonstrates comprehensive usage of the Node.js `process` module, `os` module, process events, and the event loop concepts including `process.nextTick` and `setImmediate`.

## Project Structure

```
chapter5/
├── index.js                 # Main CLI program
├── process-info.js          # Process object features
├── system-info.js           # OS module features
├── event-demo.js            # Process events
├── next-tick-demo.js        # process.nextTick vs setImmediate
├── package.json             # Project configuration
├── README.md                # This file
└── tests/
    ├── process-info.spec.js
    ├── system-info.spec.js
    ├── event-demo.spec.js
    ├── next-tick-demo.spec.js
    └── run-all-tests.js     # Test runner
```

## Features Implemented

### 1. Process Object Features
- `process.cwd()` - Current working directory
- `process.pid` - Process ID
- `process.argv` - Command-line arguments
- `process.env` - Environment variables (set and read)
- `process.platform` - Operating system platform
- `process.title` - Process title
- `process.version` - Node.js version

### 2. Process Events
- `beforeExit` - Fired when Node.js empties its event loop
- `exit` - Fired when the process is about to exit
- `uncaughtException` - Fired when an uncaught exception occurs
- `unhandledRejection` - Fired when a promise rejection is not handled

### 3. Event Loop Demonstration
- `process.nextTick` - Executes callbacks in the current phase before moving to the next
- `setImmediate` - Executes callbacks in the check phase of the event loop
- Clear demonstration of execution order: Synchronous → process.nextTick → setTimeout → setImmediate

### 4. OS Module Features
- `os.hostname()` - System hostname
- `os.type()` - Operating system type
- `os.platform()` - Operating system platform
- `os.release()` - Operating system release
- `os.arch()` - CPU architecture
- `os.version()` - Operating system version
- `os.cpus().length` - CPU core count
- `os.totalmem()` - Total system memory
- `os.freemem()` - Free system memory
- `os.uptime()` - System uptime
- `os.userInfo()` - Current user information (uid, gid, username, homedir, shell)

### 5. Path Module Integration
- Demonstrates `path.join()` with `os.userInfo().homedir` to create file paths
- Shows integration between OS module and path module

## Installation

No external dependencies are required. This project uses only Node.js built-in modules.

## Running the Program

To run the main CLI program:

```bash
npm start
```

Or directly:

```bash
node index.js
```

The program will:
1. Display process information (cwd, pid, platform, title, version, argv)
2. Display system information (hostname, OS details, CPU, memory, uptime, user info)
3. Demonstrate path manipulation
4. Show command-line arguments
5. Display environment variables
6. Demonstrate the event loop (process.nextTick vs setImmediate)
7. Set up and demonstrate process events (beforeExit, exit)

## Running Tests

To run all tests:

```bash
npm test
```

Or directly:

```bash
node tests/run-all-tests.js
```

To run individual test files:

```bash
node tests/process-info.spec.js
node tests/system-info.spec.js
node tests/event-demo.spec.js
node tests/next-tick-demo.spec.js
```

## Test-Driven Development (TDD)

All modules are developed using TDD principles:
- Tests use Node.js `assert` library
- Each test follows the try/catch pattern
- Tests are organized in `.spec.js` files
- Tests can be run individually or all together

## Conceptual Summary

### The Event Loop

The Node.js event loop is the mechanism that allows Node.js to perform non-blocking I/O operations. It operates in phases:

1. **Timers Phase**: Executes callbacks scheduled by `setTimeout()` and `setInterval()`
2. **Pending Callbacks Phase**: Executes I/O callbacks deferred to the next loop iteration
3. **Idle, Prepare Phase**: Internal use only
4. **Poll Phase**: Fetches new I/O events and executes I/O-related callbacks
5. **Check Phase**: Executes `setImmediate()` callbacks
6. **Close Callbacks Phase**: Executes close event callbacks (e.g., `socket.on('close')`)

**process.nextTick** has the highest priority and executes callbacks in the current phase before moving to the next phase. This means `process.nextTick` callbacks will always execute before `setImmediate` callbacks, even if both are scheduled in the same event loop iteration.

**setImmediate** schedules callbacks to execute in the check phase of the event loop, after the poll phase completes.

### Process Events

Process events allow you to handle various lifecycle events of a Node.js process:

- **beforeExit**: Emitted when Node.js empties its event loop and has no additional work to schedule. The process will exit unless there are additional asynchronous operations scheduled.
- **exit**: Emitted when the process is about to exit. This is a synchronous event, so only synchronous operations can be performed.
- **uncaughtException**: Emitted when an uncaught JavaScript exception bubbles up to the event loop.
- **unhandledRejection**: Emitted when a Promise is rejected and no error handler is attached.

### OS Module

The `os` module provides operating system-related utility methods and properties. It allows you to:
- Query system information (hostname, platform, architecture, version)
- Get resource information (CPU count, memory, uptime)
- Access user information (uid, gid, username, home directory, shell)

This module is essential for building cross-platform applications that need to adapt to different operating systems.

## Author

Will Southard

## License

ISC

