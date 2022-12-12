const express = require('express');
const session = require('express-session');
const passport = require('passport');
const FileStore = require('session-file-store')(session);
const fs = require('fs');
const path = require('path');
const { v4 } = require('uuid');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

const app = express();

require('./config-passport.js');

let DRIVERS = [];
let CARS = [];

app.use(express.static(path.resolve(__dirname + '/client/login', 'js')));

app.use(express.static(path.resolve(__dirname + '/client', 'js')));

app.use(express.static(path.resolve(__dirname + '/client', 'css')));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(
    session({
        secret: 'qwerty',
        store: new FileStore(),
        cookie: {
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
        },
        resave: false,
        saveUninitialized: false
    })
);

app.use(passport.initialize());

app.use(passport.session());

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.get('/api/login', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/client', 'login', 'index.html'));
})

app.post('/api/login',
    passport.authenticate('local', { failureRedirect: '/api/login' }),
    function (req, res) {
        return res.redirect('/');
    })

const auth = (req, res, next) => {
    let sessionFiles = fs.readdirSync(__dirname + '//sessions');

    for (let i = 0; i < sessionFiles.length; i++) {

        if (RegExp(sessionFiles[i].match(/.+(?=.json)/)).test(req.headers['cookie'])) {
            return next();
        }
    }
    return res.redirect('/api/login');
}

app.get('/', auth, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
})

app.get('/api/cars', auth, (req, res) => {
    res.status(200).json(CARS);
})

app.get('/api/drivers', auth, (req, res) => {
    res.status(200).json(DRIVERS);
})

app.post('/api/cars', auth, (req, res) => {

    if (!(req.body.number && req.body.model && req.body.firm && req.body.year && req.body.owner && req.body.class)) {
        res.status(405).json('Invalid input');
        return;
    }

    const car = { ...req.body, id: v4() };
    CARS.push(car);
    res.status(201).json({ car });
})

app.post('/api/drivers', auth, (req, res) => {
    if (!(req.body.firstName && req.body.lastName && req.body.age && req.body.reyting && req.body.city && req.body.phone && req.body.dateBeginWork && req.body.cars)) {
        res.status(405).json('Invalid input');
    }
    const driver = { ...req.body, id: v4() };
    DRIVERS.push(driver);
    res.status(201).json({ driver });
})

app.get('/api/cars/:id', auth, (req, res) => {
    if (typeof req.params.id !== 'string') {
        res.status(405).json('Invalid ID validation');
        return;
    }

    let result = CARS.filter(item => item.id == req.params.id);

    if (!result.length) {
        res.status(404).json('Car not found');
        return;
    }

    res.status(200).json(result);
})

app.get('/api/drivers/:id', auth, (req, res) => {
    if (typeof req.params.id !== 'string') {
        res.status(405).json('Invalid ID validation');
        return;
    }

    let result = DRIVERS.filter(item => item.id == req.params.id);

    if (!result.length) {
        res.status(404).json('Driver not found');
        return;
    }

    res.status(200).json(result);
})

app.delete('/api/cars/:id', auth, (req, res) => {

    if (typeof req.params.id !== 'string') {
        res.status(405).json('Invalid ID validation');
        return;
    }

    let carsLength = CARS.length;
    CARS = CARS.filter(item => item.id !== req.params.id);

    if (CARS.length === carsLength) {
        res.status(404).json('Car not found');
        return;
    }

    res.status(204);
})

app.delete('/api/drivers/:id', auth, (req, res) => {

    if (typeof req.params.id !== 'string') {
        res.status(405).json('Invalid ID validation');
        return;
    }

    let driversLength = DRIVERS.length;
    DRIVERS = DRIVERS.filter(item => item.id !== req.params.id);

    if (DRIVERS.length === driversLength) {
        res.status(404).json('Driver not found');
        return;
    }
    res.status(204);
})

app.put('/api/drivers/:id', auth, (req, res) => {

    if (typeof req.params.id !== 'string') {
        res.status(405).json('Invalid ID validation');
        return;
    }

    const index = DRIVERS.findIndex(item => item.id == req.params.id);

    if (index === -1) {
        res.status(404).json('Driver not found');
        return;
    }

    DRIVERS[index] = req.body;
    res.status(200).json(DRIVERS[index]);
})

app.put('/api/cars/:id', auth, (req, res) => {

    if (typeof req.params.id !== 'string') {
        res.status(405).json('Invalid ID validation');
        return;
    }

    const index = CARS.findIndex(item => item.id == req.params.id);

    if (index === -1) {
        res.status(404).json('Car not found');
        return;
    }

    CARS[index] = req.body;
    res.status(200).json(CARS[index]);
})

app.listen(3000, () => console.log("start"))