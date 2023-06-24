const express = require('express');
const mealController = require('../controllers/mealController');

const router = express.Router();

router.get('/create', mealController.meal_create_get);
router.get('/', mealController.meal_index);
router.post('/', mealController.meal_create_post);
router.get('/:id', mealController.meal_details);
router.delete('/:id', mealController.meal_delete);
router.get('/:id/edit', mealController.meal_edit_get);
router.put('/:id/edit', mealController.meal_edit_put);

module.exports = router;