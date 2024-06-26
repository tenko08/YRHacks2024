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
            // var link = document.createElement("a");

            // link.href = "/omelette/index.html"; // Replace "otherpage.html" with the actual relative URL of the other page

            // link.textContent = recipe.name;

            // output.appendChild(link);
            output += "<a href=/" + recipe.name + "/index.html>"+ recipe.name+"</a> <br>";
          } else {
            const presentIngredients = userIngredients.filter(userIngredient => recipe.ingredients.some(recipeIngredient => recipeIngredient.toLowerCase().includes(userIngredient.toLowerCase())));
            output += `To cook ${recipe.name.toLowerCase()}, you have <b> ${presentIngredients.join(", ")} </b> but you are missing <b> ${missingIngredients.join(", ").toLowerCase()} </b>. <br>`;
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
function getUserInput() {
  let userIngredients = document.getElementById("userInput").value.split(",").map(ingredient => ingredient.trim());
  //  const userIngredients = userInput.split(",").map(ingredient => ingredient.trim());

  fetchRecipes(userIngredients);
}

// Call the function to start the program
getUserInput();