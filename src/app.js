require('dotenv').config()
const mongoose = require('mongoose');
const express = require("express")
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path')


// routes
const authRoutes = require('./routes/auth.route.js')
const userRoutes = require('./routes/user.route.js')
const categoryRoutes = require('./routes/category.route.js')
const productRoutes = require('./routes/product.route.js')
const orderRoutes = require('./routes/order.route.js')
const paymentRoutes = require('./routes/payment.route.js')

const app = express()
const port = process.env.PORT || 2345

// Database Connection
mongoose.connect(
    process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => { console.log("CONNECTED_TO_MONGO_DB") })
    .catch(error => { console.log(`DATABASE_CONNECTION_ERROR\n${error}`) })

// middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())


// routing
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", categoryRoutes)
app.use("/api", productRoutes)
app.use("/api", orderRoutes)
app.use("/api", paymentRoutes)

// serve static assets if in prodution
if (process.env.NODE_ENVIRONMENT === 'production') {
    app.use(express.static('./client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

// start listening at http://localhost:2345 (in dev mode)
app.listen(port, () => console.log(`LISTENING_AT_PORT:${port}`))