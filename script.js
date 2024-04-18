// Function to fetch recipes from meals.json based on user inputs
const outputDiv = document.getElementById('output');

function fetchRecipes(userIngredients) {
  fetch('./meals.json')
    .then(response => response.json())
    .then(recipes => {
      const matchingRecipes = recipes.filter(recipe => {
        return userIngredients.some(userIngredient => recipe.ingredients.some(recipeIngredient => recipeIngredient.toLowerCase().includes(userIngredient.toLowerCase())));
      });

      let output = "";

      if (matchingRecipes.length > 0) {
        output += "Recipes you can cook with these ingredients:<br>";
        matchingRecipes.forEach(recipe => {
          const missingIngredients = recipe.ingredients.filter(ingredient => !userIngredients.some(userIngredient => ingredient.toLowerCase().includes(userIngredient.toLowerCase())));
          if (missingIngredients.length === 0) {
            output += recipe.name + "<br>";
          } else {
            const presentIngredients = userIngredients.filter(userIngredient => recipe.ingredients.some(recipeIngredient => recipeIngredient.toLowerCase().includes(userIngredient.toLowerCase())));
            output += `You have <b> ${presentIngredients.join(", ")} </b> but you are missing <b> ${missingIngredients.join(", ").toLowerCase()} </b> to cook ${recipe.name.toLowerCase()}. <br>`;
          }
        });
      } else {
        output += "Sorry, no recipes found with those ingredients.<br>";
      }

      outputDiv.innerHTML = output;

    })
    .catch(error => console.error('Error fetching recipes:', error));
}

// Function to prompt user for ingredients and find recipes
function getUserInputAndFindRecipes() {
  const userInput = prompt("Enter ingredients separated by commas:");
  const userIngredients = userInput.split(",").map(ingredient => ingredient.trim());

  fetchRecipes(userIngredients);
}

// Call the function to start the program
getUserInputAndFindRecipes();