// Reference to the instructions div in the HTML
const instructionsDiv = document.getElementById('instructions');

// Function to fetch and display recipe based on user input
function fetchRecipe() {
    // Get the recipe name from user input
    const recipeName = document.getElementById('recipeInput').value;

    // Fetch the file using Fetch API
    fetch('../meals.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch the file');
            }
            return response.json(); // Parse response as JSON
        })
        .then(data => {
            // Find the recipe with the provided name
            const recipe = data.find(recipe => recipe.name === recipeName);

            if (recipe) {
                // Clear previous instructions
                instructionsDiv.innerHTML = '';

                // If the recipe is found, append its instructions to the instructions div
                if (recipe.instructions) {
                    recipe.instructions.forEach(instruction => {
                        const instructionParagraph = document.createElement('p');
                        instructionParagraph.textContent = instruction;
                        instructionsDiv.appendChild(instructionParagraph);
                    });
                } else {
                    const noInstructionsMessage = document.createElement('p');
                    noInstructionsMessage.textContent = "No instructions available for this recipe.";
                    instructionsDiv.appendChild(noInstructionsMessage);
                }
            } else {
                // If the recipe is not found, display an error message
                instructionsDiv.innerHTML = '<p>Recipe not found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching or processing the file:', error);
        });
}
