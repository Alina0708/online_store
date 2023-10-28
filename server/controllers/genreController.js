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

    async deleteGenreId(req, res){
      
      const { id } = req.params; // Получите id жанра из параметров запроса

    try {
        const genre = await Genre.findOne({ where: { id } }); // Найти жанр по id

        if (!genre) {
            return res.status(404).json({ error: 'Жанр не найден' });
        }

        await genre.destroy(); // Удалите жанр

        res.status(204).send("Успешно удалено"); // Верните успешный статус без содержимого
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Произошла ошибка при удалении жанра' });
    }

    }

}

module.exports = new GenreController()