// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
	res.json({greeting: 'hello API'});
});

app.get('/api', (req, res) => {
	const date = new Date()
	const unix = date.getTime();

	res.send({
		unix: unix, 
		date: date.toGMTString()
	})
})

app.get('/api/:date', (req, res) => {
	const { date } = req.params;
	let tanggal = new Date(date)
	console.log(tanggal)
	let unix = tanggal.getTime()

	if (tanggal == 'Invalid Date') {
		res.send({
			error: 'Invalid Date'
		})
	} else {
		if (parseInt(date).toString().length !== 4) {
			let t = new Date(parseInt(date))
			res.send({
				unix: date,
				date: t.toGMTString()
			})
		} else {
			res.send({
				unix: unix,
				date: tanggal.toGMTString()
			})
		}
	}
	
})



// listen for requests :)
var listener = app.listen(3000 || process.env.PORT, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});
