const express = require('express')
companyRouter = express.Router()
// sqlite3 is used as a db
const sqlite3 = require('sqlite3').verbose()
// A new instance is created with companyDB database
let db = new sqlite3.Database('./db/companyDb.db', (err) => {
    if(err) {
        return console.error(err.message)
    }
    console.log('connected to sqlite3')
})

// companyList table is created
db.run(`CREATE TABLE IF NOT EXISTS companyList (
    id INTEGER PRIMARY KEY,
    name TEXT,
    location TEXT
)`, (err) => {
    if(err) {
        return console.error(err.message);
    }
    console.log('companyList table created');
});

// get request to handle data retrival
companyRouter.get('/', (req, res) => {
    db.all(`SELECT * FROM companyList`, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({
                error: "there is an error while retriving the data"
            });
        } else {
            res.status(200).json(rows);
        }
    });
});

// This post request, inserts the data into db
companyRouter.post('/', (req, res) => {
  
    db.run(`INSERT INTO companyList (id, name, location) VALUES (?, ?, ?)`, [Math.floor(Math.random() * 1000), req.body.name, req.body.location], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({
                error: "the data was not inserted"
            });
        }
        console.log('Data inserted into companyList table');
    });
    res.status(200).json({
        msg:'data is sent'
    })
})

// The given id will delete that record in the db
companyRouter.delete('/', (req, res) => {
    const id = req.query.id;

    db.run(`DELETE FROM companyList WHERE id = ?`, [id], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({
                error: 'Internal Server Error'
            });
        } else {
            console.log(`Record with id ${id} deleted`);
            res.status(200).json({
                msg: `record with id ${id} deleted`
            });
        }
    });
})

// This put is used to update the record
companyRouter.put('/', (req, res) => {
    const id = req.query.id
    const name = req.query.name
    const location = req.query.location

    db.run(`UPDATE companyList SET name = ?, location = ? WHERE id = ?`, [name, location, id], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({
                error: 'the record cannot be updated'
            });
        } else {
            res.status(200).json({
                msg: `record with ID ${id} updated successfully`
            });
        }
    });
})

// db.close();
// finally the route is exported
module.exports = companyRouter