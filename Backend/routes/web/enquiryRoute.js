let express =require ('express');
const { enquiryInsert, enquiryList, enquiryUpdate, enquiryDelete } = require('../../controllers/web/enquiryController');
let enquiryRouter = express.Router();

enquiryRouter.post('/insert', enquiryInsert)
enquiryRouter.get('/enquiryList',enquiryList)
enquiryRouter.put('/enquiryUpdate/:id',enquiryUpdate)
enquiryRouter.delete('/enquiryDelete/:id',enquiryDelete)
module.exports={enquiryRouter}