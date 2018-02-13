// internal dependencies
const GetAllTweetsController = require("./src/controllers/GetAllTweetsController");
const Factory = require("./src/factories/Factory");
const config = require("./config.js");

// external dependencies
const express = require("express");

// express init and config
const app = express();
const port = process.env.PORT || 3000;

// components instantiation
const factory = new Factory();
const controller = new GetAllTweetsController(factory);

// routes
app.route("/tweets").get((req, res) => controller.onGetAllTweets(req,res));
// app.route("/tweets?username={username}").get((req, res) => controller.onGetAllTweets(req,res));

// start listening
app.listen(port);
console.log("twitter data miner RESTful API server started on: " + port);

// establish connection to mongodb atlas
// mongodb.connect(config.db.uri, (err, db) => {

//     if (err) {
//         console.log("An error occurred while attempting to connect to MongoDB", err)
//         process.exit(1)
//     }

//     console.log(
//         "%s v%s ready to accept connections on port %s in %s environment.",
//         server.name,
//         config.version,
//         config.port,
//         config.env
//     )

//     require("./routes")({ db, server })

// });
