const {Books, Genre, AUTORS} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const { Op } = require('sequelize');

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

    async getOneName(req, res){
        try {
            const title = req.params.title; 
            const book = await Books.findOne({
              where: {
                name: title
              }
            });
        
            if (book) {
              res.json(book); // Отправьте найденную книгу в формате JSON в ответе
            } else {
              res.status(404).json({ error: 'Книга не найдена' }); // Если книга не найдена, верните статус 404
            }
          } catch (error) {
            console.error('Ошибка при поиске книги:', error);
            res.status(500).json({ error: 'Внутренняя ошибка сервера' }); // Обработка ошибки сервера
          }
     }

     async getOneAutor(req, res){
        try {
            const autor = req.params.autor; // Предполагается, что фамилия автора передается в параметрах маршрута
        
            // Найдем автора по фамилии
            const autors = await AUTORS.findOne({
              where: { last_name: autor },
            });
        
            if (!autors) {
              return res.status(404).json({ message: 'Автор не найден' });
            }
        
            // Теперь найдем все книги, связанные с этим автором
            const books = await Books.findAll({
              where: { autorId: autors.id },
            });
        
            if (!books || books.length === 0) {
              return res.status(404).json({ message: 'Книги этого автора не найдены' });
            }
        
            // Отправим список книг в ответ
            res.status(200).json({ autor: autors, books });
          } catch (error) {
            console.error('Ошибка при поиске книг по автору:', error);
            res.status(500).json({ message: 'Ошибка при поиске книг по автору' });
          }
     }

     async getBookOne(req, res) {
      try {
        const bookId = req.params.id;
        const book = await Books.findOne({ 
          where: { id: bookId },
          include: [
            {
              model: Genre,
              attributes: ['name']
             },
            {
              model: AUTORS,
              attributes: ['first_name','last_name']
            }
          ]
        });
    
        if (!book) {
          return res.status(404).json({ message: "Book not found" });
        }
    
        res.status(200).json({
          name: book.name,
          price: book.price,
          rating: book.rating,
          img: book.img,
          description: book.description,
          genre: book.genre.name,
          author: `${book.autor.first_name} ${book.autor.last_name}`
        });
      } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server Error" });
      }
    }

}

module.exports = new BooksController()