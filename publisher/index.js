const express = require("express");
const redis = require("redis");
const publisher = redis.createClient();
const axios = require("axios");

const app = express();

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

/**
 * POST endpoint to publish a new topic
 * @param
 */
app.post("/publish/:topic", (req, res) => {
	const data = req.body;
	const topic = req.params.topic;

	const publish_notification = publisher.publish(topic, JSON.stringify(data));
	res.json({ data: data, status: publish_notification, channel: topic });
});

/**
 * @param topic subscribe endpoint with topic as param
 */
app.post("/subscribe/:topic", async (req, res) => {
	//automatic subscription to the topic being shared

	//TODO: should add validation somewhere here (Celebrater & Joi)
	let url = req.body.url;
	let topic = req.params.topic;

	//url = the url passed in the url data, this url becomes where we subscribe to eventually
	//call the subscriber with the details of the request sent
	const subscribe_topic = await axios
		.post(url, { topic, url })
		.then(function (response) {
			return response.data;
		})
		.catch(function (error) {
			//some error occured probably we are calling a link that doesnt exist so we ignore subscription or we have typed bonjour lemasi

			//Coulda throw error here but choose to retuurn error object, adjustable and depends on system setup on the front
			return {
				status:
					"Some Error Occured, recipient server not responding, link subscription failed",
				error: true,
				message: error.message,
			};
		});

	res.json(subscribe_topic).status(200); //200 always sent to client
});

app.listen(8000, () => {
	console.log(`Publisher server is listening on PORT 8000`);
});
