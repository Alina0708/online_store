const {
  Basket,
  BasketBooks,
  Books,
} = require("../models/models");

class BasketController {
  async createBasket(req, res) {
    try {
      const { userId } = req.body;

      const existingBasket = await Basket.findOne({ where: { userId } });
      if (existingBasket) {
        return res
          .status(400)
          .json({ message: "Basket already exists for this user" });
      }

      const newBasket = await Basket.create({ userId });
      return res.status(201).json(newBasket);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to create basket" });
    }
  }

  async getBasketIdByUserId(req, res) {
    try {
      const { userId } = req.params;

      const basket = await Basket.findOne({ where: { userId } });
      if (!basket) {
        return res
          .status(404)
          .json({ message: "Basket not found for this user" });
      }
      return res.status(200).json({ basket });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to get basket id" });
    }
  }

  async getAllBasket(req, res) {
    const basket = await Basket.findAll();
    return res.json(basket);
  }

  //BasketBook
  async getAllBasketBook(req, res) {
    const basket = await BasketBooks.findAll();
    return res.json(basket);
  }

  async createBasketBook(req, res) {
    try {
      const { basketId, bookId } = req.body;
      const newBasketBook = await BasketBooks.create({
        basketId,
        bookId,
        count: 1,
      });

      return res.status(201).json({
        message: "Basket book created successfully",
        basketBook: newBasketBook,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to create basket book" });
    }
  }

  async getBasketBooksByUserId(req, res) {
    try {
      const { userId } = req.params;

      const basket = await Basket.findOne({ where: { userId } });
      if (!basket) {
        return res
          .status(404)
          .json({ message: "Basket not found for this user" });
      }

      const basketBooks = await BasketBooks.findAll({
        where: { basketId: basket.id },
        include: [Books],
      });

      return res.status(200).json({ basketBooks });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to get basket books" });
    }
  }

  async increaseCount(req, res) {
    try {
      const { bookId } = req.params;
      const basketBook = await BasketBooks.findOne({ where: { bookId } });

      if (basketBook) {
        basketBook.count += 1;
        await basketBook.save();

        res.status(200).json({ counts: basketBook.count });
      } else {
        res.status(404).json({ error: "Basket book not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async decreaseCount(req, res) {
    try {
      const { bookId } = req.params;
      const basketBook = await BasketBooks.findOne({ where: { bookId } });

      if (basketBook) {
        if (basketBook.count > 0) {
          basketBook.count -= 1;
          await basketBook.save();
          res.status(200).json({ counts: basketBook.count });
        } else {
          res.status(400).json({ error: "Count cannot be negative" });
        }
      } else {
        res.status(404).json({ error: "Basket book not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteBasketBooksByUserByBook(req, res) {
    try {
      const { basketId, bookId } = req.query;
      const basketBook = await BasketBooks.findOne({
        where: { basketId, bookId },
      });
      if (basketBook) {
        await basketBook.destroy();
        res.status(200).json({ message: "Basket book deleted successfully" });
      } else {
        res.status(404).json({ error: "Basket book not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteAllBasketBooks(req, res) {
    try {
      const { id } = req.params;
      const deletedCount = await BasketBooks.destroy({
        where: { id },
      });
  
      if (deletedCount > 0) {
        res.status(200).json({ message: "All basket books deleted successfully" });
      } else {
        res.status(404).json({ error: "No basket books found for the specified basketId" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
module.exports = new BasketController();
