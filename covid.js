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


app.use('/', (req, res) => res.render('index'));




app.listen(3001);