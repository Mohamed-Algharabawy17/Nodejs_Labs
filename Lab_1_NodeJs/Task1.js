const http = require('http');
const res_file = require('fs');

http.createServer((req, res) => {
    if (req.url != '/favicon.ico') {
        let operation_url = req.url;
        let url_parts = operation_url.split('/');

        switch (url_parts[1]) 
        {
            case 'add':
                let numbers_add = [];
                for (let i = 2; i < url_parts.length; i++) 
                {
                    numbers_add.push(parseInt(url_parts[i]));
                }

                let sum_add = numbers_add.reduce((acc, curr) => acc + curr, 0);

                let numbersString_add = numbers_add.map(num => num.toString()).join(' + ');

                res.write(`<h1>The result of adding ${numbersString_add} is ${sum_add}</h1>`);

                res_file.writeFile('result.txt',`The result of adding ${numbersString_add} = ${sum_add}`,()=>{});
                break;
            case 'sub':
                let numbers_sub = [];
                for (let i = 2; i < url_parts.length; i++) 
                {
                    numbers_sub.push(parseInt(url_parts[i]));
                }

                let sum_sub = numbers_sub.reduce((acc, curr) => acc - curr);
                let numbersString_sub = numbers_sub.map(num => num.toString()).join(' - ');

                res.setHeader("Content-Type", 'text/html');
                res.write(`<h1>The result of subtracting ${numbersString_sub} is ${sum_sub}</h1>`);

                res_file.writeFile('result.txt',`The result of subtracting ${numbersString_sub} = ${sum_sub}`,()=>{});

                break;
            case 'multiply':
                let numbers_multi = [];

                for (let i = 2; i < url_parts.length; i++) 
                {
                    numbers_multi.push(parseInt(url_parts[i]));
                }

                let result_multi = numbers_multi.reduce((acc, curr) => acc * curr, 1);

                let numbersString_multi = numbers_multi.map(num => num.toString()).join(' * ');
                res.write(`<h1>The result of multiplying ${numbersString_multi} is ${result_multi}</h1>`);

                res_file.writeFile('result.txt',`The result of multiplying ${numbersString_multi} = ${result_multi}`,()=>{});

                break;
            
            case 'divide':
                let numbers_divide = [];
                for (let i = 2; i < url_parts.length; i++) {
                    numbers_divide.push(parseInt(url_parts[i]));
                }

                if (numbers_divide.length < 2) {
                    res.write("<h1>At least two numbers are required for division operation</h1>");
                    break;
                }

                let result_divide = numbers_divide.reduce((acc, curr) => acc / curr);

                let numbersString_divide = numbers_divide.map(num => num.toString()).join(' / ');
                res.write(`<h1>The result of dividing ${numbersString_divide} is ${result_divide}</h1>`);

                res_file.writeFile('result.txt', `The result of dividing ${numbersString_divide} = ${result_divide}`, () => {});

                break;
            default:
                res.setHeader("Content-Type", 'text/html');
                res.write("<h1>Invalid URL</h1>");
                break;
        }
    }
    res.end();
}).listen(7000);
