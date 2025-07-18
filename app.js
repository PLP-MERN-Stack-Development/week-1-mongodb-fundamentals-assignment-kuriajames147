require('dotenv').config();
const express = require('express');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
app.use(express.json());

app.use('/books', bookRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});