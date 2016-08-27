var express = require('express');
var jsforce = require('jsforce');
var jsforceAjaxProxy = require('jsforce-ajax-proxy');
var app = express();

app.all('/proxy/?*', jsforceAjaxProxy());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  var conn = new jsforce.Connection();
  conn.login(process.env.USERNAME, process.env.PASSWORD, function(err, userInfo) {
    // TODO: handle error
    console.log(conn.accessToken);
    console.log(conn.refreshToken);
    console.log(conn.instanceUrl);
    console.log('User ID: ' + userInfo.id);
    console.log('Org ID: ' + userInfo.organizationId);
    res.sendFile(__dirname + '/index.html')
  });
});

app.get('/accounts', function(req, res) {
  console.log('GET#accounts');
  var conn = new jsforce.Connection();
  var records = [];
  conn.login(process.env.USERNAME, process.env.PASSWORD, function(err, userInfo) {
    // TODO: handle error
    conn.query('SELECT Id, Name FROM Account', function(err, result) {
      // TODO: handle error
      records = result.records;
      res.send(records);
    });
  });
});

var port = process.env.PORT || 5000;
app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
