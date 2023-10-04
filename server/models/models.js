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
})

const Books= sequelize.define('books', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique:true, allowNull: false},
    price: {type:DataTypes.INTEGER, allowNull:false},
    rating: {type: DataTypes.INTEGER, defaultsValue:0},
    img:{type:DataTypes.STRING, allowNull:false},
})

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

module.exports = {
    User, Basket, BasketBooks, Books, Genre, AUTORS, Rating
}


