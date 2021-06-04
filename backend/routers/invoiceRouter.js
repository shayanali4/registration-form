// import express from 'express';
// import expressAsyncHandler from 'express-async-handler';
// import jwt from 'jsonwebtoken';
// import data from '../data.js';
// import Company from '../models/companyModel.js';
// import { verifyToken } from '../utils.js';


// const invoiceRouter = express.Router();

// invoiceRouter.get('/', verifyToken, expressAsyncHandler(async (req, res) => {
//     jwt.verify(req.token, 'somethingsecret',async (err, authData) => {
//         if (err) {
//             res.sendStatus(403)
//         } else {
//             const selectedCompany = await Company.findOne({ _id: authData.companyId });
//             const invoices = selectedCompany.invoices.filter(x=> x.deleted==='No');
//             res.send(invoices.reverse()); 
//         }
//     })
// }));


// invoiceRouter.get('/seed', expressAsyncHandler(async (req, res) => {
//     const createdInvoices = await Company.insertMany(data.invoices);
//     res.send({ createdInvoices });
//     // const users = await User.find({});
//     // res.send({ users });    
// }));

// invoiceRouter.post('/new', verifyToken, expressAsyncHandler(async (req, res) => {
//     jwt.verify(req.token, 'somethingsecret',async (err, authData) => {
//         if (err) {
//             res.sendStatus(403)
//         } else {
//             let company = await Company.findOne({ _id: authData.companyId });
//             let companyName = company.companyName;
//             let startingNumber = company.settings.initialNumber;
//             let sequeceNumber = startingNumber + company.invoices.length;
//             // console.log("sequeceNumber",company);

//             const newInvoice = {
//                 number: req.body.type === 'Invoice' ? `INV${sequeceNumber}` :
//                     req.body.type === 'Quotation' ? `QUO${sequeceNumber}` :
//                         req.body.type === 'Receipt' ? `REC${sequeceNumber}` : '',
//                 invoiceDate: req.body.type==='Invoice'?req.body.invoiceDate:'',
//                 quotationDate: req.body.type==='Quotation'?req.body.quotationDate:'',
//                 receiptDate: req.body.type === 'Receipt' ? req.body.receiptDate : '',
//                 invoiceNumber: "",
//                 invoice: req.body.invoice,
//                 quotation: req.body.quotation,
//                 receipt: req.body.receipt,
//                 clientName: req.body.clientName,
//                 clientId: req.body.clientId,
//                 companyName: req.body.companyName,
//                 email: req.body.email,
//                 phone: req.body.phone,
//                 address: req.body.address,
//                 ABN: req.body.ABN,
//                 gstType: req.body.gstType,
//                 gst: req.body.gst,
//                 subTotal: req.body.subTotal,
//                 totalAmount: req.body.totalAmount,
//                 balanceAmount: req.body.balanceAmount,
//                 paidAmount: req.body.paidAmount,
//                 deleted: 'No',
//                 createdDate: req.body.createdDate
//                 // ListItems: req.body.listItems
//             };
//             // // console.log(req.body)
//             newInvoice.listItems = [...req.body.listItems];
//             // // console.log("new Invoice",newInvoice)
//             company.invoices.push(newInvoice);
//             // // company.invoices.listItems=req.body.listItems;
//             const createdInvoice = await company.save();
//             // console.log("company",createdInvoice.invoices)

//             const selectedInvoice = createdInvoice.invoices.filter(x => x.number === newInvoice.number);
//             res.send( selectedInvoice[0] );  
//         }
//     })
// }));

// invoiceRouter.put('/update/:id', verifyToken, expressAsyncHandler(async (req, res) => {
//     jwt.verify(req.token, 'somethingsecret', async (err, authData) => {
//         if (err) {
//             res.sendStatus(403)
//         } else {
//             // res.send(authData)
//             await Company.findOneAndUpdate(
//                 {
//                     _id: authData.companyId,
//                     "invoices._id": req.params.id
//                 },
//                 {
//                     $set: {
//                         'invoices.$.listItems': req.body.listItems,
//                         'invoices.$.subTotal': req.body.subTotal,
//                         'invoices.$.totalAmount': req.body.totalAmount,
//                         'invoices.$.balanceAmount': req.body.balanceAmount,
//                         'invoices.$.paidAmount': req.body.paidAmount,
//                         'invoices.$.gst': req.body.gst,
//                         'invoices.$.url': ''
//                     }
                    
//                 });
            
//             const updatedInvoice = await Company.findOne({ _id: authData.companyId },
//                 { invoices: { $elemMatch: { _id: req.params.id } } })
//             res.send(updatedInvoice.invoices[0]);
//             // res.send(Company.find({invoices: {$elemMatch: {_id:req.params.id}}}))
//         }})
// }));


// invoiceRouter.post('/updatepayment', verifyToken, expressAsyncHandler(async (req, res) => {
//     jwt.verify(req.token, 'somethingsecret', async (err, authData) => {
//         if (err) {
//             res.sendStatus(403)
//         } else {
//             const newPayment = {
//                 payValue: req.body.payValue,
//                 payDate: req.body.payDate,
//                 payMethod:req.body.payMethod
//             };

//             let company = await Company.findOne({ _id: authData.companyId });    
//             let filteredIndex = company.invoices.findIndex(x => x._id == req.body._id);
//             company.invoices[filteredIndex].paidAmount = company.invoices[filteredIndex].paidAmount + req.body.payValue;
//             company.invoices[filteredIndex].balanceAmount = company.invoices[filteredIndex].balanceAmount - req.body.payValue;
//             company.invoices[filteredIndex].paymentList.push(newPayment);
//             const updatedCompany = await company.save();


//             const selectedInvoice = updatedCompany.invoices.filter(x => x._id == req.body._id);
//             res.send( selectedInvoice[0]);  
//         }
//     })
// }));

// invoiceRouter.delete('/delete/:id', verifyToken, expressAsyncHandler(async (req, res) => {
//     jwt.verify(req.token, 'somethingsecret', async (err, authData) => {
//         if (err) {
//             res.sendStatus(403)
//         } else {

//             let company = await Company.updateOne(
//                 { _id: authData.companyId, "invoices._id": req.params.id },
//                 { $set: { "invoices.$.deleted" : 'Yes' } }
//             )

//             res.send("Invoice Deleted");
//         }
//     })
// }));

// export default invoiceRouter;