const db = require("../data/config")

async function create(data) {
	const [id] = await db("users").insert(data)
	return findById(id)
}

//UPDATE USER
async function update(id, data) {
	await db("users").where({id}).update(data)
	return findById(id)
}

 function validateUser(id) {
	let user = findById(id)

		.then((user) => {
			if (user.length === 0) {
				return res.status(404).json({
					message: "The user with the specified ID does not exist.",
				});
			}
		})
		.catch((error) => {
			console.log(error);
		});

}

function remove(id) {
	return db("users").status(204).del()
}

function find() {
	return db("users")
}

function findById(id) {
	return db("users")
		.where("id", id)
		.first()
}

module.exports = {
	create,
	update,
	remove,
	find,
	findById,
	validateUser
}
