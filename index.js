const express = require('express')
const app = express();
const router = require('./incoming');
const bodyparser = require('body-parser')
app.use(router)
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

app.listen(3000 , (req ,res)=>{
    console.log('up and running')
})

