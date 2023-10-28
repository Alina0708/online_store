const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Basket= sequelize.define('basket', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const BasketBooks= sequelize.define('basketBooks', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    count: {type: DataTypes.INTEGER, defaultValue:0},
})

const Books = sequelize.define('books', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique:true, allowNull: false},
    price: {type:DataTypes.INTEGER, allowNull:false},
    rating: {type: DataTypes.INTEGER, defaultsValue:0},
    img:{type:DataTypes.STRING, allowNull:false},
    description: {type: DataTypes.STRING, allowNull:true},
  });

const Genre= sequelize.define('genre', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull:false},
    description:{type: DataTypes.STRING},
})

const AUTORS= sequelize.define('autors', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    first_name: {type: DataTypes.STRING},
    last_name:{type: DataTypes.STRING},
})

const Rating= sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    rate: {type: DataTypes.INTEGER, allowNull:false},
    comment:{type: DataTypes.STRING},
})

const Status= sequelize.define('status', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull:false},
})

const Order= sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    commonPrice: {type: DataTypes.INTEGER, defaultValue: 0},
})

const OrderBooks= sequelize.define('orderBooks', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    count: {type: DataTypes.INTEGER},
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketBooks)
BasketBooks.belongsTo(Basket)

Genre.hasMany(Books)
Books.belongsTo(Genre)

AUTORS.hasMany(Books)
Books.belongsTo(AUTORS)

Books.hasMany(Rating)
Rating.belongsTo(Books)

Books.hasMany(BasketBooks)
BasketBooks.belongsTo(Books)

User.hasMany(Order); 
Order.belongsTo(User); 

Order.hasMany(OrderBooks); 
OrderBooks.belongsTo(Order);

Status.hasMany(Order); 
Order.belongsTo(Status);

Books.hasMany(OrderBooks); 
OrderBooks.belongsTo(Books);

module.exports = {
    User, Basket, BasketBooks, Books, Genre, AUTORS, Rating, Order, OrderBooks, Status
}


