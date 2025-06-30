import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: './config/dev.env' });

import connectDB, { sequelize } from "./config/db.js"

// routes files
import users from "./routes/users.js"

connectDB();

// Sync models
sequelize.sync({ alter: true }).then(() => {
  console.log('All models synced');
});
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routers
app.use('/api/v1/users', users);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);

  // Close server & exit process
  server.close(() => process.exit(1));
});

