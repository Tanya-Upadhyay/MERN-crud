let express = require('express')
let cors = require('cors')
let mongoose = require('mongoose');
const { enquiryRouter } = require('./routes/web/enquiryRoute');
require('dotenv').config();
let app = express()
app.use(express.json());
app.use(cors())
app.use('/api/website/enquiry', enquiryRouter)

mongoose.connect(process.env.DBURL).then(()=>{
    console.log('Connected to MongoDB')
    app.listen(process.env.PORT || 4000, () =>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })

}).catch((err)=>{
  console.log(err)
});