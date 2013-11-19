var spawn = require('child_process').spawn,
    node = spawn('node', ['../app.js']),
    fs = require('fs')

node.stdout.on('data', function (data) {
	  if (/run-3000/.test(data)) {
		var chromium = spawn('chromium',['http://localhost:3000' , '--kiosk', '--disable-session-storage'])
		chromium.stdout.on('data', function (data) {
			console.log('stdout: ' + data);	
		})
	}
	console.log(' ' + data);
});

node.stderr.on('data', function (data) {
  fs.appendFile('err.log', 'stderr: ' + data, function (err) {
  		if (err) throw err;
	});
});

node.on('close', function (code) {
	fs.appendFile('termination.log', 'child process exited with code ' + code, function (err) {
  		if (err) throw err;
	});
});