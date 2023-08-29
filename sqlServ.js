const express=require('express');
const app=express();
require('dotenv').config();
const mysql=require('mysql');
const mysqlQuery=require('./query.js');


const user=process.env.user;
const pwd=process.env.password;

var connection = mysql.createConnection({
    host: 'gateway01.us-west-2.prod.aws.tidbcloud.com',
    port: 4000,
    user: user,
    password: pwd,
    database: 'test',
    ssl: {
      minVersion: 'TLSv1.2',
      rejectUnauthorized: true
    }
});

connection.connect();

app.post('/register',async (req,res)=>{
    const {username,password}=req.body;
    try {
        const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        const values = [username, password];
        
        const response = await mysqlQuery(connection, sql, values);
        console.log(response);

        res.status(200).send("Insertion Complete");
    } catch (err) {
        console.error(err);
        res.status(500).send("error");
    }
})

app.post('/lookup', async (req, res) => {
    const { username, password } = req.body;

    try {
        const sql = "SELECT API_KEY FROM users WHERE username = ? AND password = ?";
        const values = [username, password];

        const results = await mysqlQuery(connection, sql, values);
        
        res.status(200).json(results);
        res.status(404).send("User not found.");

    } catch (err) {
        console.error(err);
        res.status(500).send("Error occurred.");
    }
});

app.post('/lookupkey',async (req,res)=>{
    const {API_KEY}=req.body;
    try {
        const sql = "SELECT (username,password) FROM users WHERE API_KEY=?";
        const values = [API_KEY];

        const results = await mysqlQuery(connection, sql, values);
        
        res.status(200).json(results);
        res.status(404).send("API Key not found.");

    } catch (err) {
        console.error(err);
        res.status(500).send("Error occurred.");
    }
})

connection.end();

app.listen(4000,(req,res)=>{
    console.log('Running on port 4000');
})