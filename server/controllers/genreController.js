const {Genre} = require('../models/models')
const ApiError = require('../error/ApiError');

class GenreController {
    async create(req, res) {
        try {
            const { name, description } = req.body;
            const genre = await Genre.create({ name, description });
            res.status(201).json(genre);
          } 
          catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
          }
    }

    async getAll(req, res) {
        const genres = await Genre.findAll()
        return res.json(genres)
    }

}

module.exports = new GenreController()