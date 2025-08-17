var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
require('dotenv').config();
const sequelize = require('./config/database');
const isProduction = process.env.NODE_ENV === 'production';



(async () => {
  try {
    await sequelize.authenticate();
    console.log('Banco conectado!');
    await sequelize.sync({ alter: true });
    console.log('Tabelas sincronizadas com sucesso!');
  } catch (err) {
    console.error('Erro ao conectar/sincronizar:', err);
  }
})();



var indexRouter = require('./routes/index');
var adminRouter = require('./routes/adminRoute');
var pedidoRouter = require('./routes/pedidoRoute');
var carrinhoRouter  = require('./routes/carrinhoRoute');

var app = express();
app.set('trust proxy', 1);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const pgSession = require('connect-pg-simple')(session);
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

app.use(session({
  store: new pgSession({
    pool: pool,
    tableName: 'session',
  }),
  secret: process.env.SESSION_SECRET || 'fallback-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: isProduction,
    httpOnly: true,
    sameSite: 'none'
  }
}));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/pedido', pedidoRouter);
app.use('/carrinho', carrinhoRouter);

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
