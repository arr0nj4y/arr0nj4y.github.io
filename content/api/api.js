// Getting the meals from the API
const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

fetch(url)
  .then(response => response.json())
  .then(data => {
    const meals = data.meals;
    const sortedMeals = meals.sort((a, b) => {
      return countIngredients(a) - countIngredients(b);
    });

    const mealLeaderboard = document.querySelector("#meal-leaderboard tbody");
    
    sortedMeals.forEach((meal, index) => {
      const numIngredients = countIngredients(meal);
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${meal.strMeal}</td>
        <td>${numIngredients}</td>
        <td><button onclick="showMealDetails('${meal.idMeal}')">Details</button></td>
      `;
      mealLeaderboard.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Error fetching meals:', error);
  });

//Counting the number of ingredients in a meal
function countIngredients(meal) {
  let count = 0;
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient && ingredient.trim() !== '') {
      count++;
    }
  }
  return count;
}

//Showing meals information
function showMealDetails(mealId) {
  const mealDetailsContainer = document.getElementById('meal-details-container');
  const mealDetailsContent = document.getElementById('meal-details-content');

  //Getting each meal details by their unique ID
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const meal = data.meals[0];
      mealDetailsContent.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>Ingredients</h3>
        <ul>
          ${getIngredientsList(meal)}
        </ul>
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
      `;
      mealDetailsContainer.classList.add('show');
    })
    .catch(error => {
      console.error('Error fetching meal details:', error);
    });
}

//Getting the list of ingredients for meal infromation
function getIngredientsList(meal) {
  let ingredientsList = '';
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredientsList += `<li>${measure} ${ingredient}</li>`;
    }
  }
  return ingredientsList;
}

// Close the meal details
document.getElementById('close-details').addEventListener('click', () => {
  document.getElementById('meal-details-container').classList.remove('show');
});
