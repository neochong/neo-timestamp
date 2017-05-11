var express = require('express')
var app = module.exports = express()

app.get('/:time', function(req,res) {
  var time = req.params.time;

  res.json({unix: time})

})

app.listen(3000, function() {
  console.log("Working")
});
