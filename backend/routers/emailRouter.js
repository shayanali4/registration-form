import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

const emailRouter = express.Router();

dotenv.config();

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'noreplywebnapp@gmail.com',
    pass: 'qkbuumklvoqbpzcl' 
  }
});
// verifying the connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages!");
  }
});

emailRouter.post('/', expressAsyncHandler(async (req, res) => {
  console.log(req.body);
  
  var mailOptions = {
    from: 'noreplywebnapp@gmail.com',
    to: req.body.receiver,
    subject: req.body.subject,
    html: req.body.message,
    // attachments:
    //   [
    //     {   // utf-8 string as an attachment
    //       filename: `${req.body.fileName}.pdf`, // file name, like 'test.pdf'
    //       href: `${req.body.fileUrl}` // link to the file, like http://example.com/invoices/test.pdf 
    //     }
    //   ]
                
}

transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
        console.log('Error Occured==>',err);
    } else {
        console.log("Email Sent");
        res.send('Email Sent');
    }
})

}));

export default emailRouter;