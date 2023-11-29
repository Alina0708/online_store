const { Genre } = require("../models/models");
const ApiError = require("../error/ApiError");
const { Op } = require("sequelize");

class GenreController {
  async create(req, res) {
    try {
      const { name, description } = req.body;
      const genre = await Genre.create({ name, description });
      res.status(201).json(genre);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAll(req, res) {
    const genres = await Genre.findAll();
    return res.json(genres);
  }

  async deleteGenreId(req, res) {
    const { id } = req.params;

    try {
      const genre = await Genre.findOne({ where: { id } });

      if (!genre) {
        return res.status(404).json({ error: "Genre not found" });
      }

      await genre.destroy();

      res.status(204).send("Successful delete");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "error" });
    }
  }

  async getGenreDescription(req, res) {
    const { name } = req.params;

  try {
    const genre = await Genre.findOne({ where: { name: { [Op.like]: `${name}%` } } });

    if (genre) {
      const description = genre.description;
      res.status(200).json(description); 
    } else {
      res.status(404).json({ message: "Genre not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
  }
}

module.exports = new GenreController();
