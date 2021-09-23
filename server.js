// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));

app.get('/', function (req, res) {
    res.send('hello world');
  })
// Setup Server

// Set up and Spin up the server
const port = 8080;
const server = app.listen(port, () => {
    console.log(server.address())
    console.log(`server is listening on port: ${port}`); // Callback to debug
});



// Create JS object
const appData = {
    date:'sss'
}
// Respond with JS object when a GET request is made to the homepage
app.get('/all', function (req, res) {
  res.send(appData)
})

const data = [];
app.post('/addnew', addFlavor);

function addFlavor (req, res) {
  res.send("POST recieved")
};