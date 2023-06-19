const mealDB = require('../models/meal');

const meal_index = async (req, res) => {
    try {
        const result = await mealDB("meal").orderBy('id', 'asc');
        res.render('index', { meals: result, title: 'All meals' });
    }
    catch (err) {
        console.log(err);
    }
}

const meal_details = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await mealDB("meal").where("id", id);
        
        if (result.length > 0) {
            res.render('details', { meal: result[0], title: 'Meal Details' });       
        } else {
            res.status(404).render('404', { title: 'meal not found' });        
        }
    }
    catch (err) {
        console.log(err);
        res.render('404', { title: 'meal not found' });        
    }
}

const meal_create_get = (req, res) => {
    res.render('create', { title: 'Create a new meal' });
}

const meal_create_post = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;

        await mealDB("meal").insert(
          { title: body.title, description: body.description, location: body.location, when: body.when, max_reservations: body.max_reservations, price: body.price }
        );

        await mealDB("reservation").insert(
          { number_of_guests: body.number_of_guests, meal_id: id, contact_number: body.contact_number, contact_name: body.contact_name, contact_email: body.contact_email }
        );

        await mealDB("review").insert(
          { title: body.title, description: body.description, meal_id: id, stars: body.stars }
        );

        res.redirect('/all-meals');
    }
    catch (err) {
        console.log(err);
    }
}

const meal_delete = async (req, res) => {
    try {
        const id = req.params.id;
        await mealDB("review").where("meal_id", id).del();
        await mealDB("reservation").where("meal_id", id).del();
        await mealDB("meal").where("id", id).del();

        res.json({ redirect: '/all-meals' });
    }
    catch (err) {
        console.log(err);
    }
}

const meal_edit_get = async (req, res) => {
    const id = req.params.id;
    const meal = await mealDB("meal").where("id", id);
    const reservation = await mealDB("reservation").where("meal_id", id);
    const review = await mealDB("review").where("meal_id", id);
    
    res.render('edit', { meal: meal[0], reservation: reservation[0], review: review[0], title: 'Edit the meal' });
}

const meal_edit_put = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        await mealDB("meal").where("id", id).update("title", body.title);
        await mealDB("reservation").where("meal_id", id).update("number_of_guests", body.number_of_guests);
        await mealDB("review").where("meal_id", id).update("stars", body.stars);

        res.json({ redirect: '/all-meals' });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = {
    meal_index, 
    meal_details, 
    meal_create_get,
    meal_create_post, 
    meal_delete,
    meal_edit_get,
    meal_edit_put
}