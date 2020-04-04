const express = require('express');
const app = express();
const router = express.Router();

const fs = require('fs');
const path = require('path');

/*Get users page. */
router.get('/users', (req, res) => {
	const getFullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
	fs.readFile(path.join("./data", "users.json"), "utf8", (err, data) => {
		let usersJson = JSON.parse(data);
		let usersHeaderRes = usersJson.header;
		let usersBody = usersJson.body;
		let userEach = [];
		if (res.statusCode !== usersHeaderRes.status) {
			res.send(usersHeaderRes.errorMessage);
		} else {
			usersBody.forEach(element => {
				let fullName = `${element.lastName} ${element.firstName}`
				userEach.push({
					id: element._id,
					avatar: element.avatar,
					fullName,
					gender: element.gender,
					country: element.country,
					email: element.email,
					url: getFullUrl
				})
			});
			res.render('users', {
				title: "Users Page",
				users: userEach
			})
		}
	});
});

router.get('/users/:id', (req,res) => {
	const getId = req.params.id;
	fs.readFile(path.join("./", "data/users.json"), "utf8", (err, data) => {
		let usersJson = JSON.parse(data);
		let usersHeaderRes = usersJson.header;
		let usersBody = usersJson.body;
		if (res.statusCode !== usersHeaderRes.status) {
			res.send(usersHeaderRes.errorMessage);
		} else {
			let userFilter = usersBody.filter(user => {
				return user._id === getId
			})
			res.render('profile', {
				getId,
				user: userFilter,
			});
		}
	});
})

module.exports = router;