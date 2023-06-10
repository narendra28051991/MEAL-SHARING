const mealDB = require('../models/meal');

const future_meals = async (req, res) => {
    try {
      const result = await mealDB("meal").where('when', '>=', '2023-01-01');
      res.render('index', { meals: result, title: 'Future meals' });
    }
    catch (err) {
        console.log(err);
    }
}

const past_meals = async (req, res) => {
    try {
      const result = await mealDB("meal").where('when', '<', '2023-01-01');
      res.render('index', { meals: result, title: 'Past meals' });
    }
    catch (err) {
        console.log(err);
    }
}

const first_meal = async (req, res) => {
    try {
      const result = await mealDB("meal").orderBy('id', 'asc').limit(1);
      res.render('index', { meals: result, title: 'First meal' });
    }
    catch (err) {
        console.log(err);
    }
}

const last_meal = async (req, res) => {
    try {
      const result = await mealDB("meal").orderBy('id', 'desc').limit(1);
      res.render('index', { meals: result, title: 'Last meal' });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    future_meals, 
    past_meals, 
    first_meal, 
    last_meal
}