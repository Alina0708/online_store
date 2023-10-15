const {Books} = require('../models/models')
const uuid = require('uuid')
const path = require('path')

class BooksController {
    async create(req, res) {
        try {
            const { name, autorId, description, price, genreId} = req.body;

            const {img} = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const book = await Books.create({
                name,
                autorId,
                description,
                price,
                genreId,
                img: fileName
            });

            res.status(201).json(book);
          } 
          catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
          }
    }

    async getAll(req, res) {
        const books = await Books.findAll()
        return res.json(books)
    }

    async genOn(req, res){

    }

}

module.exports = new BooksController()