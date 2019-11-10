const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');

const urlencodedParser = bodyParser.urlencoded({extanded: false});


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'todolist'
});

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        const id = req.url.match(/\d+$/);
        console.log(id[0]);
        cb(null, id + '-' + file.originalname);
    }
});

const upload = multer({storage: storage});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.get('/users/list', function (req, res) {
    connection.query('SELECT * FROM users', function (err, data) {
        res.send(data)
    });
});

app.post('/users/create',  async function (req, res) {
    const {name, email} = req.body;
    console.log(name, email);
    //const result = await connection.query('INSERT INTO users(name, email) VALUES (?,?)', [name, email], function (err, data) {
    connection.query('INSERT INTO users(name, email) VALUES (?,?)', [name, email], function (err, data) {
        console.log(data.insertId);

        if (!err) {
            res.send({
                id: data.insertId
            });
        } else {
            res.sendStatus(500)
        }
    });
});

app.post('/users/file/upload/:id', upload.single('file'), function (req, res, next) {
    const id = req.url.match(/\d+$/);
    let url = 'uploads/' + req.file.filename;
    connection.query(`UPDATE users SET img_url = '${url}' WHERE id = ${id}`)
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


