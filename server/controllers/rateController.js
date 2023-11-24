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
      const existingRating = await Rating.findOne({
        where: {
          userId,
          bookId,
        },
      });
  
      if (existingRating) {
        return res.status(400).json({ error: "User already rated this book" });
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


  async getRatingByUserIdAndBookId(req, res) {
    const { userId, bookId } = req.query;
  
    try {
      if(!userId){
        return res.status(400).json({ error: "userId not found" });
      }
      if(!bookId){
        return res.status(400).json({ error: "bookId not found" });
      }
      const existingRating = await Rating.findOne({
        where: {
          userId,
          bookId,
        },
      });
  
      const rate = existingRating ? existingRating.rate : 0;
  
      res.status(200).json({ rate });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error...", userId:userId, bookId:bookId });
    }
  }
}

module.exports = new RateController();
