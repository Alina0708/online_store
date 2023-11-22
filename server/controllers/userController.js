const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");
const nodemailer = require("nodemailer");

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res) {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return res.status(404).json({ message: "Некорректный логин или пароль" });
    }
    const doubleUser = await User.findOne({ where: { email } });
    if (doubleUser) {
      return res
        .status(404)
        .json({ message: "Такой пользователь уже зарегистрирован" });
    }
    const hashPassword = await bcrypt.hash(password, 2);
    const user = await User.create({ email, role, password: hashPassword });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return res.status(404).json({ message: "Неверный пароль" });
    }

    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async check(req, res) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }

  async sendMessage(req, res) {
    try {
      const { nameUser, email, message } = req.query;
  
      const adminEmail = "alina.sevryuk0708@gmail.com";
  
      const transporter = nodemailer.createTransport({
        service: "alina.sevryuk0708@gmail.com",
        auth: {
          user: "alina46203a@gmail.com",
          pass: "mpvd bbyq kjru bfxl",
        },
      });
  
      const mailOptions = {
        from: email,
        to: adminEmail,
        subject: `New Message from ${nameUser}`,
        text: `Name: ${nameUser}\nEmail: ${email}\n\nMessage:\n${message}`,
      };
  
      const info = await transporter.sendMail(mailOptions);
  
      if (info.accepted.length > 0) {
        res.status(200).json({ message: "Message sent successfully", info });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();

