var express = require('express');
var jsforceAjaxProxy = require('jsforce-ajax-proxy');
var app = express();

app.all('/proxy/?*', jsforceAjaxProxy());

app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 5000;

var jsforce = require('jsforce');
//
// OAuth2 client information can be shared with multiple connections.
//
console.log(process);
var oauth2 = new jsforce.OAuth2({
  // you can change loginUrl to connect to sandbox or prerelease env.
  // loginUrl : 'https://test.salesforce.com',
  clientId : process.env.CLIENT_ID,
  clientSecret : process.env.CLIENT_SECRET,
  redirectUri : 'http://localhost:3000/'
});
//
// Get authz url and redirect to it.
//
app.get('/oauth2/auth', function(req, res) {
  res.redirect(oauth2.getAuthorizationUrl({ scope : 'api web' }));
});

app.get("/", function(req, res) {
  //if (req.query.code) {
    //res.sendFile(__dirname + '/index.html')
    var conn = new jsforce.Connection();
    //var conn = new jsforce.Connection({ oauth2 : oauth2 });
    var code = req.query.code;
    console.log('code::::::::::', code);
    conn.login(process.env.USERNAME, process.env.PASSWORD, function(err, userInfo) {
    //conn.authorize(code, function(err, userInfo) {
      if (err) {
        console.error(err);
        res.send(err.toString());
        return;
      }
      // Now you can get the access token, refresh token, and instance URL information.
      // Save them to establish connection next time.
      console.log(conn.accessToken);
      console.log(conn.refreshToken);
      console.log(conn.instanceUrl);
      console.log("User ID: " + userInfo.id);
      console.log("Org ID: " + userInfo.organizationId);
      res.sendFile(__dirname + '/index.html')
      // ...
    });
  //} else {
    //res.redirect(oauth2.getAuthorizationUrl({ scope : 'api web' }));
  //}
});
app.get("/oauth2", function(req, res) {
  console.log(req);
  res.sendFile(__dirname + '/index.html')
});

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
})

