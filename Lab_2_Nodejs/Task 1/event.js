

const myEvent = require("events");
let event1 = new myEvent();

event1.on('click',()=>{
    console.log("Eveny1 clicked :)");
})

event1.emit('click');