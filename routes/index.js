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
        article.create(article)
          .then((data) => console.log(data))
          .catch((err) => res.json(err))
      })
      res.redirect('/articles')
    })
  })



  router.get('/articles', (req,res) =>  {
    article.find({}).sort({_id: 1}).limit(20)
      .populate('comments')
      .then(data => {
        var hbsObject = {articles: data}
        res.render('home', hbsObject)
      })
      .catch(err => res.json(err))
  })


  router.post("/articles/:id", function(req, res) {
    comments.create(req.body)
      .then(comment => Article.findOneAndUpdate({ _id: req.params.id }, { $push: { comments: comment }}, { new: true }))
      .then(() => res.redirect('/articles'))
      .catch(err => res.json(err))
  });