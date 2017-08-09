var express = require('express');
var router = express.Router();
var request = require('request');
var fetch = require('../modules/fetch');
var apiBasc = express().get('env') == 'development' ? 'http://www.test.xinpianchang.com' : 'http://www.xinpianchang.com';
var host = express().get('env') == 'production' ? 'http://film.xinpianchang.com' : 'http://pictures.test.vmovier.cc';
var shareconfig = {
      "qzoneText": "新片场影业",
      "qzoneDesc": "新片场影业是新片场集团旗下以制作、投资、发行、营销、艺人经纪业务为主的影视娱乐公司，主要出品和发行网络电影、网络剧、院线电影等内容。",
      "sinaText": "新片场影业是新片场集团旗下以制作、投资、发行、营销、艺人经纪业务为主的影视娱乐公司，主要出品和发行网络电影、网络剧、院线电影等内容。",
      "bdText": "新片场影业是新片场集团旗下以制作、投资、发行、营销、艺人经纪业务为主的影视娱乐公司，主要出品和发行网络电影、网络剧、院线电影等内容。",
      "bdPic": "http://cs.vmoiver.com/Uploads/Activity/2017-03-14/58c75d80111bb.jpg"
}
router.get('/', function(req, res) {
  var currentUrl = host + req.originalUrl;
  fetch(apiBasc + '/service/issue/ts-list/cate-1/pageSize-3/from-pictures' , function(data){
    if(isMobile(req)){
        res.render('www/mobile/index',  { layout: 'mobile' ,title: '新片场影业' ,data: data, page: '/'});
    }
    else{
        shareconfig.url = currentUrl;
        res.render('www/web/index',  { layout: 'web' ,title: '新片场影业' ,data: data, shareconfig: shareconfig,page: '/'});
    }
  })
});

router.get('/article', function(req, res) {
  var currentUrl = host + req.originalUrl;
  fetch(apiBasc + '/service/issue/ts-list/cate-1/page-1/pageSize-50/from-pictures' , function(data){
    if(isMobile(req)){
        res.render('www/mobile/article',  { layout: 'mobile' ,title: '新片场影业' ,data: data,page: 'article'});
    }else{
        shareconfig.url = currentUrl;
        res.render('www/web/article',  { layout: 'web' ,title: '新片场影业' ,data: data, shareconfig: shareconfig,page: 'article'});
    }
  })
});

router.get('/contact', function(req, res) {
  var currentUrl = host + req.originalUrl;
  if(isMobile(req)){
      res.render('www/mobile/contact',  { layout: 'mobile' ,title: '新片场影业' ,page: 'contact'});
  }else{
      shareconfig.url = currentUrl;
      res.render('www/web/contact',  { layout: 'web' ,title: '新片场影业', shareconfig: shareconfig ,page: 'contact'});
  }
});

router.get('/creator', function(req, res) {
  var currentUrl = host + req.originalUrl;
  request(apiBasc + '/service/issue/ts-getUserInfo',function(error, response, body){
    body = JSON.parse(body);
    if(isMobile(req)){
       body = body.slice(0, body.length - 2);
      res.render('www/mobile/creator',  { layout: 'mobile' ,title: '新片场影业' ,data: body,page: 'creator'});
    }else{
        shareconfig.url = currentUrl;
        res.render('www/web/creator',  { layout: 'web' ,title: '新片场影业' ,data: body,shareconfig: shareconfig,page: 'creator'});
    }
  })
  
  
});

router.get('/investment', function(req, res) {
  var currentUrl = host + req.originalUrl;
  if(isMobile(req)){
      res.render('www/mobile/investment',  { layout: 'mobile' ,title: '新片场影业',page: 'investment'});
  }
  else{
      shareconfig.url = currentUrl;
      res.render('www/web/investment',  { layout: 'web' ,title: '新片场影业',shareconfig: shareconfig,page: 'investment'});
  }
  
});


router.get('/getPicture', function (req, res) {
  fetch(apiBasc + '/service/issue/ts-list/cate-1/page-' + req.query.page + '/pageSize-5/from-pictures' , function(data){
    if(data){
      if(isMobile(req)){
          res.render('partials/picture_m',  {layout: 'template',data: data});
      }
      else{
          res.render('partials/picture',  {layout: 'template',data: data});
      }
    }
    
  })
});

function isMobile(req){
  return req.headers['user-agent'].match(/(iPhone|iPod|Android)/i);
}



module.exports = router;
