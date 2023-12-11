const { Books, Genre, AUTORS } = require("../models/models");
const uuid = require("uuid");
const path = require("path");
const { Op } = require("sequelize");

class BooksController {
  async create(req, res) {
    try {
      const { name, autorId, description, price, genreId } = req.body;

      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      const book = await Books.create({
        name,
        autorId,
        description,
        price,
        genreId,
        img: fileName,
      });

      res.status(201).json(book);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }

  async getAll(req, res) {
    const books = await Books.findAll();
    return res.json(books);
  }

  async getOneName(req, res) {
    try {
      const title = req.params.title;
      const book = await Books.findOne({
        where: {
          name: title,
        },
      });

      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ error: "Книга не найдена" });
      }
    } catch (error) {
      console.error("Ошибка при поиске книги:", error);
      res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
  }

  async getOneAutor(req, res) {
    try {
      const autor = req.params.autor;

      const autors = await AUTORS.findAll({
        where: { last_name: autor },
      });

      if (!autors) {
        return res.status(404).json({ message: "Автор не найден" });
      }

      const books = await Books.findAll({
        where: { autorId: autors.id },
      });

      if (!books || books.length === 0) {
        return res
          .status(404)
          .json({ message: "Книги этого автора не найдены" });
      }

      res.status(200).json({ autor: autors, books });
    } catch (error) {
      console.error("Ошибка при поиске книг по автору:", error);
      res.status(500).json({ message: "Ошибка при поиске книг по автору" });
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
            attributes: ["name"],
          },
          {
            model: AUTORS,
            attributes: ["first_name", "last_name"],
          },
        ],
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
        author: `${book.autor.first_name} ${book.autor.last_name}`,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Server Error" });
    }
  }

  async findBooksByAuthorOrName(req, res) {
    try {
      const { bookOrAuthor } = req.body;

      if(bookOrAuthor === " " || !bookOrAuthor){
        return res.status(200).json({ booksOrAuthor: [] });
      }
 
      const booksByName = await Books.findAll({
        where: {
          name: {
            [Op.iLike]: `%${bookOrAuthor}%`,
          },
        },
      });

      const author = await AUTORS.findAll({
        where: {
          last_name: {
            [Op.iLike]: `%${bookOrAuthor}%`,
          },
        },
      });

      let booksByAuthor = [];

      if (author && author.length > 0) {
        const authorIds = author.map((a) => a.id);
        booksByAuthor = await Books.findAll({
          where: { autorId: authorIds },
        });
      }

      if (booksByName.length > 0) {
        res.json({ books: booksByName });
      } else if (booksByAuthor.length > 0) {
        res.json({ books: booksByAuthor });
      } else {
        res.status(200).json({ books: booksByAuthor });
      }
    } catch (error) {
      console.error("Ошибка при поиске книг:", error);
      res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
  }

  async deleteBookById(req, res) {
    const { id } = req.params; 

    try {
      if(!id){
        res.status(404).json({ error: "id undefined" });
      }
      const book = await Books.findOne({ where: { id } }); 

      if (!book) {
        return res.status(404).json("book not found");
      }

      await book.destroy(); 

      res.status(204).send("Успешно удалено"); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Произошла ошибка при удалении book" });
    }
  }

  async update(req, res) {
  try {
    const { id } = req.params; // Получаем ID книги для обновления
    const { name, autorId, description, price, genreId } = req.body;

    const book = await Books.findByPk(id); // Находим книгу по ID

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (req.files && req.files.img) {
      const { img } = req.files;
      let fileName = uuid.v4() + ".jpg";
      img.mv(path.resolve(__dirname, "..", "static", fileName));
      book.img = fileName; // Обновляем изображение книги
    }

    // Обновляем остальные данные книги
    book.name = name;
    book.autorId = autorId;
    book.description = description;
    book.price = price;
    book.genreId = genreId;

    await book.save(); // Сохраняем обновленные данные книги в базе данных

    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}
}

module.exports = new BooksController();
