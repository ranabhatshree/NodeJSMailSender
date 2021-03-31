const express = require('express')
const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

  app.get('/', function (req, res) {
    res.status(200).send({
      'message': 'Everything is ok!'
    })
  })

  app.post('/send-mail', function (req, res) {
    res.status(200).send('ok')
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
