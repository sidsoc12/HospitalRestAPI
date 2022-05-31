const express = require('express')
const app = express()
app.use(express.static("public"))
app.set("view engine", "ejs")
const userRouter = require('./routes/hospitalsid')
app.get('/', (req, res) => 
{
    res.send("Welcome to Hospitable's REST API")
})
app.use('/hospitals', userRouter)

// app.get('/hospitals', (req, res) => {
//     // console.log(jsonArray)
//     res.render("hospitals")
// })
// app.get('/hospitals/:id/whole', (req, res) =>{
//     // loop()
//     // res.send('Working')
//     const check = loop(req.params.id)
//     if(check == false)
//     {
//         res.status(404).send("Hospital does not exist in records")
//     }
//     else{
//     res.send(jsonArray[check])}
// })
const port = process.env.PORT || 3000;

app.listen(port)




