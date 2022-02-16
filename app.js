const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html")
});

app.post("/", (req, res) => {
  const fname = req.body.fname
  const lname = req.body.lname
  const email = req.body.email

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          // GO to audience -> all contacts -> settings -> audience fields and merge
          FNAME: fname,
          LNAME: lname,
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data)

  const url = "https://us14.api.mailchimp.com/3.0/lists/1b71f67c38";

  const options = {
    method: "POST",
    auth: "Surajjaiswal12345:fcf1476693e06dcbdf20c54e8f2a32d8-us14",
    // auth: "<user-name>:<api-key>",
  };

  // MAKING MAILCHIMP API REQUEST
  const request = https.request(url, options, (response) => {

    if (response.statusCode === 200) {
      // res.send("Succesfully Subscribed");
      res.sendFile(__dirname +"/success.html")
    } else {
      // res.send("There was an error with signing up, please try again!");
      res.sendFile(__dirname + "/failure.html")
    }

    response.on("data", (data) => {
      console.log(JSON.parse(data));
    })

  })

  // Used to Send Data [ request is variable not param ]
  request.write(jsonData);
  request.end();

  console.log(fname);
  console.log(lname);
  console.log(email);
})

app.listen(3000, () => {
  console.log("Server is Listening to port 3000");
})

// API key
// fcf1476693e06dcbdf20c54e8f2a32d8-us14

// Audience ID
// 1b71f67c38.
