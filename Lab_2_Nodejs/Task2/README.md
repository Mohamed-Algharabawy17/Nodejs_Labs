# HTTP Server for Handling GET and POST Requests

## Introduction
This HTTP server is designed to handle both GET and POST requests from clients. It provides functionality for clients to visit the main page, enter their information, and receive a greeting page with their entered data. Additionally, it allows clients to view all stored client information via AJAX request.

## Features
- Listens on port 7000
- Allows clients to visit main.html and enter their information
- Displays a greeting page (welcome.html) with entered client data
- Performs client-side validation of entered information
- Stores client data in clients.json
- Provides a button on welcome.html to fetch and display all client information stored in clients.json
- Includes a request handler for style.css to apply custom styling

## Usage
1. Start the server:
    ```bash
    node server.js
    ```

2. Access the main page:
    ```
    http://localhost:7000/main.html
    ```

3. Enter your information in the form and submit.

4. View the greeting page:
    ```
    http://localhost:7000/welcome.html
    ```

5. Click the button to fetch and display all client information.

## Implementation Details
- Server listens on port 7000
- GET requests to /main.html and / return the same response with a form to enter client information
- POST requests with client information are validated client-side before posting to the server
- Entered client data is stored in clients.json
- welcome.html displays entered client data using HTML templates
- AJAX request to fetch all client information from clients.json and display it
- Custom styling is applied using style.css

## File Structure
- server.js: Node.js server implementation
- main.html: HTML form for entering client information
- welcome.html: Greeting page displaying client information
- clients.json: JSON file to store client data
- style.css: CSS file for styling

