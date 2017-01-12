var express = require('express');
var jsforce = require('jsforce');
var jsforceAjaxProxy = require('jsforce-ajax-proxy');
var app = express();

app.all('/proxy/?*', jsforceAjaxProxy());


// OAuth2 client information can be shared with multiple connections.
var oauth2 = new jsforce.OAuth2({
  // you can change loginUrl to connect to sandbox or prerelease env.
  // loginUrl : 'https://test.salesforce.com',
  clientId : process.env.CLIENT_ID,
  clientSecret : process.env.CLIENT_SECRET,
  redirectUri : 'http://localhost:5000/oauth2/callback'
});

// Get authz url and redirect to it.
app.get('/oauth2/auth', function(req, res) {
  res.redirect(oauth2.getAuthorizationUrl({ scope : 'api web' }));
});

// Pass received authz code and get access token
app.get('/oauth2/callback', function(req, res) {
  var conn = new jsforce.Connection({ oauth2 : oauth2 });
  var code = req.param('code');
  conn.authorize(code, function(err, userInfo) {
    if (err) { return console.error(err); }
    // Now you can get the access token, refresh token, and instance URL information.
    // Save them to establish connection next time.
    console.log(conn.accessToken);
    console.log(conn.refreshToken);
    console.log(conn.instanceUrl);
    console.log('User ID: ' + userInfo.id);
    console.log('Org ID: ' + userInfo.organizationId);
  });
});

app.get('/', function(req, res) {
  // FIXME: DB に保存された auth 情報があれば index.html を返す
  res.redirect('/oauth2/auth');
});

var port = process.env.PORT || 5000;
app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
