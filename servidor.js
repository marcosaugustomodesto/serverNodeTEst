var express = require('express');
var app = express();
var os = require('os');

// Configuração da requisição, cabeçalhos, CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // Métodos que queremos permitir
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// GET
app.get('/',function(req,res){
    var body = '<html>'
        + '      <head>'
        + '      <meta http-equiv="Content-Type" content="text/html" charset="UTF-8"/>'
        + '      </head>'
        + '      <body>'
        +       '<h1>Servidor IP Address: ' + getServerIPAddress() + '</h1>'
        + '      </body>'
        + '</html>';

    res.writeHead(200,{"Content-Type" : "text/html"});
    res.write(body);
    res.end();
});

app.listen(80,function(){
    console.log("Conectado e escutando na porta 80");
});

// Função para obter o endereço IP do servidor
function getServerIPAddress() {
    var interfaces = os.networkInterfaces();
    var addresses = [];
    for (var k in interfaces) {
        for (var k2 in interfaces[k]) {
            var address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
                addresses.push(address.address);
            }
        }
    }
    return addresses[0];
}
