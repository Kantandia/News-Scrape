var express = require('express');
var router = express.Router();

const request = require('request')
const cheerio = require("cheerio");

const comments = require('../models/comments.js')
const article = require('../models/article.js')

router.get('/', (req,res) =>  {
  res.render('scrape')
})