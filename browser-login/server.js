var express = require('express');
var jsforceAjaxProxy = require('jsforce-ajax-proxy');
var app = express();

app.all('/proxy/?*', jsforceAjaxProxy());

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 5000;

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
})
