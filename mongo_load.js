


var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://harnad:harnad@ds027295.mongolab.com:27295/heroku_l34029sw";
MongoClient.connect(url,function(err,db){
    console.log("connected correctly to server");
    //db.close();
//console.log(db);
    db.createCollection("testdata");
    console.log('Table created!');

    var fs  = require("fs");
    fs.readFile('client/data.json', 'utf8', function(err,data){

        if(err)
        {
            console.log('err');
        }
        else
        {

            var arr = JSON.parse(data);


            for (var i = 0; i < arr.length; i++) {
                var doc1 = {
                    id: arr[i].id,
                    fname: arr[i].fname,
                    lname: arr[i].lname,


                }

                db.collection('testdata').insertOne(doc1, function(err,result){
                    if(err){

                        console.log('err');
                    }

                    else{
                        //console.log(result);
                        console.log("Successfully inserted");
                    }
                });
            }
        }
    });
});
