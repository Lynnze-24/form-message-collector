const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const userRouter = require('./routes/user.router');
const messageRouter = require('./routes/message.router');

require('dotenv').config();

connectDB();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: ['http://localhost:5173'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

app.use('/api/users', userRouter);
app.use('/api/messages', messageRouter);

app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, '../', 'frontend', 'dist', 'index.html'))
);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
