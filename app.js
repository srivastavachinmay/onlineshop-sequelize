const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database')
const User = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const Product = require('./models/product');

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user
            console.log("//////////////////")
            console.log(user)
            next()
        })
        .catch(err => {
            console.log(err)
        })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Associations

Product.belongsTo(User, {
    constrainsts: true,
    onDelete: 'CASCADE'
})

User.hasMany(Product)


sequelize
    .sync()
    // .sync({ force: true }) // only for production and development 
    .then(result => {
        return User.findByPk(1)
    })
    .then(user => {
        if (!user) {
            return User.create({ name: "max", email: "test@test.com" })
        }
        return user
    })
    .then(user => {
        // console.log(user)
        app.listen(3000)
    })
    .catch(err => console.log(err))
