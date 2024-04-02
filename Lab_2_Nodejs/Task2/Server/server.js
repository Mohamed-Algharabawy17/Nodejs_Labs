

const http = require('http');
const fs = require('fs');

var mainHTml = fs.readFileSync("../Frontend/pages/main.html","utf-8");
var welcomeHtml = fs.readFileSync('../Frontend/pages/welcome.html','utf-8');
var styleCSS = fs.readFileSync("../Frontend/style/style.css","utf-8");
var Script1JS = fs.readFileSync("../Frontend/scripts/script.js","utf-8");
var FavIcon1ico = fs.readFileSync("../Frontend/icons/favicon.ico");

http.createServer((req,res)=>{
    if (req.method === 'GET') 
    {
        switch (req.url) {
            case '/':
            case '/main.html':
            case '/pages/main.html':
            case '/Frontend/pages/main.html':
                res.setHeader('Content-Type','text/html');
                res.write(mainHTml)
                break;
            
            case '/style.css':
            case '/style/style.css':
            case '/Frontend/style/style.css':
                res.setHeader('Content-Type','text/css');
                res.write(styleCSS)
                break;

            case '/script.css':
            case '/scripts//script.css':
            case '/Frontend/scripts//script.css':
                res.setHeader('Content-Type','text/css');
                res.write(Script1JS)
                break;

            case '/favicon.ico':
            case '/icons//favicon.ico':
            case '/Frontend//icons//favicon.ico':
                res.setHeader('Content-Type','image/vnd.microsoft.icon');
                res.write(FavIcon1ico)
                break;


            case '/clients.json':
            case '/home/mohamedalgharabawy/NodeJs-Labs/Lab_2_Nodejs/Task2/Server/clients.json':
                fs.readFile('/home/mohamedalgharabawy/NodeJs-Labs/Lab_2_Nodejs/Task2/Server/clients.json', 'utf8', (err, data) => {
                    if (err) {
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end('Internal Server Error');
                        console.error('Error reading clients.json:', err);
                    } else {
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        res.end(data);
                    }
                });
            

            case "/data":
                const fileData = fs.readFileSync('clients.json', 'utf8');
                res.write(fileData)
                break;

            default:
                if (req.url.includes("welcome.html")) {
                    res.setHeader("Content-Type", "text/html");
                    res.write(welcomeHtml)
                } else
                    res.write("Invalid url :)")
                break;
        }
        res.end();
    } 
    else if(req.method == 'POST')
    {
        let allData = "";
        req.on('data',(data)=>{
            // console.log(data.toString());
            let userData = decodeURIComponent(data.toString());;
            allData = userData.split("&");
            // console.log(allData);
            let dataValues = [];

            allData.forEach(feild => {
                let values = feild.split("=");
                dataValues.push(values[1]);
            });
            // console.log(dataValues);
            res.setHeader('Content-Type','text/html');
            let passedData = welcomeHtml.replace("{firstName}",dataValues[0])
                                        .replace("{lastName}",dataValues[1])
                                        .replace("{address}",dataValues[2])
                                        .replace("{email}",dataValues[3])
                                        .replace("{phone}",dataValues[4])
            res.write(passedData)


            const dataObject = {};

            allData.forEach(item => {
                let [key, value] = item.split('=');
                dataObject[key] = value;
            });

            // console.log(dataObject);

            fs.readFile('clients.json', 'utf8', (err, data) => {
                if (err) 
                {
                    console.error("Error reading clients.json --> ", err);
                } else {
                    let clients = [];
                    try 
                    {
                        clients = JSON.parse(data);
                        // console.log(clients);
                    } catch (parseError) 
                    {
                        console.error("Error parsing clients.json --> ", parseError);
                    }
            
                    clients.push(dataObject);
                    fs.writeFile('clients.json', JSON.stringify(clients), (err) => {
                        if (err) 
                        {
                            console.error("Error writing to clients.json --> ", err);
                        } else {
                            console.log("Data Added to clients.json Successfully :)");
                        }
                    });
                }
            });
            

        })

        req.on("end",()=>{
            res.end();
        })
        
    } else {
        console.log("Invalid Method");
    }
}).listen(7009,()=>{console.log("http://localhost:7009");});
