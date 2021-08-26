// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/taxii";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   console.log("Database created!");
//   db.close();
// });



var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("taxii");
  dbo.collection("discovery").drop(function (err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
  var dbo = db.db("api1");
  dbo.dropDatabase(function (err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
  var dbo = db.db("api2");
  dbo.dropDatabase(function (err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
  var dbo = db.db("trustgroup1");
  dbo.dropDatabase(function (err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });

  var dbo = db.db("taxii");
  dbo.createCollection("discovery", function (err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });

  dbo.collection('discovery').insertOne({
    "title": "Some TAXII Server",
    "description": "This TAXII Server contains a listing of",
    "contact": "string containing contact information",
    "default": "http://localhost:5000/trustgroup1/",
    "api_roots": [
      "http://localhost:5000/api1/",
      "http://localhost:5000/api2/",
      "http://localhost:5000/trustgroup1/"
    ]
  });


  // dbo.createCollection("api1", function (err, res) {
  //   if (err) throw err;
  //   console.log("Collection created!");
  //   db.close();
  // });

  var dbo = db.db("api1");

  dbo.collection("information").insertOne({
    "title": "General STIX 2.1 Collections",
    "description": "A repo for general STIX data.",
    "versions": [
      "application/taxii+json;version=2.1"
    ],
    "max_content_length": 9765625
  });

  dbo.collection("information").insertOne({
    "status": []
  });

  dbo.collection("status").insertOne({});


  // dbo.createCollection("api2", function (err, res) {
  //   if (err) throw err;
  //   console.log("Collection created!");
  //   db.close();
  // });


  dbo.collection('collections').insertMany([{
    "id": "472c94ae-3113-4e3e-a4dd-a9f4ac7471d4",
    "title": "This data collection is for testing querying across collections",
    "can_read": false,
    "can_write": true,
    "media_types": [
      "application/stix+json;version=2.1"
    ],
    "objects": [],
    "manifest": []
  },
    {
      "id": "365fed99-08fa-fdcd-a1b3-fb247eb41d01",
      "title": "This data collection is for testing adding objects",
      "can_read": true,
      "can_write": true,
      "media_types": [
        "application/stix+json;version=2.1"
      ],
      "objects": [],
      "manifest": []
    }]);


  // dbo.createCollection("trustgroup1", function (err, res) {
  //   if (err) throw err;
  //   console.log("Collection created!");
  //   db.close();
  // });

  dbo = db.db('api2')
  dbo.collection('information').insertOne({
    "title": "STIX 2.1 Indicator Collections",
    "description": "A repo for general STIX data.",
    "versions": [
      "application/taxii+json;version=2.1"
    ],
    "max_content_length": 9765625
  });

  dbo.collection("status").insertOne({});
  dbo.collection("collections").insertOne({});



  dbo = db.db('trustgroup1')
  dbo.collection('information').insertOne({
    "title": "Malware Research Group",
    "description": "A trust group setup for malware researchers",
    "versions": [
      "application/taxii+json;version=2.1"
    ],
    "max_content_length": 9765625
  });

  dbo.collection("status").insertMany([{
    "id": "2d086da7-4bdc-4f91-900e-d77486753710",
    "status": "pending",
    "request_timestamp": "2016-11-02T12:34:34.123456Z",
    "total_count": 4,
    "success_count": 1,
    "successes": [
      {
        "id": "indicator--cd981c25-8042-4166-8945-51178443bdac",
        "version": "2014-05-08T09:00:00.000Z",
        "message": "Successfully added object to collection '91a7b528-80eb-42ed-a74d-c6fbd5a26116'."
      }
    ],
    "failure_count": 1,
    "failures": [
      {
        "id": "malware--664fa29d-bf65-4f28-a667-bdb76f29ec98",
        "version": "2015-05-08T09:00:00.000Z",
        "message": "Unable to process object"
      }
    ],
    "pending_count": 2,
    "pendings": [
      {
        "id": "indicator--252c7c11-daf2-42bd-843b-be65edca9f61",
        "version": "2016-08-08T09:00:00.000Z"
      },
      {
        "id": "relationship--045585ad-a22f-4333-af33-bfd503a683b5",
        "version": "2016-06-08T09:00:00.000Z"
      }
    ]
  },
    {
      "id": "2d086da7-4bdc-4f91-900e-f4566be4b780",
      "status": "pending",
      "request_timestamp": "2016-11-02T12:34:34.123456Z",
      "total_objects": 0,
      "success_count": 0,
      "successes": [],
      "failure_count": 0,
      "failures": [],
      "pending_count": 0,
      "pendings": []
    }]);

  dbo.collection("collections").insertMany([{
    "id": "472c94ae-3113-4e3e-a4dd-a9f4ac7471d4",
    "title": "This data collection is for testing querying across collections",
    "can_read": false,
    "can_write": true,
    "media_types": [
      "application/stix+json;version=2.1"
    ],
    "objects": [],
    "manifest": []
  },
    {
      "id": "365fed99-08fa-fdcd-a1b3-fb247eb41d01",
      "title": "This data collection is for testing adding objects",
      "can_read": true,
      "can_write": true,
      "media_types": [
        "application/stix+json;version=2.1"
      ],
      "objects": [],
      "manifest": []
    },
    {
      "id": "91a7b528-80eb-42ed-a74d-c6fbd5a26116",
      "title": "High Value Indicator Collection",
      "description": "This data collection is for collecting high value IOCs",
      "can_read": true,
      "can_write": true,
      "media_types": [
        "application/stix+json;version=2.0",
        "application/stix+json;version=2.1"
      ],
      "objects": [
        {
          "created": "2014-05-08T09:00:00.000Z",
          "modified": "2014-05-08T09:00:00.000Z",
          "id": "relationship--2f9a9aa9-108a-4333-83e2-4fb25add0463",
          "relationship_type": "indicates",
          "source_ref": "indicator--cd981c25-8042-4166-8945-51178443bdac",
          "spec_version": "2.1",
          "target_ref": "malware--c0931cc6-c75e-47e5-9036-78fabc95d4ec",
          "type": "relationship"
        },
        {
          "created": "2014-05-08T09:00:00.000Z",
          "id": "indicator--cd981c25-8042-4166-8945-51178443bdac",
          "indicator_types": [
            "file-hash-watchlist"
          ],
          "modified": "2014-05-08T09:00:00.000Z",
          "name": "File hash for Poison Ivy variant",
          "pattern": "[file:hashes.'SHA-256' = 'ef537f25c895bfa782526529a9b63d97aa631564d5d789c2b765448c8635fb6c']",
          "pattern_type": "stix",
          "spec_version": "2.1",
          "type": "indicator",
          "valid_from": "2014-05-08T09:00:00.000000Z"
        },
        {
          "created": "2016-11-03T12:30:59.000Z",
          "description": "Accessing this url will infect your machine with malware.",
          "id": "indicator--6770298f-0fd8-471a-ab8c-1c658a46574e",
          "indicator_types": [
            "url-watchlist"
          ],
          "modified": "2016-11-03T12:30:59.000Z",
          "name": "Malicious site hosting downloader",
          "pattern": "[url:value = 'http://z4z10farb.cn/4712']",
          "pattern_type": "stix",
          "spec_version": "2.1",
          "type": "indicator",
          "valid_from": "2017-01-27T13:49:53.935382Z"
        },
        {
          "created": "2016-11-03T12:30:59.000Z",
          "description": "Accessing this url will infect your machine with malware. Updated indicator",
          "id": "indicator--6770298f-0fd8-471a-ab8c-1c658a46574e",
          "indicator_types": [
            "url-watchlist"
          ],
          "modified": "2016-12-25T12:30:59.444Z",
          "name": "Malicious site hosting downloader",
          "pattern": "[url:value = 'http://x4z9arb.cn/4712']",
          "pattern_type": "stix",
          "spec_version": "2.1",
          "type": "indicator",
          "valid_from": "2017-01-27T13:49:53.935382Z"
        },
        {
          "created": "2016-11-03T12:30:59.000Z",
          "description": "Accessing this url will infect your machine with malware. This is the last updated indicator",
          "id": "indicator--6770298f-0fd8-471a-ab8c-1c658a46574e",
          "indicator_types": [
            "url-watchlist"
          ],
          "modified": "2017-01-27T13:49:53.935Z",
          "name": "Malicious site hosting downloader",
          "pattern": "[url:value = 'http://x4z9arb.cn/4712']",
          "pattern_type": "stix",
          "spec_version": "2.1",
          "type": "indicator",
          "valid_from": "2016-11-03T12:30:59.000Z"
        },
        {
          "created": "2017-01-20T00:00:00.000Z",
          "definition": {
            "tlp": "green"
          },
          "definition_type": "tlp",
          "id": "marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da",
          "name": "TLP:GREEN",
          "spec_version": "2.1",
          "type": "marking-definition"
        },
        {
          "created": "2017-01-27T13:49:53.997Z",
          "description": "Poison Ivy",
          "id": "malware--c0931cc6-c75e-47e5-9036-78fabc95d4ec",
          "is_family": true,
          "malware_types": [
            "remote-access-trojan"
          ],
          "modified": "2018-02-23T18:30:00.000Z",
          "name": "Poison Ivy",
          "type": "malware"
        },
        {
          "created": "2017-01-27T13:49:53.997Z",
          "description": "Poison Ivy",
          "id": "malware--c0931cc6-c75e-47e5-9036-78fabc95d4ec",
          "is_family": true,
          "malware_types": [
            "remote-access-trojan"
          ],
          "modified": "2017-01-27T13:49:53.997Z",
          "name": "Poison Ivy",
          "spec_version": "2.1",
          "type": "malware"
        }
      ],
      "manifest": [
        {
          "date_added": "2014-05-08T09:00:00.000000Z",
          "id": "relationship--2f9a9aa9-108a-4333-83e2-4fb25add0463",
          "media_type": "application/stix+json;version=2.1",
          "version": "2014-05-08T09:00:00.000Z"
        },
        {
          "date_added": "2016-11-01T03:04:05.000000Z",
          "id": "indicator--cd981c25-8042-4166-8945-51178443bdac",
          "media_type": "application/stix+json;version=2.1",
          "version": "2014-05-08T09:00:00.000Z"
        },
        {
          "date_added": "2016-11-03T12:30:59.001000Z",
          "id": "indicator--6770298f-0fd8-471a-ab8c-1c658a46574e",
          "media_type": "application/stix+json;version=2.1",
          "version": "2016-11-03T12:30:59.000Z"
        },
        {
          "date_added": "2016-12-27T13:49:59.000000Z",
          "id": "indicator--6770298f-0fd8-471a-ab8c-1c658a46574e",
          "media_type": "application/stix+json;version=2.1",
          "version": "2016-12-25T12:30:59.444Z"
        },
        {
          "date_added": "2017-01-20T00:00:00.000000Z",
          "id": "marking-definition--34098fce-860f-48ae-8e50-ebd3cc5e41da",
          "media_type": "application/stix+json;version=2.1",
          "version": "2017-01-20T00:00:00.000Z"
        },
        {
          "date_added": "2017-01-27T13:49:59.997000Z",
          "id": "malware--c0931cc6-c75e-47e5-9036-78fabc95d4ec",
          "media_type": "application/stix+json;version=2.1",
          "version": "2017-01-27T13:49:53.997Z"
        },
        {
          "date_added": "2017-01-27T13:49:59.997000Z",
          "id": "malware--c0931cc6-c75e-47e5-9036-78fabc95d4ec",
          "media_type": "application/stix+json;version=2.0",
          "version": "2018-02-23T18:30:00.000Z"
        },
        {
          "date_added": "2017-12-31T13:49:53.935000Z",
          "id": "indicator--6770298f-0fd8-471a-ab8c-1c658a46574e",
          "media_type": "application/stix+json;version=2.1",
          "version": "2017-01-27T13:49:53.935Z"
        }
      ]
    },
    {
      "id": "52892447-4d7e-4f70-b94d-d7f22742ff63",
      "title": "Indicators from the past 24-hours",
      "description": "This data collection is for collecting current IOCs",
      "can_read": true,
      "can_write": false,
      "media_types": [
        "application/stix+json;version=2.1"
      ],
      "objects": [],
      "manifest": []
    },
    {
      "id": "64993447-4d7e-4f70-b94d-d7f33742ee63",
      "title": "Secret Indicators",
      "description": "Non accessible",
      "can_read": false,
      "can_write": false,
      "media_types": [
        "application/stix+json;version=2.1"
      ],
      "objects": [],
      "manifest": []
    }]);


});