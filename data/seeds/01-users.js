exports.seed = async function(knex) {
	await knex("users").truncate()
	await knex("users").insert([
		{ name: "Michael" },
		{ name: "Robert" },
		{ name: "Jake" },
		{ name: "John" },
		{ name: "Mike" },
		{ name: "Rick" },
		{ name: "Joe" },
		{ name: "John" },
	])
}
