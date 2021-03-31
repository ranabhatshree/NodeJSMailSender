const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const validator = require("email-validator")
const nodemailer = require('nodemailer')
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())

  app.get('/', function (req, res) {
    res.status(200).send({
      'message': "OK!!"
    })
  })

  app.post('/send-mail', function (req, res) {
    if(req.body.email && req.body.message) {
      var email =  req.body.email
      var message = req.body.message
      var subject = req.body.subject ? req.body.subject : "Alert!!!"

      if(validator.validate(email)) {
        sendMail(to=email, subject=subject, message=message)
        res.status(200).send({
          message: "Mail sent success!!!"
        })
      }else{
        res.status(422).send({
              message: "Invalid E-mail Address!",
          })
      }
    }else{
      res.status(422).send({
            message: "E-mail and Message Required !",
          })
    }
  })

  function sendMail(to, subject, message) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'login',
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_PASSWORD,
      }
    });

    let mailOptions = {
      from: process.env.MAIL_AUTH_USER,
      to: to,
      subject: subject,
      text: message
    };

    transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        console.log(err)
      }
      else{
        console.log(data)
      }
    })

  }

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})
