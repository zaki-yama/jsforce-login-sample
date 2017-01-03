var express = require('express');
var jsforceAjaxProxy = require('jsforce-ajax-proxy');
var app = express();

app.all('/proxy/?*', jsforceAjaxProxy());

var port = process.env.PORT || 5000;

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html')
})

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
})
