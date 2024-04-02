


const express = require("express");
const app = express();
const PORT = process.env.PORT||7011;
const path = require("path");
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



const fs = require('fs');
var welcomeHtml = fs.readFileSync('../Frontend/pages/welcome.html','utf-8');

// console.log(__dirname);

app.get("/",(req, res)=>{
    res.sendFile(path.join(__dirname, "../Frontend/pages/main.html"));
})

app.get("/main.html", (req, res)=>{
    res.sendFile(path.join(__dirname, "../Frontend/pages/main.html"));
})
app.get("/welcome.html", (req, res)=>{
    res.sendFile(path.join(__dirname, "../Frontend/pages/welcome.html"));
})
app.get("/style.css", (req, res)=>{
    res.sendFile(path.join(__dirname, "../Frontend/style/style.css"));
})
app.get("/script.js", (req, res)=>{
    res.sendFile(path.join(__dirname, "../Frontend/scripts/script.css"));
})

app.get("/favicon.ico", (req, res)=>{
    res.sendFile(path.join(__dirname, "../Frontend/icons/favicon.ico"));
})


app.get("/clients.json", (req, res)=>{
    res.sendFile(path.join(__dirname, "../Frontend/Server/clients.json"));
})

app.get("/data", (req, res)=>{
    const fileData = fs.readFileSync('clients.json', 'utf8');
    res.send(fileData)
})


app.post("/welcome.html",(req, res)=>{

    let usrData = req.body
    // console.log(usrData);
    console.log(usrData);
    let passedData = welcomeHtml.replace("{firstName}",usrData.firstName)
                                .replace("{lastName}",usrData.lastName)
                                .replace("{address}",usrData.address)
                                .replace("{email}",usrData.email)
                                .replace("{phone}",usrData.phone)
    res.send(passedData);

    fs.readFile('clients.json', 'utf8', (err, data) => {
        if (err) 
        {
            console.error("Cannot reading clients.json --> ", err);
        } else {
            let clients = [];
            try 
            {
                clients = JSON.parse(data);
                // console.log(clients);
            } catch (parseError) 
            {
                console.log("Cannot parsing clients.json file --> ", parseError);
            }
    
            clients.push(usrData);
            fs.writeFile('clients.json', JSON.stringify(clients), (err) => {
                if (err) 
                {
                    console.error("Cannot writing to clients.json file --> ", err);
                } else {
                    console.log("Data inserted Successfully :)");
                }
            });
        }
    });
})


app.all("*",(req,res)=>{
    res.send("Invalid Url :)")
})


app.listen(PORT, ()=>{console.log("http://localhost:"+PORT)});