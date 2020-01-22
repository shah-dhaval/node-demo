var express = require('express');
var hbs = require('hbs');
var app     = express();
var fs = require('fs');
var port = process.env.PORT || 3000


hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

hbs.registerHelper('curentYear', () => {
    return (new Date()).getFullYear()
});

app.use((req, res, next) => {
    var log = `${(new Date()).toString()} ${req.method} ${req.url} \n`;
    console.log(log);
    fs.appendFile('server.log', log, (err) => {
        if(err)
        {
            console.log(err)
        }
    })
    next();
});

app.use((req, res, next) => {
    res.render('maintainance.hbs');
});
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, resp)
{
    resp.render('home.hbs',
    {
        title: 'Welcome to hbs'
    })
});

app.get('/about', function(req, resp)
{
    resp.render('about.hbs',
    {
        title: 'Welcome to hbs'
    })
});

app.listen(port);