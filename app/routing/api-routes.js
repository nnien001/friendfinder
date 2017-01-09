console.log("using api-routes.js");

var express = require("express");
var router = express.Router();
var friends = require("../data/friends.js");

router.get("/friends", function (req, res) {
	res.json(friends);
});

router.post("/friends", function (req, res) {
  var newFriend = req.body;
  console.log(newFriend);
  friends.push(newFriend);
  res.json(newFriend);

});

module.exports = router;
