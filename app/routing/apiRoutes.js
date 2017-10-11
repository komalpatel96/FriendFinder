// Dependencies
// =============================================================
var path = require("path");

// Your `apiRoutes.js` file should contain two routes:

//    * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
//    * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. 
var friends = require("../data/friends.js")

module.exports = function(app) {
	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	// console.log(friends[0].scores);
	// console.log(friends[1].scores);

	app.post('/api/friends', function(req, res) {

		var newFriend = req.body;

		var bestMatch = {
			name: "",
			photo: "",
			scores: null
		};

		// console.log(req.body);
		var newFriend = {
			name: req.body.name,
			photo: req.body.photo,
			scores: req.body["scores[]"]
		}

		friends.push(newFriend);
		// console.log("req.body.scores[" + req.body["scores[]"] + "]")

		// var scoreDifference = 0;
		//have to set it outside - otherwise, undefined


		for (var i = 0; i < friends.length - 1; i++) {

			console.log("\n\r========================================\n\r");
			console.log("new Friend = " + newFriend.name);
			console.log("COMPARE = " + friends[i].name + "\n\r");
			// console.log(friends[i].name);

			var currentScore = null;

			for (var j = 0; j < 10; j++) {

				var score = Math.abs(friends[i].scores[j] - newFriend.scores[j]);

				currentScore = currentScore + score;
				console.log("Score for question: " + j + " " + score);

			}
			console.log("currentScore = " + currentScore);

			if (bestMatch.scores === null) {

				bestMatch.name = friends[i].name;
				bestMatch.photo = friends[i].photo;
				bestMatch.scores = currentScore;


			} else if (currentScore <= bestMatch.scores) {

				bestMatch.name = friends[i].name;
				bestMatch.photo = friends[i].photo;
				bestMatch.scores = currentScore;

				console.log("this is the best match rightnow: " + bestMatch.name);


			} else{
				console.log("\n\r" + friends[i].name + " is not the most compatible");

			}

		}

		// friends.push(req.body);

		res.json(bestMatch);
	});
};