/*
- when making a GET request to the `/` endpoint 
  the API should respond with status code 200 
  and the following JSON object: `{ message: "Welcome to our API" }`.
*/
const request = require('supertest'); // calling it "request" is a common practice

const server = require('../api/server.js'); // this is our first red, file doesn't exist yet
const db = require('../data/config')


describe('user-model.js', () => {
  
    
       it('create function', () => {

        let users = await db('users')
      
        let data = {
            name: "Paul",

        }
        let id = 1

        users.insert(data)
        let user = await  db("users").where("id", id).first()
           expect(user).where({ id }).toEqual({
               name: "Paul"
           })
    })

      it('delete function', () => {

          let user = await db('users').where({id:1}).first()
      // status('204').del()
        let data = {
            name: "Paul",

        }
        let id = 1

          user.status(204).del()
          expect(user.status).toBe('204')
          expect(user).where({ id }).toEqual({})
    })

    it('update function', () => {

        let users = await db('users');
      
        let data = {
            name: "Paul"
        }
        let id = 1

        
        await db('users').where({ id }).update(data)
        expect(users.name).where({ id }).toBe('Paul')
    })


})
        
        