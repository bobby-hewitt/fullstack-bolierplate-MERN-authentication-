var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const UserController = require('../controllers/userController')


router.get('/:id', function (req, res) {
	let obj = {}
	UserController.get(obj)
	.then((user) => {
		res.status(200).send(user)
	})
	.catch((err) => {		
		res.status(500).send(err)
	})  
});


router.delete('/', function (req, res) {
	UserController.delete('ALL')
	.then((user) => {
		res.status(200).send(user)
	})
	.catch((err) => {
		res.status(500).send(err)
	})  
});


module.exports = router;