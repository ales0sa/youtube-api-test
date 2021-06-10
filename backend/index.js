require('dotenv').config()
const { response } = require('express')
const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')

var qs = require('qs')

const apiKey = process.env.API_KEY
const apiUrl = 'https://www.googleapis.com/youtube/v3/search?type=video&maxResults=20&part=snippet'


app.get('/', (req, response) => {
    
    response.set('Access-Control-Allow-Origin', '*')

    let query           = req.query

    let queryString     = qs.stringify(query)
    
    axios(`${apiUrl}&key=${apiKey}&q=${queryString}`)
    .then(res => {
      
            response.send(res.data);
        
    })
    .catch(function (error) {
        
        if (error.response) {

          response.status(error.response.status).send(error.response.data)
        
        } else {
          
          console.log('Error', error.message);
          response.send(error.message)

        }
        
      });
})

app.listen(port, () => {
  console.log(`Backend Api Listening on http://localhost:${port}`)
})