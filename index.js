const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const validator = require("email-validator");

app.use(cors())
app.use(bodyParser.json())

  app.get('/', function (req, res) {
    res.status(200).send({
      'message': 'Everything is ok!'
    })
  })

  app.post('/send-mail', function (req, res) {
    if(req.body.email && req.body.message) {
      const email =  req.body.email
      if(validator.validate(email)) {
        res.status(200).send({
          'message': 'Everything is ok!'
        })
      }else{
        res.status(422).send({
              messae: "Invalid E-mail Address!!",
          })
      }
    }
    res.status(422).send({
          messae: "E-mail and Message Required!!",
        })
  })

  function sendMail(website, status) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
      }
    });

    let mailOptions = {
      from: process.env.MAIL_USERNAME,
      to: process.env.MAIL_USERNAME,
      subject: 'ProjectChecker - Website Is Down',
      text: 'The website ' + website + ' returned with a status of ' + status
    };

    transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        console.log("Error " + err);
      } else {

      }
    });

  }

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})
