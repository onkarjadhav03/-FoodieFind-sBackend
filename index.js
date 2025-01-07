const express = require('express');
const { resolve } = require('path');
let cors = require('cors');
let sqlite3 = require('sqlite3');
let { open } = require('sqlite');

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

let db;
(async () => {
  db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
})();
//function 1 to Get All Restaurants
async function getAllRestaurants() {
  let query = 'SELECT * FROM  restaurants';
  let response = await db.all(query, []);

  return { restaurants: response };
}
//Exercise 1: Get All Restaurants
app.get('/restaurants', async (req, res) => {
  try {
    let result = await getAllRestaurants();
    if (result.restaurants.length == 0) {
      res.status(404).json({ message: 'No restsurants found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//function 2 to Get Restaurant by ID
async function getRestaurantByID(id) {
  let query = 'SELECT * FROM  restaurants WHERE id=?';
  let response = await db.all(query, [id]);

  return { restaurants: response };
}
//Exercise 2: Get Restaurant by ID
app.get('/restaurants/details/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let result = await getRestaurantByID(id);
    if (result.restaurants.length == 0) {
      res.status(404).json({ message: 'No restsurants found with id' + id });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//function 3 to Get Restaurants by Cuisine
async function getRestaurantByCuisine(cuisine) {
  let query = 'SELECT * FROM  restaurants WHERE cuisine=?';
  let response = await db.all(query, [cuisine]);

  return { restaurants: response };
}
//Exercise 3: Get Restaurants by Cuisine
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  let cuisine = req.params.cuisine;
  try {
    let result = await getRestaurantByCuisine(cuisine);
    if (result.restaurants.length == 0) {
      res
        .status(404)
        .json({ message: 'No restsurants found with cuisine' + cuisine });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//function 4 to Get Restaurants by Filter
async function getRestaurantByFilter(isVeg, hasOutdoorSeating, isLuxury) {
  let query =
    'SELECT * FROM  restaurants WHERE isVeg=? AND hasOutdoorSeating = ? AND isLuxury=?';
  let response = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);

  return { restaurants: response };
}
//Exercise 4: Get Restaurants by Filter
app.get('/restaurants/filter/', async (req, res) => {
  let isVeg = req.query.isVeg;
  let hasOutdoorSeating = req.query.hasOutdoorSeating;
  let isLuxury = req.query.isLuxury;
  try {
    let result = await getRestaurantByFilter(
      isVeg,
      hasOutdoorSeating,
      isLuxury
    );
    if (result.restaurants.length == 0) {
      res.status(404).json({
        message:
          'No restsurants found with isVeg and hasOutdoorSeating and isLuxury ',
      });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//function 5 to et Restaurants Sorted by Rating
async function sortByRating() {
  let query = 'SELECT * FROM  restaurants ORDER BY rating DESC';
  let response = await db.all(query, []);

  return { restaurants: response };
}
//Exercise 5: Get Restaurants Sorted by Rating
app.get('/restaurants/sort-by-rating', async (req, res) => {
  try {
    let result = await sortByRating();
    if (result.restaurants.length == 0) {
      res.status(404).json({ message: 'No restsurants found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//function 6 to Get All Dishes
async function getAllDishes() {
  let query = 'SELECT * FROM  dishes';
  let response = await db.all(query, []);

  return { dishes: response };
}
//Exercise 6: Get All Dishes
app.get('/dishes', async (req, res) => {
  try {
    let result = await getAllDishes();
    if (result.dishes.length == 0) {
      res.status(404).json({ message: 'No dishes found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//function 7 to Get  Dish by ID
async function getDishesByID(id) {
  let query = 'SELECT * FROM  dishes WHERE id=?';
  let response = await db.all(query, [id]);

  return { dishes: response };
}
//Exercise 7: Get Dish by ID
app.get('/dishes/details/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let result = await getDishesByID(id);
    if (result.dishes.length == 0) {
      res.status(404).json({ message: 'No dishes found with id' + id });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//function 8  Get Dishes by Filter
async function getDishesByFilter(isVeg) {
  let query = 'SELECT * FROM  dishes WHERE isVeg=?';
  let response = await db.all(query, [isVeg]);

  return { dishes: response };
}
//Exercise 8: Get Dishes by Filter
app.get('/dishes/filter', async (req, res) => {
  let isVeg = req.query.isVeg;
  try {
    let result = await getDishesByFilter(isVeg);
    if (result.dishes.length == 0) {
      res
        .status(404)
        .json({ message: 'No restsurants found with isVeg' + isVeg });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//function 9 to Get Dishes Sorted by Price
async function sortDishesByRating() {
  let query = 'SELECT * FROM  dishes ORDER BY price DESC';
  let response = await db.all(query, []);

  return { dishes: response };
}
//Exercise 9: Get Dishes Sorted by Price
app.get('/dishes/sort-by-rating', async (req, res) => {
  try {
    let result = await sortDishesByRating();
    if (result.dishes.length == 0) {
      res.status(404).json({ message: 'No dishes found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
