const express = require('express')
const { Buffer } = require('buffer')
const https = require('https')
const http = require('http')
const app = express()
const bodyParser = require('body-parser')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config()
const authorization = require("./auth");
const fs = require('fs');
const cookieparser = require('cookie-parser')

var options = {
  key: fs.readFileSync('certs/ca.key'),
  cert: fs.readFileSync('certs/ca.crt'),
};

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json())
app.use(cookieparser())

// /taxii2/discovery
app.get('/taxii2/', (req, res) => {
  console.log("Client requested discovery page ...")
  console.log(req.url)
  console.log(req.params)
  var url_parts = req.url.split('/')
  query = ''
  var api = req.params.api

  auth = req.headers.authorization;
  // auth = true

  if (!auth) {
    res.sendStatus(406)
    console.log("Entered if ..")
    // res.send("You dont have autorization or you are not taxii client.")
    // exit(0)
  } else {

    var credentials = Buffer(req.headers.authorization.split(" ")[1], 'base64').toString();
    console.log(credentials)
    if (url_parts[2] == "collections") {
      var query = "collections";
    }

    var username = credentials.split(':')[0]
    var password = credentials.split(':')[1]
    console.log(username + " :   " + password)

    let payload = { username: username }
    var accessToken = ''
    if (username != 'admin' || password != 'vehere@123') {
      return res.send("You dont have authorization")
    } else {
      accessToken = jwt.sign(payload, 'swsh23hjddnns', {
        algorithm: "HS256",
        expiresIn: '86500s'
      })
      console.log(accessToken)
    }

    console.log(req.body)
    console.log(req.headers)

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db("taxii");
      dbo.collection("discovery").findOne({}, function (err, result) {
        if (err) throw err;
        // console.log(req);
        console.log()
        db.close();

        res.setHeader("Content-Type", "application/taxii+json; version=2.1")
        res.setHeader("token", accessToken)
        res.cookie("token", accessToken)
        // res.json(result)
        res.status(200)
        res.send(JSON.parse(JSON.stringify(result)))
        console.log(res.getHeaders())
      });
    });
    // const token = jwt.sign(
    //   { user_id: user._id, email },
    //   process.env.TOKEN_KEY,
    //   {
    //     expiresIn: "2h",
    // //   }
    // );
  }
});


// app.get('/:api(api*)/collections/:id',(req,res) => {
//   console.log(req.url)
//   console.log(req.params)
//   var url_parts = req.url.split('/')
//   query = ''
//   var api = req.params.api
//   var id_ = req.params.id
//   if (id_){
//     var query = "'collections.id' : " +  "'" + id_ + "'"
//   }



//   console.log(api)
//   console.log(query)
//   console.log("Client asking for api  xyz .. step 1.5 ...")

//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db(api);
//     console.log("---------- + ----------")


//     dbo.collection('collections').find({"id":id_}).toArray(function(err, result) {
//       if (err) throw err;
//       db.close();

//       console.log(result)
//       res.setHeader("Content-Type" ,"application/taxii+json; version=2.1")
//       res.status(200)
//       res.setHeader('X-TAXII-Date-Added-First','')
//       res.setHeader('X-TAXII-Date-Added-Last','')
//       res.send(JSON.parse(JSON.stringify(result)))
//     });
//   });
// });


// app.get('/:api(api*)/information/',(req,res) => {
//   console.log(req.url)
//   var url_parts = req.url.split('/')
//   var api = req.params.api
//   var id_ = req.params.id

//   console.log(api)
//   console.log("Client asking for api  xyz .. step information ...")

//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db(api);
//     console.log("---------- + ----------")

//     dbo.collection(url_parts[2]).find({}).toArray(function(err, result) {
//       if (err) throw err;
//       db.close();

//       console.log(result)
//       res.setHeader("Content-Type" ,"application/taxii+json; version=2.1")
//       res.status(200)
//       res.setHeader('X-TAXII-Date-Added-First','')
//       res.setHeader('X-TAXII-Date-Added-Last','')
//       res.send(JSON.parse(JSON.stringify(result)))
//     });
//   });
// });


// app.get('/:api(api*)/collections/',(req,res) => {
//   console.log(req.url)
//   console.log(req.params)
//   var url_parts = req.url.split('/')
//   query = ''
//   var api = req.params.api
//   if (url_parts[2] == "collections"){
//     var query = "collections"; 
//   }
//   console.log("\n\n =============================")
//   console.log("Client asking for api  xyz .. step 2 ...")

//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("taxii");

//     dbo.collection(api).find({}).project({collections : 1}).toArray(function(err, result) {
//       if (err) throw err;
//       db.close();

//       res.setHeader("Content-Type" ,"application/taxii+json; version=2.1")
//       res.status(200)
//       res.setHeader('X-TAXII-Date-Added-First','')
//       res.setHeader('X-TAXII-Date-Added-Last','')
//       res.send(JSON.parse(JSON.stringify(result)))
//     });
//   });
// });


// app.get('/:api(api*)/',(req,res) => {
//   console.log("Client asking for api1 123...")
//   var api = req.params.api.slice(0,-1);
//   console.log(api)
//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db(api);
//     dbo.collection('information').findOne({}, function(err, result) {
//       if (err) throw err;
//       db.close();
//       res.setHeader("Content-Type" ,"application/taxii+json; version=2.1")
//       res.status(200)
//       res.send(JSON.parse(JSON.stringify(result)))
//     });
//   });
// });



app.get("/:database/", (req, res) => {
  console.log("Dynamic database finder api hit 01...")
  auth = req.headers.authorization;
  // auth = true

  if (!auth) {
    res.sendStatus(406)
    console.log("Entered if ..")
  } else {
    var credentials = Buffer(req.headers.authorization.split(" ")[1], 'base64').toString();
    console.log(credentials)

    var username = credentials.split(':')[0]
    var password = credentials.split(':')[1]
    console.log(username + " :   " + password)

    let payload = { username: username }
    var accessToken = ''
    if (username != 'admin' || password != 'vehere@123') {
      return res.send("You dont have authorization")
    }
  }

  var database = req.params.database
  var coll = req.params.coll
  var field = req.params.field
  console.log(database + " : " + coll + " : " + field)
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(database);
    dbo.listCollections().toArray(function (err, result) {
      if (err) throw err;
      db.close();
      res.setHeader("Content-Type", "application/taxii+json; version=2.1")
      res.status(200)
      res.send(JSON.parse(JSON.stringify(result)))
    });
  });
})

app.get("/:database/:coll/", (req, res) => {
  console.log("Dynamic database and colls finder api hit 02...")

  auth = req.headers.authorization;
  // auth = true

  if (!auth) {
    res.sendStatus(406)
    console.log("Entered if ..")
  } else {
    var credentials = Buffer(req.headers.authorization.split(" ")[1], 'base64').toString();
    console.log(credentials)

    var username = credentials.split(':')[0]
    var password = credentials.split(':')[1]
    console.log(username + " :   " + password)

    let payload = { username: username }
    var accessToken = ''
    if (username != 'admin' || password != 'vehere@123') {
      return res.send("You dont have authorization")
    }
  }


  var database = req.params.database
  var coll = req.params.coll
  var field = req.params.field
  console.log(database + " : " + coll + " : " + field)
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(database);
    dbo.collection(coll).find({}).toArray(function (err, result) {
      if (err) throw err;
      db.close();
      res.setHeader("Content-Type", "application/taxii+json; version=2.1")
      res.status(200)
      res.send(JSON.parse(JSON.stringify(result)))
    });
  });
})

app.get("/:database/:coll/:field/", authorization, (req, res) => {
  console.log("Dynamic data finder api hit 03...")

  auth = req.headers.authorization;
  // auth = true

  if (!auth) {
    res.sendStatus(406)
    console.log("Entered if ..")
  } else {
    var credentials = Buffer(req.headers.authorization.split(" ")[1], 'base64').toString();
    console.log(credentials)

    var username = credentials.split(':')[0]
    var password = credentials.split(':')[1]
    console.log(username + " :   " + password)

    let payload = { username: username }
    var accessToken = ''
    if (username != 'admin' || password != 'vehere@123') {
      return res.send("You dont have authorization")
    }
  }


  var database = req.params.database
  var coll = req.params.coll
  var field = req.params.field
  console.log(database + " : " + coll + " : " + field)
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(database);
    dbo.collection(coll).find({}).toArray(function (err, result) {
      if (err) throw err;
      db.close();
      res.setHeader("Content-Type", "application/taxii+json; version=2.1")
      res.status(200)
      res.send(JSON.parse(JSON.stringify(result)))
    });
  });
})


// options = {

// }



// ************************************************************** //

app.post('/:database/:coll/', authorization, (req, res) => {

  if (req.headers['content-type'] != "application/taxii+json") {
    res.sendStatus(403)
    // process.exit(0)
  }
  var database = req.params.database
  var coll = req.params.coll
  // var field = req.params.field
  MongoClient.connect(url, function (err, db) {
    var dbo = db.db(database);

    console.log(req.headers)
    console.log(req.body)
    res.sendStatus(200)
    // dbo.collection(coll).insertOne(req.body);

    // dbo.collection("information").insertOne({
    //   "status": []
    // });
  })
  // dbo.collection("status").insertOne({});
})

app.post('/:database/:coll/', authorization, (req, res) => {

})

https.createServer(options, app).listen(5000)
// http.createServer(app).listen(5000)
