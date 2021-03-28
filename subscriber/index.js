const express = require("express");
const redis = require("redis");

const subscriber = redis.createClient();

const app = express();
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

//Redis Subscriber listening for messages on subscribed channels
subscriber.on("message", (channel, message) => {
	console.log(`Received data : ${channel} ` + message); //All channels
});

/**
 * Posted Url
 */
app.post("/:param", (req, res) => {
	//automatic subscription to the topic being shared
	let url = req.body.url;
	let topic = req.body.topic;
	// let param = req.params.param; //YAGNI

	subscriber.subscribe(topic);

	const response = { url, topic };
	res.json(response).status(200);
});

app.listen(9000, () => {
	console.log("Subscriber server is listening to port 9000");
});
