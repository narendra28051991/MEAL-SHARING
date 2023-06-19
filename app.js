const express = require('express');

const mealQueryController = require('./controllers/mealQueryController');
const mealRoutes = require('./routes/mealRoutes');

// express app
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.listen(5000);

// register view engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('public'));

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

// routes
app.get('/', (req, res) => {
    res.redirect('/all-meals');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/future-meals', mealQueryController.future_meals);
app.get('/past-meals', mealQueryController.past_meals);
app.get('/first-meal', mealQueryController.first_meal);
app.get('/last-meal', mealQueryController.last_meal);

// all-meals routes
app.use('/all-meals', mealRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});