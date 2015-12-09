var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('pages/index');
});

var i=1;
app.get('/getItems', function(req, res) {

    var cursor, document;
    //connect to Mongodb
        console.log(i);

        var url = "mongodb://harnad:harnad@ds027295.mongolab.com:27295/heroku_l34029sw";
        //MongoClient.connect(url, function (err, db) {
        //
        // });

        //some random function
        MongoClient.connect(url, function (err, db) {
            console.log("connected correctly to server");
            //assert.equal(null, err);
            getById(db, function () {
                db.close();
            });
        });

        //query function

        //for(int i=1;i<201;i++ ){
        var getById = function (db, callback) {
            cursor = db.collection('testdata').find({"id": parseInt(i)});
            i = i + 1;
            //  console.log("size is"+cursor.count());
            cursor.each(function (err, doc) {
                // assert.equal(err, null);
                if (doc != null) {

                    console.log(doc);

                    res.contentType('application/json');
                    res.setHeader("Access-Control-Allow-Origin", "*");
                    res.json(doc);
                }
            });


        }

});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});