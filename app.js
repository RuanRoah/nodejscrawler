var http = require('http');
var fs = require('fs');
//导入模块
var path = require('path');
var cheerio = require('cheerio');
//设置参数

var opt = {
    hostname: 'localhost',
    path: '/douban.html',
    port: 3000
};

//关于get请求
http.get(opt, function(res) {
    var html = '';
    var movies = [];


    res.setEncoding();
    res.on('data', function(trunk) {
        html += trunk;
    });
    res.on('end', function() {
        var $ = cheerio.load("html");
        $('.item').each(function() {
            var picurl = $('pic img', this).attr('src');
            var movie = {
                title: $('.title', this),
                star: $('.info .star em', this),
                link: $('a', this).attr('href'),
                picurl: /^http/.test(picurl) ? picurl : 'http://localhost:3000+picurl'

            };
            movies.push(movie);
        });
        console.log(movies);
    });
}).on('error', function() {
    console.log(err);
});