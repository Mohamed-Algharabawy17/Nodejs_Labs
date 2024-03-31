# Node.js Arithmetic Operations Server Task

This Node.js application is a simple HTTP server that performs basic arithmetic operations based on the URL requested and writes the results to a file named `result.txt`.

## Features

- **Arithmetic Operations**: Supports addition, subtraction, multiplication, and division operations.
- **Dynamic URL Routing**: The server parses the URL to determine the requested operation and operands dynamically.
- **Result Logging**: Results of arithmetic operations are logged to the `result.txt` file for future reference.

## How to Use

1. Clone this repository to your local machine.
2. Install Node.js if you haven't already.
3. Run `npm install` to install the required dependencies.
4. Start the server by running `node server.js`.
5. Open a web browser and navigate to `http://localhost:7000/[operation]/[operand1]/[operand2]/...` to perform arithmetic operations. Replace `[operation]` with `add`, `sub`, `multiply`, or `divide`, and provide the operands in the URL path.

Example:
- Addition: `http://localhost:7000/add/5/3/2` will result in `10`.
- Subtraction: `http://localhost:7000/sub/10/3/2` will result in `5`.
- Multiplication: `http://localhost:7000/multiply/2/3/4` will result in `24`.
- Division: `http://localhost:7000/divide/10/2` will result in `5`.

## Improvements

- **Error Handling**: Implement proper error handling for edge cases such as division by zero or invalid input.
- **Security**: Validate input data to prevent malicious inputs.
- **Asynchronous File Operations**: Handle file write operations asynchronously with proper error handling.
- **Code Reusability**: Refactor the code for better modularity and reusability.

Feel free to contribute to the project by addressing these improvements or adding new features!

