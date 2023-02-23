const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const authRouter = require('./routes/api/authRouter');
const usersRouter = require('./routes/api/usersRouter');
const contactsRouter = require('./routes/api/contactsRouter');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// routers
app.use('/api/users', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
  });

// error handler
app.use((err, req, res, next) => {
  const { status = 500, message = 'Internal Server Error' } = err;
  res.status(status).json({ message });
});

module.exports = app;