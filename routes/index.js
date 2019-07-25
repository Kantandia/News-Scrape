var express = require('express');
var router = express.Router();

const request = require('request')
const cheerio = require("cheerio");

const comments = require('../models/comments.js')
const article = require('../models/article.js')

router.get('/', (req,res) =>  {
  res.render('scrape')
})


router.get('/scraper', (req,res) =>  {
    request('https://cleaningtheglass.com/articles/', (error, response, html) =>  { 
    const $ = cheerio.load(html);


    $('a.card.article').each((i,elem) =>  {
        var article = {}
        var x = $(elem)
        article.title = x.children('h2').contents().filter(function()  {
          return this.nodeType == 3
        })[0].nodeValue;
        article.summary = x.find('.article_description').text().trim();
        article.link = x.attr('href').trim()
        article.image = x.find('img').attr('src').trim()
  
        console.log(article);
        Article.create(article)
          .then((data) => console.log(data))
          .catch((err) => res.json(err))
      })
      res.redirect('/articles')
    })
  })