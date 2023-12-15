const { Books, Order, OrderBooks, User, Status } = require("../models/models");
const { Op, fn, col, literal } = require('sequelize');

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

  async getOrdersGroupedByUserStatus(req, res){
    const desiredStatuses = [2, 3, 4, 5]; 

  try {
    const orders = await Order.findAll({
      where: {
      statusId: {
        [Op.in]: desiredStatuses, 
      },},
      include: [
        {
          model: OrderBooks,
          include: [{ model: Books }],
        },
        {
          model: User,
          attributes: ['id', 'email'],
        },
        {
          model: Status, 
          attributes: ['id', 'name'], 
        }
      ],
      order: [['createdAt', 'DESC']],
    });

    const ordersGroupedByUser = {};

    orders.forEach((order) => {
      const userId = order.user.id;

      if (!ordersGroupedByUser[userId]) {
        ordersGroupedByUser[userId] = {
          user: {
            id: order.user.id,
            email: order.user.email,
          },
          orders: [],
        };
      }

      const formattedOrder = {
        orderId: order.id,
        commonPrice: order.commonPrice,
        updatedAt: order.updatedAt,
        createdAt: order.createdAt,
        status: order.status.name,
        books: [],
      };

      order.orderBooks.forEach((orderBook) => {
        formattedOrder.books.push({
          bookId: orderBook.book.id,
          image: orderBook.book.img,
          count:orderBook.count
        });
      });

      ordersGroupedByUser[userId].orders.push(formattedOrder);
    });

    return res.status(200).json(Object.values(ordersGroupedByUser));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch orders grouped by users' });
  }

  };


  async getOrdersGroupedByUserStatusCompleted(req, res){
    const desiredStatuses = [6]; 

  try {
    const orders = await Order.findAll({
      where: {
      statusId: {
        [Op.in]: desiredStatuses, 
      },},
      include: [
        {
          model: OrderBooks,
          include: [{ model: Books }],
        },
        {
          model: User,
          attributes: ['id', 'email'],
        },
        {
          model: Status, 
          attributes: ['id', 'name'], 
        }
      ],
      order: [['createdAt', 'DESC']],
    });

    const ordersGroupedByUser = {};

    orders.forEach((order) => {
      const userId = order.user.id;

      if (!ordersGroupedByUser[userId]) {
        ordersGroupedByUser[userId] = {
          user: {
            id: order.user.id,
            email: order.user.email,
          },
          orders: [],
        };
      }

      const formattedOrder = {
        orderId: order.id,
        commonPrice: order.commonPrice,
        updatedAt: order.updatedAt,
        createdAt: order.createdAt,
        status: order.status.name,
        books: [],
      };

      order.orderBooks.forEach((orderBook) => {
        formattedOrder.books.push({
          bookId: orderBook.book.id,
          image: orderBook.book.img,
          count:orderBook.count
        });
      });

      ordersGroupedByUser[userId].orders.push(formattedOrder);
    });

    return res.status(200).json(Object.values(ordersGroupedByUser));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch orders grouped by users' });
  }

  };

  async getPopularBookInOrders(req, res){
    try {
      const popularBooks = await OrderBooks.findAll({
        attributes: ['bookId', [fn('COUNT', 'bookId'), 'count']],
        group: ['bookId'],
        order: [[literal('count'), 'DESC']],
        limit: 7,
      });
  
      const bookIds = popularBooks.map((book) => book.bookId);
  
      const topBooks = await Books.findAll({
        where: {
          id: {
            [Op.in]: bookIds,
          },
        },
      });
  
      res.json(topBooks);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getnewBook(req, res){
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
      const newBooks = await Books.findAll({
        where: {
          createdAt: {
            [Op.between]: [sevenDaysAgo, new Date()] // Fetch books created in the last 7 days
          }
        }
      });
  
      // Отправить новые книги в качестве ответа
      res.json(newBooks);
    } catch (error) {
      // Обработка ошибок
      console.error('Ошибка:', error);
      res.status(500).send('Внутренняя ошибка сервера');
    }
  }
}

module.exports = new OrderController();
