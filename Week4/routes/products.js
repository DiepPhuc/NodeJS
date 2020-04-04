const express = require('express');
const app = express();
const router = express.Router();

var fs = require("fs");
var path = require("path");

router.get("/products_list", function (req, res, next) {
	const getFullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
	fs.readFile(path.join("./", "data/products.json"), "utf8", (err, data) => {
		if (err) throw err;
		else {
			let productsJson = JSON.parse(data);
			let productHeaderRes = productsJson.header;
			if (res.statusCode !== productHeaderRes.status) {
				res.send(productHeaderRes.errorMessage);
            }
            else {
				let productsBody = productsJson.body;
				let productMap = productsBody.map(e => {
					return {
						id : e._id,
						thumbnail : e.thumbnail,
						name : e.name,
						originalPrice : e.originalPrice,
						salePrice : e.salePrice,
						url : getFullUrl,
						des: e.shortDescription,
						category_id: e.categoryId
					};
				});
				res.render("products_list", {
					title: "Products Page",
					products: productMap
				});
			}
		}
	});
});

router.get('/products_list/:id', (req,res) => {
	const getId = req.params.id;
	fs.readFile(path.join("./", "data/products.json"), "utf8", (err, data) => {
		let productJson = JSON.parse(data);
		let productHeader = productJson.header;
		let productBody = productJson.body;
		if (res.statusCode !== productHeader.status) {
			res.send(productHeader.errorMessage);
		} else {
			let productFilter = productBody.filter(product => {
				return product._id === getId
			})
			res.render('product', {
				getId,
				product: productFilter,
			});
		}
	});
})


module.exports = router;
