var http     = require('http'),
	express  = require('express'),
	mysql    = require('mysql')
	parser   = require('body-parser');

// Database Connection
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : '',
  database : 'acl-assessment'
});
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});


// Setup express
var app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 5000);
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Set default route
app.get('/', function (req, res) {
	res.send('<html><body><p>Welcome to Andela Secondary School Student Information Portal</p></body></html>');
});

// Add a student to the Portal
// Endpoint: http://127.0.0.1:5000/student/add
app.post('/student/add', function (req,res) {
	var response = [];

	if (
		typeof req.body.surname !== 'undefined' &&
		typeof req.body.first_name !== 'undefined' &&
		typeof req.body.student_class !== 'undefined' &&
		typeof req.body.sex !== 'undefined' &&
		typeof req.body.age !== 'undefined' &&
		typeof req.body.admission_no !== 'undefined'
	) {
		var surname = req.body.surname,
			first_name = req.body.first_name,
			middle_name = req.body.middle_name,
			student_class = req.body.student_class,
			sex = req.body.sex,
			age = req.body.age,
			admission_no = req.body.admission_no;

		connection.query('INSERT INTO students (surname, first_name, middle_name, student_class, sex, age, admission_no) VALUES (?, ?, ?, ?, ?, ?, ?)',
			[surname, first_name, middle_name, student_class, sex, age, admission_no],
			function(err, result) {
		  		if (!err){

					if (result.affectedRows != 0) {
						response.push({'result' : 'success'});
					} else {
						response.push({'msg' : 'No Result Found'});
					}

					res.setHeader('Content-Type', 'application/json');
			    	res.status(200).send(JSON.stringify(response));
		  		} else {
				    res.status(400).send(err);
			  	}
			});

	} else {
		response.push({'result' : 'error', 'msg' : 'Please fill required details'});
		res.setHeader('Content-Type', 'multipart/form-data');
    	res.status(200).send(JSON.stringify(response));
	}
});

// List all Students
// Endpoint: http://127.0.0.1:5000/students

app.get('/students', function (req,res) {

	connection.query('SELECT id, surname, first_name, middle_name, admission_no from students',  function(err, rows, fields) {
  		if (!err){
  			var response = [];

			if (rows.length != 0) {
				response.push({'result' : 'success', 'data' : rows});
			} else {
				response.push({'result' : 'error', 'msg' : 'No Results Found'});
			}

			res.setHeader('Content-Type', 'application/json');
	    	res.status(200).send(JSON.stringify(response));
  		} else {
		    res.status(400).send(err);
	  	}
	});
});

// Get the information of a student in the portal
// Endpoint: http://127.0.0.1:5000/student/{:student id}

app.get('/student/:id', function (req,res) {
	var id = req.params.id;

	connection.query('SELECT * from students where id = ?', [id], function(err, rows, fields) {
  		if (!err){
  			var response = [];

			if (rows.length != 0) {
				response.push({'result' : 'success', 'data' : rows});
			} else {
				response.push({'result' : 'error', 'msg' : 'No Results Found'});
			}

			res.setHeader('Content-Type', 'application/json');
	    	res.status(200).send(JSON.stringify(response));
  		} else {
		    res.status(400).send(err);
	  	}
	});
});

// Get the information of a student to edit
// Endpoint: http://127.0.0.1:5000/student/edit/{:student id}

app.get('/student/edit/:id', function (req,res) {
	var id = req.params.id;

	connection.query('SELECT * from students where id = ?', [id], function(err, rows, fields) {
  		if (!err){
  			var response = [];

			if (rows.length != 0) {
				response.push({'result' : 'success', 'data' : rows});
			} else {
				response.push({'result' : 'error', 'msg' : 'No Results Found'});
			}

			res.setHeader('Content-Type', 'application/json');
	    	res.status(200).send(JSON.stringify(response));
  		} else {
		    res.status(400).send(err);
	  	}
	});
});

// Update a student's information
// Endpoint: http://127.0.0.1:5000/student/edit/{:student id}
app.post('/student/update/:id', function (req,res) {
	var id = req.params.id, response = [];

	if (
		typeof req.body.surname !== 'undefined' &&
		typeof req.body.first_name !== 'undefined' &&
		typeof req.body.student_class !== 'undefined' &&
		typeof req.body.sex !== 'undefined' &&
		typeof req.body.age !== 'undefined' &&
		typeof req.body.admission_no !== 'undefined'
	) {
		var surname = req.body.surname,
			first_name = req.body.first_name,
			middle_name = req.body.middle_name,
			student_class = req.body.student_class,
			sex = req.body.sex,
			age = req.body.age,
			admission_no = req.body.admission_no;

		connection.query('UPDATE students SET surname = ?, first_name = ?, middle_name = ?, student_class = ?, sex = ?, age = ?, admission_no = ? WHERE id = ?',
			[surname, first_name, middle_name, student_class, sex, age, admission_no, id],
			function(err, result) {
		  		if (!err){

					if (result.affectedRows != 0) {
						response.push({'result' : 'success'});
					} else {
						response.push({'msg' : 'No Result Found'});
					}

					res.setHeader('Content-Type', 'application/json');
			    	res.status(200).send(JSON.stringify(response));
		  		} else {
				    res.status(400).send(err);
			  	}
			});

	} else {
		response.push({'result' : 'error', 'msg' : 'Please fill required information'});
		res.setHeader('Content-Type', 'application/json');
    	res.status(200).send(JSON.stringify(response));
	}
});

// Delete a student record
// Endpoint: http://127.0.0.1:5000/student/delete/{:student id}
app.delete('/student/delete/:id', function (req,res) {
	var id = req.params.id;

	connection.query('DELETE FROM students WHERE id = ?', [id], function(err, result) {
  		if (!err){
  			var response = [];

			if (result.affectedRows != 0) {
				response.push({'result' : 'The selected student have been deleted successfully!'});
			} else {
				response.push({'msg' : 'Please choose a sudent to delete'});
			}

			res.setHeader('Content-Type', 'application/json');
	    	res.status(200).send(JSON.stringify(response));
  		} else {
		    res.status(400).send(err);
	  	}
	});
});

// Create server
http.createServer(app).listen(app.get('port'), function(){
	console.log('Server listening on port ' + app.get('port'));
});

