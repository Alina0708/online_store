const { AUTORS } = require("../models/models");
const ApiError = require("../error/ApiError");

class AutorController {
  async create(req, res) {
    try {
      const { first_name, last_name } = req.body;
      const autor = await AUTORS.create({ first_name, last_name });
      res.status(201).json(autor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAll(req, res) {
    const autors = await AUTORS.findAll();
    return res.json(autors);
  }

  async deleteAutorId(req, res) {
    const { id } = req.params; 

    try {
      const autor = await AUTORS.findOne({ where: { id } }); 

      if (!autor) {
        return res.status(404).json({ error: "Autor не найден" });
      }

      await autor.destroy(); // Удалите жанр

      res.status(204).send("Успешно удалено"); // Верните успешный статус без содержимого
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Произошла ошибка при удалении жанра" });
    }
  }
}

module.exports = new AutorController();
