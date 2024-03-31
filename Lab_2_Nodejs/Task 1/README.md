# Flight Ticket Reservation Module

## Introduction
This module is designed to facilitate flight ticket reservations. It provides functionalities to store, retrieve, and update flight ticket information.

## Features
- Creation of flight tickets with the following information:
  - Seat number
  - Flight number
  - Departure and arrival airports
  - Traveling date
- Displaying ticket information
- Getting ticket information
- Updating ticket information

## Usage
1. Import the `FlightTicket` class from the module.
    ```javascript
    const flightModule = require('./tickets_module.js');
    let FlightTicket = flightModule.FlightTicket;
    ```

2. Create a new instance of `FlightTicket` by providing necessary details:
    ```javascript
    let myTicket = new FlightTicket(seatNum, flightNum, departureAirport, arrivalAirport, travelDate);
    ```

3. Display ticket information:
    ```javascript
    myTicket.displayInfo();
    ```

4. Get ticket information:
    ```javascript
    let ticketInfo = myTicket.getInfo();
    ```

5. Update ticket information:
    ```javascript
    myTicket.updateInfo(updateObj);
    ```

## Example
```javascript
const flightModule = require('./tickets_module.js');

let FlightTicket = flightModule.FlightTicket;

let myTicket = new FlightTicket(102, 200, "Egypt", "US", "31-3-2024");

// Display ticket information
myTicket.displayInfo();

// Update ticket information
myTicket.updateInfo({ flightNum: 400 });

// Display updated ticket information
myTicket.displayInfo();
