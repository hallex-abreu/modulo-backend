//Configuração de envio de email
require('dotenv/config');

const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
  });

  transport.use('compile', hbs({
    viewEgine: 'handlebars',
    viewPath : path.resolve('./src/resources/mail/'),
    extName : '.html',
  }));

  module.exports = transport;