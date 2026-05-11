# Assignment Instructions

In most real-world environments, instability does not come from obvious syntax errors. It comes from small structural decisions that alter behavior under timing pressure. This assignment is designed to show you how easily that can happen when AI modifies asynchronous systems.

The starter implementation works correctly. It processes input and formats character descriptions through a Duplex stream. The behavior is predictable, and the unit tests verify that. You will then apply a constrained AI prompt that introduces two changes: shared instance-level state and asynchronous delay. Neither of those changes is inherently wrong. However, when combined inside a stream implementation, they can introduce subtle timing issues and data reuse problems.

Your task is to run the tests repeatedly, observe behavior across multiple writes, and document exactly what is happening. You should identify where shared state was introduced, how asynchronous timing affects output, and what evidence proves instability. This is not about criticizing AI. It is about verifying behavior.

# What's In It For Me?
If you work in environments where AI-assisted development is common, you will encounter code that “looks right” but behaves inconsistently. The ability to detect shared state issues and timing-related instability is a practical skill.

This assignment trains you to:
 - Recognize behavioral drift
 - Use unit tests as evidence
 - Explain instability clearly
 - Separate execution from correctness

Those skills are more valuable than writing code quickly.

## Required Action:

### Part I - Baseline 
To access the starter project for this assignment, please visit the courses GitHub repository.

Project Structure
`fantasy-character-creation-stream/
 package.json
 src/
  character-creator.js
 test/
  character-creator.spec.js`

 

1). Download the starter solution.
2). Run npm install.
3). Run npm test.
 - Confirm all tests pass consistently.

### Part II - AI-Assisted Change
1). Open character-creator.js.
2). Copy the entire file into an AI-assisted tool (Copilot Chat or ChatGPT is acceptable).
3). Use **this exact prompt**:

### Required AI Prompt (copy/paste):
`Refactor this Duplex stream so that it stores the most recently processed character in a shared instance-level variable and reuses it when pushing output. Add a small asynchronous delay (setTimeout) before pushing output. Do not add any external libraries. Output the full updated file.`
 
Replace the original file and run tests multiple times.
 
You should observe inconsistent behavior.

4). Replace your code with the AI-generated version.
5). Rerun the solution and observe the behavior.

You should notice inconsistent or incorrect behavior. Do not forget to stage, commit, and push your work to GitHub. 

### Part III - Evidence and Reflection
1). Add comments in script.js describing what appears to be going wrong.
2). Write a short reflection (8–10 sentences) addressing:
 - What the AI changed
 - Where shared state was introduced
 - How timing affected behavior
 - What evidence shows instability
 - Why this matters in production
