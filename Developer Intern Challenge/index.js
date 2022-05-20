// Needed NPM packages
const express = require('express');
const bodyParser = require('body-parser')
// Where processing of data happens
const database = require('./database');

// Setup
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

/*
    All the processing of data is done within 'database'. Each of these APIs only reads
       in the data, passes it to the 'database' and then fetchs/returns the result
*/

app.get('/API/add-user', (req, res) => {
  
  var user = req.query
  console.log(database.add_user(user))

  var users = database.get_users();
  res.json(users);
  
});

app.get('/API/edit-user', (req, res) => {
  
  var user = req.query
  database.update_user(user);

  var users = database.get_users();
  res.json(users);
  
});

app.get('/API/remove-user', (req, res) => {
  
  var user = req.query
  database.remove_user(user)

  var users = database.get_users();
  res.json(users);
  
});

app.get('/API/add-user-back', (req, res) => {

  var user = req.query
  database.add_user_back(user)
  
  var users = database.get_users();
  res.json(users);
  
});

app.get('/API/get-users', (req, res) => {
  
  var users = database.get_users();
  res.json(users);
  
});




app.listen(3000, () => {
  console.log('server started');
});
