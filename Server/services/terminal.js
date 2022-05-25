var tunnel = require('tunnel-ssh');

var config = {
    username: 'root',
    password: 'root',
    host: '202.30.249.27',
    port: 22,
};

var server = tunnel(config, function (error, server) {
   if(error){
    //catch configuration and startup errors here.
   }
   console.log(server)
});

// Use a listener to handle errors outside the callback
server.on('error', function(err){
    console.error('Something bad happened:', err);
});