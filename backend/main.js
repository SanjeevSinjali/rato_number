const path = require('path')
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/error');
const cron = require('node-cron');

dotenv.config({ path: `./config/config.env` });

const { sequelize } = require('./models');
const { OrderCar, Car } = require('./models');
const { Op } = require('sequelize');

// Route files
const car = require('./routes/car');
const users = require('./routes/users');
const auth = require('./routes/auth');
const rent = require("./routes/ordercar")
const stats = require("./routes/adminDash")
const rentCar = require("./routes/rent")
const myrents = require("./routes/myrents")


const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


// Rate limiting
const limiter = rateLimit({
  windowsMs: 10 * 60 * 1000, // 10 mins
  max: 1000,
});

app.use(limiter);

app.use(express.static(path.join(__dirname, 'public')));


// Mount routers
app.use("/api/v1/cars", car)
app.use('/api/v1/users', users);
app.use('/api/v1/auth', auth);
app.use('/api/v1/rent', rent);
app.use('/api/v1/stats', stats);
app.use('/api/v1/rentCar', rentCar);
app.use('/api/v1/myrents', myrents);


app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// check every 1min for expired rented Cars and then set it to AVAILABLE 
cron.schedule('* * * * *', async () => {
  const now = new Date();

  const expiredOrders = await OrderCar.findAll({
    where: {
      rentEndDate: { [Op.lt]: now },
      status: 'RENTED'
    }
  });

  for (const order of expiredOrders) {
    const car = await Car.findByPk(order.carId);

    if (car) {
      car.status = 'AVAILABLE';
      await car.save();
    }

    order.status = 'AVAILABLE';
    await order.save();
  }
});


const start_server = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!!!');

    // Sync models (use { force: true } for dev to drop tables)
    await sequelize.sync({ force: false });

    app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      );
    })

  } catch (err) {
    console.log(err)
    process.exit(1)
  }
};

start_server()

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);

  // Close server & exit process
  server.close(() => process.exit(1));
});


