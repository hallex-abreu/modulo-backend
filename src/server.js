const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');
const socktio = require('socket.io');
const http = require('http');

require('./database');


const app = express();
const server = http.createServer(app);
const io = socktio(server);



io.on('connection', (socket) => {
    console.log('conectado', socket.id);
        
    socket.on('mensagem', data =>{
        io.emit(`radio${data.idradio}`, data);        
        console.log(data);
    })
})

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(routes);

server.listen(3333);