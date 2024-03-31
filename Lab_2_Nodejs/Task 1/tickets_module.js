

class FlightTicket
{
    constructor(seatNum, flightNum, departureAirport, arrivalAirport, travelDate) 
    {
        this.seatNum = seatNum;
        this.flightNum = flightNum;
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.travelDate = travelDate;
    }

    displayInfo() 
    {
        console.log("Flight Ticket Information:");
        console.log("Seat Number:", this.seatNum);
        console.log("Flight Number:", this.flightNum);
        console.log("Departure Airport:", this.departureAirport);
        console.log("Arrival Airport:", this.arrivalAirport);
        console.log("Travel Date:", this.travelDate);
    }

    getInfo() 
    {
        let ticketInformation = {
            "Seat Number": this.seatNum,
            "Flight Number": this.flightNum,
            "Departure Airport": this.departureAirport,
            "Arrival Airport": this.arrivalAirport,
            "Travel Date": this.travelDate
        };

        return ticketInformation;
    }

    updateInfo(updateObj) 
    {
        for (let key in updateObj) 
        {
            // console.log(this);
            if (this.hasOwnProperty(key)) 
            {
                this[key] = updateObj[key];
                console.log(`${key} Updated successfully :)`);
            } else {
                console.log(`'${key}' does not exist in FlightTicket :)`);
            }
        }
    }
}


module.exports = {FlightTicket};