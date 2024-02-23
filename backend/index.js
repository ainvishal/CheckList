require('dotenv').config()
const express = require('express')
const app = express()
// used for allowing corss origin resouce sharing
const cors = require('cors')
const port = process.env.PORT
// This is a route handle all the requrest coming to it
const companyRouter = require('./routes/companyRoutes')

// cors is defined
app.use(cors({
    origin:'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE', 'PUT']
}))
// used for accessing body in Request of a method
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// all of the request comming to this url(...../company) will be handled by this companyRouter route
app.use('/company',companyRouter)


app.listen(port, () => {
    console.log('the server is running on port '+port)
})
