var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(bodyParser.json());

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.post("/api/timestamp/submit_date?", function (req, res) {
  //CHECK IF REQ PARAMS IS EMPTY
  if(!req.body.date){
    var placehold = new Date();
    res.json({unix: placehold.getTime(), utc: placehold.toUTCString()});
  }
    //CHECK IF REQ PARAMS IS UNIX EPOCH (INTEGER) OR UTC (STRING)
    var date_string = new Date(isNaN(req.body.date) ? req.body.date: Number(req.body.date));
    
    //CHECK IF REQ PARAMS IS VALID
    if(date_string.getTime() === date_string.getTime()){
      res.json({unix: date_string.getTime(), utc: date_string.toUTCString()});
    }else{
    res.json({error: 'Invalid Date'});
    }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
