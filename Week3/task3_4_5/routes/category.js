const express = require('express');
const router = express.Router();

var fs = require("fs");
var path = require("path");

router.get('/category', (req, res,next) => {
	fs.readFile(path.join("./", "data/categories.json"), "utf8", (err, data) => {
		let categoryJson = JSON.parse(data);
		let categorysHeaderRes = categoryJson.header;
        let categoryBody = categoryJson.body;
        let categories =[];
		if (res.statusCode !== categorysHeaderRes.status) {
			res.send(categorysHeaderRes.errorMessage);
		} else {
			categoryBody.forEach(element => {
				categories.push({
					id: element._id,
					name: element.name,
					description: element.description
				})
			});
		}
		res.render('category', {
			title: "Categories Page",
			categories
		})
	});
});

module.exports = router;
