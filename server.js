import express from 'express';
const bodyParser= require('body-parser');
import router from './routes/index';

const app = express();
const port = process.env.DB_PORT || 5000;

app.use(router);
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
