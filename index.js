var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
app.set('port', (5000));

app.use(express.static(__dirname + '/public'));
// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (request, response) {
    response.render('pages/index');
});

var i=1;


app.get('/getItems', function (req, res) {
   if(i<151) {
       console.log(i);
       var url = "mongodb://harnad:harnad@ds063134.mongolab.com:63134/heroku_j1cdrsnp";
       /*  MongoClient.connect(url, function (err, db) {
        console.log("connected correctly to server");

        });
        */
       MongoClient.connect(url, function (err, db) {
           // assert.equal(null, err);
           getById(db, function () {
               db.close();
           });
       });

       var getById = function (db, callback) {
           //  var cursor = db.collection('testdata').find();
           var cursor = db.collection('testdata').find({"id": parseInt(i)});
           i = i + 1;
           // var cursor =db.collection('employees').find(['id']);

           cursor.each(function (err, doc) {
               //  assert.equal(err, null);
               if (doc != null) {

                   console.log(doc);
                   res.contentType('application/json');
                   res.setHeader("Access-Control-Allow-Origin", "*");
                   res.json(doc);

               }


           });

       }
   }

});


app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});



