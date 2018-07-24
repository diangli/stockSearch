var express = require('express');
var router = express.Router();
var jsonStr = '';

/* GET users listing. */
router.get('/:symbol', function(req, res, next) {
  var name = req.params.symbol;
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type'); 

  
  const https = require('https');
  const request = https.get("https://seekingalpha.com/api/sa/combined/"+name.toUpperCase()+".xml",function(response) {
    var size = 0;
    var chunks = [];
    response.on('data', function(chunk){
    	size += chunk.length;
      chunks.push(chunk);
    });
    response.on('end', function(){
      data = Buffer.concat(chunks, size).toString('utf8');
      var parseString = require('xml2js').parseString; 
      parseString(data,{explicitArray : false}, function (err, result) {
        jsonStr = JSON.stringify(result);
      });
      res.end(jsonStr);
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
  request.end(name);
});

module.exports = router;