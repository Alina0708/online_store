const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
      {id, email, role}, 
      process.env.SECRET_KEY,
      {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res){
      const {email, password, role} = req.body;
      if(!email|| !password){
        return res.status(404).json({ message: 'Некорректный логин или пароль' });
      }
      const doubleUser = await User.findOne({where: {email}}) 
      if(doubleUser){
        return res.status(404).json({ message: 'Такой пользователь уже зарегистрирован' });
      }
      const hashPassword = await bcrypt.hash(password, 2);
      const user = await User.create({email, role, password: hashPassword});
      const basket = await Basket.create({userId: user.id})
      const token = generateJwt(user.id, user.email, user.role);
      return res.json({token});
    }

    async login(req, res) {
      const {email, password} = req.body;
      const user = await User.findOne({where: {email}})
      if(!user){
        return res.status(404).json({ message: 'Пользователь не найден' });
      }

      let comparePassword = bcrypt .compareSync(password, user.password);
      if(!comparePassword){
        return res.status(404).json({ message: 'Неверный пароль' });
      }

      const token = generateJwt(user.id, user.email, user.role);
      return res.json({token});

    }

    async check(req, res, next) {
      const token = generateJwt(req.user.id, req.user.email, req.user.role)
      return res.json({token})
    }


}

module.exports = new UserController()