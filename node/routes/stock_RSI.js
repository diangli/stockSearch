var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:symbol', function(req, res, next) {
  var name = req.params.symbol;
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type'); 

  
  const https = require('https');
  // https://www.alphavantage.co/query?function=SMA&symbol=AAPL&interval=daily&time_period=10&series_type=close&apikey=B1FXC27WA1HL6WAO&outputsize=full
  const request = https.get('https://www.alphavantage.co/query?function=RSI&symbol='+name+'&interval=daily&time_period=10&series_type=close&apikey=B1FXC27WA1HL6WAO&outputsize=full',function(response) {
    var size = 0;
    var chunks = [];
    response.on('data', function(chunk){
    	size += chunk.length;
      chunks.push(chunk);
    });
    response.on('end', function(){
      data = Buffer.concat(chunks, size).toString('utf8');
      console.log(data);
      res.end(data);
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
  request.end(name);
});

module.exports = router;