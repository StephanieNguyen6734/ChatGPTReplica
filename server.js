const PORT = 8000
const express = require('express') //express simplifies buidling web apps and apis
const cors = require('cors')
require('dotenv').config()
const app = express() //returns an express object to handle http request
app.use(express.json()) //adds middleware to the express obj. the middleware is parsing incoming request with JSON payloads. WE cant pass over json from the front end to the back end unless u have this
app.use(cors())//adds middleware. the cors sets necessary http headers to enable cross origin request and handle


const API_KEY = process.env.API_KEY;

app.post('/completions', async(req, res) =>{
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model : "gpt-3.5-turbo",
            messages: [{role: "user", content: req.body.message}],
            max_tokens: 100,
        })
    }
    try{
      const response = await fetch('https://api.openai.com/v1/chat/completions' , options)
      const data = await response.json()
      res.send(data)

    }catch(error){
        console.error(error)
    }
})

app.listen(PORT, () => console.log('Your server is running on PORT ' + PORT)) //used to start server and make it listen for incoming request for a specified network port