const express = require("express");
const sql = require("mysql2");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const db = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "443811",
    database: "restapis" 
});

db.connect((err) => {
    if (err) {
        console.log("Error connection");
        return;
    }
    console.log("connected to the database");
});

app.get("/users", (req, res) => {
    db.query("SELECT * FROM apis", (err, results) => {
        if (err) {
            res.status(500).send("Error fetching movies");
            return;
        }
        res.json(results);
    });
});

app.post("/users", (req, res) => {
    const id = req.body;
    db.query("INSERT INTO apis SET ?", id, (err, results) => {
        if (err) {
            res.status(500).send("Error adding user");
            return;
        }
        res.send("User added");
    });
});

app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM apis WHERE id = ?", [id], (err, data) => {
        if (err) {
            res.status(500).send("Error fetching user");
            return;
        }
        if (data.length === 0) {
            res.status(404).send("User not found");
            return;
        }
        res.json(data);
    });
});


app.delete("/user/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM apis WHERE id = ?", [id], (err, results) => {
        if (err) {
            res.status(500).send("Error deleting movie");
            return;
        }
        res.send("Movie deleted");
    });
});

app.listen(8081, () => {
    console.log("listening");
});