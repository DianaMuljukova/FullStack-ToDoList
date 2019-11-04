const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const urlencodedParser = bodyParser.urlencoded({extanded: false});


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'todolist'
});

app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
        res.header("Access-Control-Allow-Headers", "*");
        res.header("Access-Control-Allow-Methods", "*");
        next();
});
app.use(bodyParser.json());

app.get('/users/list', function (req, res) {
    connection.query('SELECT * FROM users', function (err, data) {
        res.send(data)
    });
});

app.post('/users/create', function (req, res) {
    const {name, email} = req.body;
    console.log(name, email);
    connection.query('INSERT INTO users(name, email) VALUES (?,?)', [name, email], function (err, data) {
        if (!err) {
            res.sendStatus(200)
        } else {
            res.sendStatus(500)
        }
    });
});

app.delete('/users/delete', function (req, res) {
    const {id} = req.body;
    connection.query('DELETE FROM users WHERE id =?', [id], function (err, data) {
        if (!err) {
            res.sendStatus(204)
        } else {
            res.sendStatus(500)
        }
    })
});

app.listen(3000);


