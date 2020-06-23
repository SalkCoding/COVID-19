console.log("Loading Express");
const express = require('express');
const app = express();

console.log("Loading handlebars");
const handlebars = require('express-handlebars');



app.engine('.hbs', handlebars({
    defaultLayout: 'layout.hbs',
    extname: '.hbs',
}));
app.set('view engine', '.hbs');


app.use(express.static('public', {
    maxAge: '14400000'
}));


app.use('/confirmation', (req, res) => res.render('confirmation'));
app.use('/confirmation-global', (req, res) => res.render('confirmation-global'));
app.use('/masks', (req, res) => res.render('masks'));
app.use('/tips', (req, res) => res.render('tips'));
app.use('/tips-for-all', (req, res) => res.render('tips-for-all'));
app.use('/tips-for-symptoms', (req, res) => res.render('tips-for-symptoms'));

// 위에 정한 링크가 아니면 무조건 index
app.use('/', (req, res) => res.render('index'));




app.listen(3001);