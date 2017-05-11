var express = require('express')
var app = express.Router();
app.use(express.static(__dirname + '/views'))

app.get('/', function(req,res) {
  res.sendFile('index.html')
})

app.get('/:time', function(req,res) {
  var dateVal = req.params.time;
  var unixDate;
  var naturalDate;
  var date;

  if(!isNaN(dateVal)) {
    unixDate = dateVal;
    date = new Date(dateVal * 1000);
    var options = {year: 'numeric', month: 'long', day: 'numeric'};
    options.timeZone = 'UTC';
    naturalDate = date.toLocaleDateString('en-US', options);
    if(naturalDate === 'Invalid Date') {
      unixDate = null;
      naturalDate = null;
    }
  } else {
    naturalDate = dateVal;
    unixDate = Math.floor(Date.parse(naturalDate.concat(' 00:00:00 UTC')) / 1000)
    if(isNaN(unixDate)) {
      unixDate = null;
      naturalDate = null;
    }
  }

  res.json({unix: unixDate, natural: naturalDate})

})

module.exports = app;
