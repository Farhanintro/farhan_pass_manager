// const express = require('express');
// const path = require('path');
// const bodyParser = require('body-parser');
// const { client, } = require('./dbconnection');
// // const { log } = require('console');


// async function getData(req, res) {
 
//     // Function to retrieve and print data
//     async function retrieveData(req,res) {


//         try {
//             // Connect to the MongoDB server
//             await client.connect();

//             // Select the database and collection
//             const database = client.db('username_pass');
//             const collection = database.collection('data');

//             // Query for data (e.g., find all documents)
//             const cursor = await collection.find({}).toArray();
 


//             res.render('index', { cursor });

 

//         } finally {
//             // Close the connection
//             // await client.close();
//         }
//     }



//     // Call the function to retrieve and print data
//     retrieveData().catch(console.error);



// }

// module.exports = getData; // Export the function



