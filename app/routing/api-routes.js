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

  var bestMatchIndex = 0;
  var bestMatchSame = 0;
  var bestMatchDiff = 0;

  //loop through all our friends
  for(var i = 0; i < friends.length; i++) {

  	var samePoint = 0;
  	var diffPoint = 0;
  	
  	//iterate through all the scores, counting answers that match and taking diffs of answers that don't
  	console.log("comparing vs ", friends[i].name);
  	console.log(newFriend.scores);
  	console.log(friends[i].scores);

  	for(var j = 0; j < friends[i].scores.length; j++) {

  		if (parseInt(friends[i].scores[j]) === parseInt(newFriend.scores[j])) {
  			samePoint++;
  		}
  		else if(parseInt(friends[i].scores[j]) > parseInt(newFriend.scores[j]) ) {
  			diffPoint = diffPoint + (parseInt(friends[i].scores[j]) - parseInt(newFriend.scores[j]));
  		}
  		else {
  			diffPoint = diffPoint + (parseInt(newFriend.scores[j]) - parseInt(friends[i].scores[j]));	
  		}
  	}

  	console.log("samePoint", samePoint);
  	console.log("diffPoint", diffPoint);

  	if( (samePoint > bestMatchSame) || (samePoint === bestMatchSame && diffPoint < bestMatchDiff)) {
  		bestMatchIndex = i;
  		bestMatchSame = samePoint;
  		bestMatchDiff = diffPoint;
  	}

  }

  //add your newfriend to the list of friends
  friends.push(newFriend);

  console.log(friends[bestMatchIndex]);
  console.log(bestMatchIndex, bestMatchSame, bestMatchDiff);

  //return the best match
  res.json(friends[bestMatchIndex]);

});

module.exports = router;
