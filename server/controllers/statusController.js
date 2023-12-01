const { Status, Order } = require("../models/models");
class StatusController {
  async getAllStatus(req, res) {
    try {
      const status = await Status.findAll();
      return res.json(status);
    } catch {
      return res.json("ops");
    }
  }

  async createStatus(req, res) {
    try {
      const { name } = req.body;

      const newStatus = await Status.create({
        name: name,
      });

      res
        .status(201)
        .json({ message: "Статус успешно добавлен", status: newStatus });
    } catch (error) {
      console.error("Ошибка при добавлении статуса:", error);
      res.status(500).json({ error: "Ошибка при добавлении статуса" });
    }
  }

  async deleteStatusName(req, res) {
    const { name } = req.params.name;

    try {
      const status = await Status.findOne({ where: { name } });

      if (!status) {
        return res.status(404).json({ error: "name not found" });
      }

      await rate.destroy();

      res.status(201).json("Successful delete");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "error" });
    }
  }

  async getStatusNameById(req, res) {
    try {
      const statusId = req.params.id;
      const status = await Status.findOne({
        where: { id: statusId },
      });
      if (status) {
        res.json(status.name);
      } else {
        res.status(404).json({ message: "Status not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  }

  async changeOrderStatusOnPaid(req, res) {
    const { orderId } = req.body;

    try {
      const order = await Order.findOne({
        where: {
          id: orderId,
        },
      });

      const status = await Status.findOne({
        where: {
          id: 2,
        },
      });

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      await Order.update(
        { statusId: 2 },
        {
          where: {
            id: orderId,
          },
        }
      );

      res.status(200).json({status: status.name });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating order status", error: error.message });
    }
  }


  async changeOrderStatus(req, res) {
    const { orderId, statusName } = req.body;

    try {
      // Находим заказ по orderId
      const order = await Order.findOne({
        where: {
          id: orderId,
        },
      });
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      // Находим статус по имени statusName
      const status = await Status.findOne({
        where: {
          name: statusName,
        },
      });
  
      if (!status) {
        return res.status(404).json({ message: 'Status not found' });
      }
  
      // Обновляем заказ на новый статус
      await order.setStatus(status);
  
      // После обновления получаем обновленный заказ с новым статусом
      const updatedOrder = await Order.findOne({
        where: {
          id: orderId,
        },
        include: [
          {
            model: Status,
            attributes: ['name'],
          },
        ],
      });
  
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Updated order not found' });
      }
  
      const updatedStatus = updatedOrder.status.name;
  
      res.status(200).json({ status: updatedStatus });
    } catch (error) {
      res.status(500).json({ message: 'Error updating order status', error: error.message });
    }
  }
}
module.exports = new StatusController();
