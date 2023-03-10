const connectToMongo = require('./db');
connectToMongo();
const express = require('express')
const app = express()
const port=5000;
var cors = require('cors')

app.use(cors())

// first endpoint

app.use(express.json())
// available Routes
app.use('/api/auth', require('./routes/auth')) // you have to change something here..in the future 
app.use('/api/notes', require('./routes/notes'))
  

app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port,()=>{
    console.log(`iLogBook backend listening at http://localhost:${port}`);
})