const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 4200;
const server = require('http').Server(app);


// Serve only the static files form the angularapp directory
app.use(express.static(__dirname + '/https://pizza-shop-manager-e295f45a4e32.herokuapp.com'));
 
app.get('/*', function(req,res) {
 
res.sendFile(path.join(__dirname+'/https://pizza-shop-manager-e295f45a4e32.herokuapp.com/index.html'));
});
 
// Start the app by listening on the default Heroku port


server.listen(port, function () {
    console.log("App running on port " + port);
})