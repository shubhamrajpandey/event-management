const express = require("express");
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

const connectDB = require("./config/db");
const authRouter = require('./routes/authRoute');
const eventRouter = require('./routes/eventRoute');
const { authMiddleware } = require("./middlewares/authMiddleware");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use('/auth', authRouter);
app.use('/events', authMiddleware, eventRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ success: false, message: err.message });
});

app.listen(PORT, () => { 
    console.log(`Server is running on http://localhost:${PORT}`);
});
