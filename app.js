const express = require('express');

const app = express(); 

app.use(express.json())
app.post("/first", (req, res)=>{
    const file = req.body
    console.log(req.body)
    console.log('rolou')
    return ;

})
app.listen(3002, ()=> console.log('servidor rolando na 3002'))