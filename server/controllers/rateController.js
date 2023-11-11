const { Rating } = require("../models/models");
const { User, Books } = require("../models/models");
const { Op } = require('sequelize');

class RateController {
  async getAll(req, res) {
    try {
      const rates = await Rating.findAll();
      return res.json(rates);
    } catch {
      return res.json("ops");
    }
  }

  async createRate(req, res) {
    try {
      const { rate, userId, bookId } = req.body;

      const user = await User.findByPk(userId);
      const book = await Books.findByPk(bookId);

      if (!user || !book) {
        return res.status(404).json({ error: "User or book not found" });
      }

      const newRating = await Rating.create({
        rate,
        userId,
        bookId,
      });

      const existingRatings = await Rating.findAll({
        where: { bookId, rate: { [Op.not]: 0 } },
      });

      const totalRatings = existingRatings.length;
      const sumOfRatings = existingRatings.reduce(
        (sum, rating) => sum + rating.rate,
        0
      );
      console.log(sumOfRatings);
      const averageRating = totalRatings > 0 ? Math.ceil(sumOfRatings / totalRatings) : 0;

      await Books.update({ rating: averageRating }, { where: { id: bookId } });

      res.status(201).json({ message: "Rating added successfully", newRating });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  

  async deleteRateId(req, res) {
    const { id } = req.params;

    try {
      const rate = await Rating.findOne({ where: { id } });

      if (!rate) {
        return res.status(404).json({ error: "Rate not found" });
      }

      await rate.destroy();

      res.status(201).json("Successful delete");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "error" });
    }
  }
}

module.exports = new RateController();
