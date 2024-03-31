

const flightModule = require('./tickets_module.js');

let myClass = flightModule.FlightTicket;

let mod1 = new myClass(102, 200, "Egypt", "US", "31-3-2024");

// mod1.displayInfo();

// mod1.updateInfo({'seatNum':105});
mod1.updateInfo({'flightNum':400});

mod1.displayInfo();

// console.log(mod1.getInfo()['Seat Number']);

