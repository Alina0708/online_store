const {Rating} = require('../models/models')
const {User, Books} = require('../models/models')

class RateController{

    async getAll(req, res) {
        try{
        const rates = await Rating.findAll();
        return res.json(rates);
    }
    catch{
        return res.json("ops");
    }
    }

    async createRate(req, res){
        try {
            // Extract data from the request body
            const { rate, comment, userId, bookId } = req.body;
        
            // Check if the user and book exist
            const user = await User.findByPk(userId);
            const book = await Books.findByPk(bookId);
        
            if (!user || !book) {
              return res.status(404).json({ error: 'User or book not found' });
            }
        
            // Create a new rating
            const newRating = await Rating.create({
              rate,
              comment,
              userId,
              bookId,
            });
        
            // Update the book's average rating (assuming you want to update the average rating)
            const existingRatings = await Rating.findAll({
              where: { bookId },
            });
        
            const totalRatings = existingRatings.length;
            const sumOfRatings = existingRatings.reduce((sum, rating) => sum + rating.rate, 0);
            console.log(sumOfRatings);
            const averageRating = totalRatings > 0 ? sumOfRatings / totalRatings : 0;
        
            // Update the average rating in the Books table
            await Books.update({ rating: averageRating }, { where: { id: bookId } });
        
            // Send a success response
            res.status(201).json({ message: 'Rating added successfully', newRating });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
          }
      };
}

module.exports = new RateController()