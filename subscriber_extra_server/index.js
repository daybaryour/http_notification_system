const express = require("express");
const redis = require("redis");
const { response } = require("express");

const subscriber = redis.createClient();

const app = express();
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

subscriber.on("message", (channel, message) => {
	console.log(`Received data : ${channel}` + message); //All channels
});

app.post("/:param", (req, res) => {
	//automatic subscription to the topic being shared
	let url = req.body.url;
	let topic = req.body.topic;
	let param = req.params.param;

	subscriber.subscribe(topic);

	const response = { url, topic };

	res.json(response).status(200);
});

app.listen(7000, () => {
	console.log("Second Subscriber server is listening to port 7000");
});
