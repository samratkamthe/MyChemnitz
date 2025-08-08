const connectToMongo=require('./db')
const express=require('express')
require('dotenv').config({ path: './.env' });
var cors = require('cors')

connectToMongo();
const app=express();
const port=5000;
//Available routes 
app.use(cors())
app.use(express.json())
app.use('/api/tourist', require('./routes/tourist'));
app.use('/api/bookmarks', require('./routes/bookmarks'));

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port,()=>{
    console.log(`MyChemnitz Backend listening at http://localhost:${port}`)
})