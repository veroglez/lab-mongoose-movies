const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')


module.exports = (app) => {
  app.set('../views', path.join(__dirname, '../views'))
  app.set('view engine', 'ejs')

  app.use(logger('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, '../public')))
  app.use(expressLayouts)
}
