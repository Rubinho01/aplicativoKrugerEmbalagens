var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
require('dotenv').config();
const sequelize = require('./config/database');
const Usuario = require('./models/Usuario');
const Admin = require('./models/admin');
const produto = require('./models/produto');
const pedido = require('./models/pedido');
const itemPedido = require('./models/itemPedido');
const index = require('./models/index');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Banco conectado!');
    await sequelize.sync();
  } catch (err) {
    console.error('Erro ao conectar:', err);
  }
})();

sequelize.sync({ alter: true})
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso!');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar tabelas:', err);
  });

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/adminRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // se estiver rodando localmente com HTTP
}));

app.use('/', indexRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
