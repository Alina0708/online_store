const { Comments } = require("../models/models");
const { User, Books } = require("../models/models");
class CommentController {
  async getAll(req, res) {
    try {
      const comments = await Comments.findAll();
      return res.json(comments);
    } catch {
      return res.json("ops");
    }
  }
  async getCommentsBook(req, res) {
    try {
        const { bookId } = req.params;
        const bookExists = await Books.findByPk(bookId);

        if (!bookExists) {
          return res.status(404).json({ error: 'Book not found' });
        }
        const comments = await Comments.findAll({
            where: { bookId: bookId },
            include: [{ model: User, attributes: ['email'] }],
          });
          res.status(200).json({ comments });
        } catch (error) {
          console.error('Error fetching comments: ' + error);
          res.status(500).json({ error: 'Error fetching comments' });
        }
  }

  async createComments(req, res) {
    try {
      const { comment, userId, bookId } = req.body;
      const user = await User.findByPk(userId);
      const book = await Books.findByPk(bookId);

      if (!user) {
        return res.status(404).json({ error: "user not found"});
      }

      if (!book) {
        return res.status(404).json({ error: "book not found" });
      }

      const newComment = await Comments.create({
        comment,
      });

      // Associate the comment with the user and the book
      await newComment.setUser(user);
      await newComment.setBook(book);

      res
        .status(201)
        .json({ message: "Comment added successfully", newComment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteComment(req, res) {
    const { id } = req.params;

    try {
      const comment = await Comments.findOne({ where: { id } });

      if (!comment) {
        return res.status(404).json({ error: "Comment not found" });
      }

      await comment.destroy();

      res.status(201).json("Successful delete");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "error" });
    }
  }

  async getAllCommentsBooks(req, res){
    try {
      const commentsByBook = await Books.findAll({
        include: {
          model: Comments,
          attributes: ['id', 'comment'],
        },
      });
  
      const commentsGroupedByBook = {};
  
      commentsByBook.forEach((book) => {
        commentsGroupedByBook[book.name, book.img] = book.comments.map((comment) => ({
          id: comment.id,
          comment: comment.comment,
        }));
      });
  
      return res.status(200).json(commentsGroupedByBook);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to fetch comments grouped by book' });
    }
  }
}

module.exports = new CommentController();
