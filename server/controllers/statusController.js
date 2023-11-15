const {Status } = require("../models/models");
class StatusController{
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
              name: name
            });
        
            res.status(201).json({ message: 'Статус успешно добавлен', status: newStatus });
          } catch (error) {
            console.error('Ошибка при добавлении статуса:', error);
            res.status(500).json({ error: 'Ошибка при добавлении статуса' });
          }
      }

      async deleteStatusName(req, res) {
        const {name} = req.params.name;
    
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
}
module.exports = new StatusController();
