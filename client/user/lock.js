//add authentication
var dotenv = require('dotenv');
dotenv.load();
var lock = new Auth0Lock(
  process.env.AUTH0_CLIENT_ID,
  process.env.AUTH0_DOMAIN
);

// Listening for the authenticated event
lock.on("authenticated", function(authResult) {
  // Use the token in authResult to getUserInfo() and save it to localStorage
  lock.getUserInfo(authResult.accessToken, function(error, profile) {
    if (error) {
      // Handle error
      console.log("Error in getUserInfo ", error);
      return;
    }

    localStorage.setItem('accessToken', authResult.accessToken);
    localStorage.setItem('profile', JSON.stringify(profile));
  });
});

document.getElementById('btn-login').addEventListener('click', function() {
  lock.show();
});

var token = localStorage.getItem('accessToken');
if (token) {
  showLoggedIn();
}

function showLoggedIn() {
  var currentPath = window.location.href;//full current url
  console.log('Replacement path ', 'http://127.0.0.1:8080/#/gamemon');
  window.location.href = 'http://127.0.0.1:8080/#/gamemon';
}