const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRouter = require('./server/api');
const app = express();

const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', apiRouter);

if (!module.parent) { 
  app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
  });
}

module.exports = app;