const express = require("express")
const Users = require("./user-model")

const router = express.Router()
// GET USERS
router.get("/", async (req, res, next) => {
	const users = await Users.find()

	try {
		res.json(users)
	} catch (err) {
		next(err)
	}
})
// GET USER BY ID
router.get("/:id", async (req, res, next) => {
	try {
		const users = await Users.findById(req.params.id)
		if (!users) {
			return res.status(404).json({
				message: "Users was not found",
			})
		}

		res.json(users)
	} catch (err) {
		next(err)
	}
})
// CREATE
router.post("/", async (req, res, next) => {
	try {
		const users = await Users.create(req.body)
		res.status(201).json(users)
	} catch (err) {
		next(err)
	}
})
// DELETE USER
router.delete("/:id", async (req, res, next) => {
	try {
		const user = await Users.findById(req.params.id)
		res.status(204).json(user)
	} catch (err) {
		next(err)
	}
})

// UPDATE USER
router.put("/:id", (req, res) => {
	if (!req.body.name) {
		return res.status(400).json({
			errorMessage: "Please provide name for the user.",
		});
	}

	Users.validateUser(req.params.id)

	Users.update(req.params.id, req.body)
		.then((user) => {
		//	console.log(res);

			return res.status(200).json(user);
		})
		.catch((error) => {
			console.log(error);
			return res.status(500).json({
				error: "The user information could not be modified.",
			});
		});
});

module.exports = router