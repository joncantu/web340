

# Contents
## Week 8 - Forensic Reconstruction (File System & TDD)

### Week 8 Introduction

Last week, you intentionally broke something. You started with a working Duplex stream implementation, applied a constrained AI refactor, and observed how shared state and timing altered behavior. The point was not to criticize AI. The point was to recognize how easily behavior can shift in asynchronous systems without obvious syntax errors. This week moves from observation to correction.

In professional environments, identifying instability is only half the job. The expectation is that you can stabilize the system, remove structural weaknesses, and prove that the repair works. This week focuses on Node.js’s built-in fs module. On the surface, file operations are straightforward: write data, read data, handle errors. In practice, small structural decisions determine whether a system is reliable or fragile.

Common weaknesses in AI-generated file system code include:

 - Using unstable relative paths
 - Returning inconsistent data types
 - Allowing raw errors to bubble up without context
 - Ignoring missing-file scenarios
 - Failing to parse JSON consistently
 - Writing data without validating structure

The starter solution for this week simulates something you will see in real environments: code that mostly works, but contains structural weaknesses. It writes files. It reads files. It passes in some cases. But it is not stable. Your job is not to rewrite the system from scratch. Your job is to repair it using Test-Driven Development. You already have the tests. They define expected behavior. If your implementation passes consistently and behaves predictably under failure conditions, then you have stabilized it.

This week is about disciplined correction:

 - Stable path handling using __dirname
 - Consistent JSON parsing
 - Explicit error handling
 - Predictable return types
 - Clear, meaningful error messages

In production systems, file operations are often a dependency for larger systems. If file behavior is inconsistent, everything built on top of it becomes unstable. Week 7 trained your ability to detect instability. Week 8 trains your ability to eliminate it.

### Contents of this Week:
 - Reading
 - Discussion 8.1 - Repairing File System Instability
 - Assignment 8.2 - Forensic Reconstruction with the File System Module
 - Quiz 8.3

### Objectives:
 - Repair AI-influenced file system code using TDD
 - Implement stable path handling using __dirname and path.join
 - Ensure consistent return types
 - Throw controlled, meaningful errors
 - Use unit tests as verification of stability

## Weekly Discussion Topic

For this week's discussion topic I selected "How does TDD reduce risk when stabilizing file operations?"

In all of my years as an engineer working on software, file operations are inherently "dirty." Unlike pure functions, fs operations depend on an external state that you do not fully control. Test-Driven Development (TDD) isn't just a workflow; it is a critical risk-mitigation strategy for stabilizing these volatile operations.

You need to define the expected behavior. Without TDD, "correct" is simply whatever happened during your last manual execution. In a file-based environment, this is dangerous. TDD forces you to define observable expectations before you write a single line of production code. You aren't just coding; you are establishing a contract. If your Node script expects to parse a .json configuration, the test mandates exactly what happens when that file is valid—and, more importantly, when it is not.

You also need to expose hidden assumptions (there always seem to be assumptions around file operations).  File systems are full of hidden traps that vary between environments. TDD makes these assumptions visible:
 
Permissions: Does your code handle file permission errors (for example: a restricted Linux directory)?
Paths: Are you using path.join() to ensure compatibility across Unix-like systems?
Data Integrity: What if the file exists but is empty or malformed? By writing a test for a "File Not Found" scenario first, you ensure your application fails gracefully rather than crashing the entire process.

All software projects evolve. You might start with fs.readFileSync for simplicity but later realize you need fs.createReadStream for better performance with large files. TDD provides a safety net. When you swap the underlying implementation, your tests verify that the output and behavior remain consistent. This prevents regressions, ensuring that a performance boost doesn't break your data formatting.

Try using atomic controlled changes. The "Red-Green-Refactor" cycle discourages "cowboy coding." Instead of rewriting an entire module and hoping it works, you make one targeted change at a time. For file system stability, this is the difference between a fragile script and a production-grade tool. TDD encourages small, verified steps, reducing the risk of introducing complex bugs into your I/O logic.


### REFERENCES:
 - Richard Krasso, Weekly Instructor Readings, Week 8
 - Richard Krasso, 'Pragmatic Node.js', (2026), "Chapter 8. File System"
 - YouTube, Sabeel Khan, "Node.js File System Crash Course | Beginner Friendly", November 2025, https://www.youtube.com/watch?v=mSl5j4JwV7g&t=688s


# Assignment 8.2 - Forensic Reconstruction with the File System Module

## Assignment Instructions

The implementation provided this week works in limited situations. It can write data to a file. It can read data from a file. However, it relies on unstable relative paths, returns inconsistent data types, and does not handle missing-file scenarios in a controlled way. This is intentional.

In real-world environments, you will often inherit code that “mostly works.” It may have been generated or modified by AI. It may have been written quickly under time pressure. Your job is not to criticize how it was written. Your job is to stabilize it.

You must use TDD principles. The tests define expected behavior. When the tests fail, you will implement targeted corrections. When they pass, you will verify consistency and refactor carefully if needed.

Your repairs must include:
 - Stable path resolution using __dirname and path.join
 - Explicit JSON serialization and parsing
 - Controlled error handling when a file does not exist
 - Consistent return type (parsed object)

This is not about adding features. It is about eliminating structural weakness.

### What's In It For Me?
Most production instability does not come from complex logic. It comes from assumptions:
 - Assuming a file exists
 - Assuming a working directory never changes
 - Assuming JSON always parses
 - Assuming downstream code will handle inconsistent return types

If you can stabilize file I/O correctly, you can prevent larger system failures later.

This assignment strengthens your ability to:
- Harden weak implementations
- Write predictable file operations
- Use tests as proof
- Make deliberate architectural decisions

These are not theoretical skills. They are practical.

### Required Action:
### Part I - Understand the Failure
To access the starter project for this assignment, please visit the courses GitHub repository. Before making changes, do the following:

1). Download the starter project.
2). Run npm install.
3). Run npm test.
4). Observe failing tests.

Identify what the implementation is currently doing versus what the tests expect.

Do not fix the code yet.

### Part II - Make the Repair
Modify the code to meet the following requirements:
 - Use __dirname and path.join to build file paths.
 - Use const for file name declarations.
 - Ensure writeCharacter writes valid JSON.
 - Ensure readCharacter returns a parsed object.
 - Throw a meaningful Error if the file does not exist.
 - Ensure all tests pass consistently.

Follow TDD:
 - Run failing test.
 - Implement minimal correction.
 - Confirm test passes.
 - Repeat.

Do not forget to stage, commit, and push your work to GitHub. 

### Part III - Reflection
Write a short reflection (8-10 sentences) explaining:
 - What was structurally wrong in the original implementation
 - Why using __dirname matters
 - Why throwing explicit errors is preferable to silent failure
 - How TDD guided your repair

#### Submission Instructions:
- Due Date: Day 7 of the week by 11:59 PM (CST/CDT).
- Solution folder, packaged as a ZIP file.
- Link to your web-340 GitHub repository
- Reflection document (DOCX or PDF)
