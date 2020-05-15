const express = require("express")
const Users = require("./user-model")

const router = express.Router()

router.get("/", async (req, res, next) => {
	try {
		res.json(await Users.find())
	} catch(err) {
		next(err)
	}
})

router.get("/:id", async (req, res, next) => {
	try {
		const users = await Users.findById(req.params.id)
		if (!users) {
			return res.status(404).json({
				message: "Users was not found",
			})
		}

		res.json(user)
	} catch(err) {
		next(err)
	}
})

router.post("/", async (req, res, next) => {
	try {
		const users = await Users.create(req.body)
		res.status(201).json(user)
	} catch(err) {
		next(err)
	}
})

module.exports = router