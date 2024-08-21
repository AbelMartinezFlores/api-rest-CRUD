'use strict'

const port = process.env.PORT || 3000;

const fs = require('fs');
const https = require('https');

const OPTIONS_HTTPS ={
    key: fs.readFileSync('./cert/key.pem'),
    cert: fs.readFileSync('./cert/cert.pem')
};

const express = require('express');
const logger = require('morgan');
const mongojs = require('mongojs');
const cors = require('cors');
const helmet = require('helmet'); 

const TokenService = require('./services/token.service');

const app = express();

var db = mongojs("mongodb+srv://abel:abel@sd.u5nbx.mongodb.net/myFirstDatabase?retryWrites=true&w=majoritySD"); // Enlazamos con la DB "SD"
var id = mongojs.ObjectID; // Función para convertir un id textual en un objectID


// Declaraciones
var allowCrossTokenHeader = (req, res, next) => {
 res.header("Access-Control-Allow-Headers", "*");
return next();
};
var allowCrossTokenOrigin = (req, res, next) => {
 res.header("Access-Control-Allow-Origin", "*");
return next();
};

var auth = (req, res, next) => {

    const jwt = req.headers.authorization.split(' ')[1];

    TokenService.decodificaToken(jwt).then((userID) =>{

        req.user = {id:userID};
        return next();

    }).catch(err => res.status(400).json({result: 'KO', message: err}));
};

app.use(logger('dev')); // probar con: tiny, short, dev, common, combined
app.use(express.urlencoded({extended: false})) // parse application/x-www-form-urlencoded
app.use(express.json()) // parse application/json
app.use(cors());
app.use(allowCrossTokenHeader);
app.use(allowCrossTokenOrigin);
app.use(helmet()); 

//routes
app.param("coleccion", (req, res, next, coleccion) => {
    req.collection = db.collection(coleccion);
    return next();
});

//Declaramos nuestras rutas, controladores y logica de negocio (patron mvc)
app.get('/api', auth ,(req,res,next) => {

    db.getCollectionNames((err, colecciones) => {
        if (err) return next(err);
        res.json(colecciones);
    });
});

app.get('/api/:coleccion',auth, (req,res,next) => {
    req.collection.find((err, coleccion) => {
        if (err) return next(err); 
        res.json(coleccion); 
    });
});

app.get('/api/:coleccion/:id',auth, (req,res,next) => {
    req.collection.findOne({_id: id(req.params.id)}, (err, elemento) => {
        if (err) return next(err);
        res.json(elemento);
    });
});

app.post('/api/:coleccion' ,auth, (req,res,next)=> {
    const elemento= req.body;

    console.log(elemento)
    
    if (!elemento.title) {
        res.status(400).json ({
            error: 'Bad data',
            description: 'Se precisa al menos un campo <title>'
    });
    } else {
        req.collection.save(elemento, (err, coleccionGuardada) => {
            if(err) return next(err);
            res.json(coleccionGuardada);
        });
    } 
});

app.put('/api/:coleccion/:id' ,auth, (req, res, next) => {
    let elementoId = req.params.id;
    let elementoNuevo = req.body;

    req.collection.update({_id: id(elementoId)}, {$set: elementoNuevo}, {safe: true, multi: false}, (err, result) => {
        if (err) return next(err);
        res.json(result);
    });
});

app.delete('/api/:coleccion/:id' ,auth, (req, res, next) => {
    let elementoId = req.params.id;

    req.collection.remove({_id: id(elementoId)}, (err, resultado) => {
        if (err) return next(err);
        res.json(resultado);
    });
});

https.createServer(OPTIONS_HTTPS,app).listen(port, () => {
    console.log((` WS API REST CRUD con DB ejecutándose en https://localhost:${port}/api/:coleccion/:id`));
});

//lanzamos nuestra aplicacion express
//app.listen(port, () => {
//   console.log((`API REST ejecutándose en http://localhost:${port}/api/:coleccion/:id`));
//});