const ApiError = require('../error/ApiError');

class UserController {
    async registration(req, res){

    }

    async login(req, res) {

    }

    async check(req, res, next) {
      const {id} = req.query


      if(!id){
        return next(ApiError.errorRequest("specify the id"));
      }
      res.json(id)
    }


}

module.exports = new UserController()