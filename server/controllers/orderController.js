const { Books, Order, OrderBooks, User } = require("../models/models");

class OrderController {
  async getAllOrders(req, res) {
    try {
      const orders = await Order.findAll();
      return res.json(orders);
    } catch {
      return res.json("ops");
    }
  }

  async createOrder(req, res) {
    try {
      const { userId, commonPrice } = req.body;
      const order = await Order.create({ commonPrice, userId, statusId: 1 });
      res.status(201).json(order.id);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteOrder(req, res) {
    const { id } = req.body;

    try {
      const order = await Order.findOne({ where: { id } });
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      await order.destroy();

      res.status(204).send("Successful delete");
    } catch (error) {
      res.status(500).json({ error: "error" });
    }
  }

  //orderBooks
  async getAllOrderBooks(req, res) {
    try {
      const orders = await OrderBooks.findAll();
      return res.json(orders);
    } catch {
      return res.json("ops");
    }
  }

  async createOrderBook(req, res) {
    try {
      const { orderId, bookId, count } = req.body;
      const order = await Order.findByPk(orderId);
      if (!order) {
        res.status(404).json({ message: "Order not found" });
        return;
      }
      const book = await Books.findByPk(bookId);
      if (!book) {
        res.status(404).json({ message: "Book not found" });
        return;
      }
      const createdOrderBook = await OrderBooks.create({
        orderId,
        bookId,
        count,
      });
      res.status(201).json({
        message: "Order book created successfully",
        orderBook: createdOrderBook,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getOrderBookByUserId(req, res) {
    try {
      const userId = req.params.id;
      const orders = await Order.findAll({
        where: { userId: userId, statusId: [1, 2, 3, 4, 5] },
        include: [
          {
            model: OrderBooks,
            include: [Books],
          },
        ],
      });
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }

  async getHistoryOrders(req, res) {
    try {
      const userId = req.params.id;
      const orders = await Order.findAll({
        where: { userId: userId, statusId: [6] },
        include: [
          {
            model: OrderBooks,
            include: [Books],
          },
        ],
      });
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }

  async deleteOrderBooksByOrderId(req, res) {
    const { id } = req.body;

    try {
      const order = await OrderBooks.findOne({ where: { id } });
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      await order.destroy();

      res.status(204).send("Successful delete");
    } catch (error) {
      res.status(500).json({ error: "error" });
    }
  }

  async delOrderAndOrderBooks(req, res) {
    const { orderId } = req.body;

    try {
      await OrderBooks.findAll({
        where: {
          orderId: orderId,
        },
      });

      await Order.destroy({
        where: {
          id: orderId,
        },
      });

      res
        .status(200)
        .json({ message: "Order and OrderBooks deleted successfully" });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting Order and OrderBooks",
        error: error.message,
      });
    }
  }
}

module.exports = new OrderController();