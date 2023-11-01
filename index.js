require('dotenv').config()
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
// const getData = require('./getdatas');
// const bcrypt = require("bcryptjs")
// this is connect to mango db file
const { client, } = require('./dbconnection');

const app = express();
const port = process.env.PORT || 8080;


app.use(bodyParser.json());
app.set('view engine', 'ejs', 'js');
app.use(express.static(path.join(__dirname, "/")));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/indexmain.html'));
  // res.render('indexmain')
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.post('/login', async (req, res) => {
  try {

    //! get data from database to show on password manager
    await client.connect();

    // Select the database and collection
    const database = client.db(process.env.db);
    const collections = database.collection(process.env.dbc1);

    // Query for data (e.g., find all documents)
    const cursor = await collections.find({}).toArray();

    //! email validation perofrm

    const email = req.body.email;
    const password = req.body.password;

    db = client.db(process.env.db); // Replace with your database name
    const collection = db.collection(process.env.dbc2); // Replace with your collection name


    const userdata = await collection.findOne({ email: email });



    if (userdata.password === password) {
      res.status(201).render('index', { cursor });
    } else {
      res.sendFile(path.join(__dirname, '/public/chal.gif'));
      // res.send("password not match");
    }


  } catch (error) {
    res.status(400).send("wrong credentials provided");
  }
});

// 

app.post('/send-data', async (req, res) => {
  const { website, user, password } = req.body;


  // const bcrypt = require("bcryptjs");


  //   const passwordHash = await bcrypt.hash(password, 12)




  // below function  inserting data in database

  async function insertData() {
    try {

      await client.connect();

      db = client.db(process.env.db); // Replace with your database name
      const collection = db.collection(process.env.dbc1); // Replace with your collection name

      const documentToInsert = {
        website: website,
        user: user,
        password: password,

      };

      const result = await collection.insertOne(documentToInsert);
      console.log('Document inserted with _id:', result.insertedId);
    } catch (error) {
      
      console.error('Error inserting data:', error);
    }finally {
      // Close the connection
       await client.close();  
     }
  }

  // Call the insertData function to insert data
  insertData();


  // sendFile will go here


});

// get data from mongo db
/*app.get('/getdata', async (req, res) => {

  // getData();

  // res.sendFile(path.join(__dirname, './public/data.html'));
  // res.sendFile(path.join(__dirname, './public/index.html'));


  try {
    //Connect to the MongoDB server
    await client.connect();

    // Select the database and collection
    const database = client.db('username_pass');
    const collection = database.collection('data');

    // Query for data (e.g., find all documents)
    const cursor = await collection.find({}).toArray();



    res.render('index', { cursor });



  } finally {
   / Close the connection
    // await client.close(); /
  }

});

*/







app.listen(port);
console.log('Server started at http://localhost:' + port);