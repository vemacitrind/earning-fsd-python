// Recipe Generator JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const recipeForm = document.getElementById('recipeForm');
    const generateBtn = document.getElementById('generateBtn');
    const loadingContainer = document.getElementById('loadingContainer');
    const recipeDisplay = document.getElementById('recipeDisplay');
    const errorMessage = document.getElementById('errorMessage');

    // Create floating particles
    createParticles();

    // Handle form submission
    recipeForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(recipeForm);
        const selectedIngredients = formData.getAll('ingredients');
        const dietPreference = formData.get('diet_preference');
        const courseType = formData.get('course_type');
        const cuisine = formData.get('cuisine');

        // Validate ingredients
        if (selectedIngredients.length === 0) {
            showError('Please select at least one ingredient!');
            return;
        }

        // Show loading state
        showLoading();

        try {
            // Send request to Django backend
            const response = await fetch('/generate-recipe/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify({
                    ingredients: selectedIngredients,
                    diet_preference: dietPreference,
                    course_type: courseType,
                    cuisine: cuisine
                })
            });

            const data = await response.json();

            if (response.ok) {
                displayRecipe(data);
            } else {
                showError(data.error || 'Failed to generate recipe');
            }
        } catch (error) {
            console.error('Error:', error);
            showError('Network error. Please try again.');
        } finally {
            hideLoading();
        }
    });

    function showLoading() {
        generateBtn.classList.add('loading');
        loadingContainer.style.display = 'block';
        recipeDisplay.style.display = 'none';
        errorMessage.style.display = 'none';
    }

    function hideLoading() {
        generateBtn.classList.remove('loading');
        loadingContainer.style.display = 'none';
    }

    function showError(message) {
        errorMessage.style.display = 'block';
        document.getElementById('errorText').textContent = message;
        recipeDisplay.style.display = 'none';
    }

    function displayRecipe(recipe) {
        // Update recipe title and meta info
        document.getElementById('recipeTitle').textContent = recipe.title;
        document.getElementById('prepTime').textContent = recipe.prep_time;
        document.getElementById('cookTime').textContent = recipe.cook_time;
        document.getElementById('servings').textContent = recipe.servings;

        // Update ingredients list
        const ingredientsList = document.getElementById('ingredientsList');
        ingredientsList.innerHTML = '';
        recipe.ingredients.forEach(ingredient => {
            const li = document.createElement('li');
            li.textContent = ingredient;
            ingredientsList.appendChild(li);
        });

        // Update instructions list
        const instructionsList = document.getElementById('instructionsList');
        instructionsList.innerHTML = '';
        recipe.instructions.forEach(instruction => {
            const li = document.createElement('li');
            li.textContent = instruction;
            instructionsList.appendChild(li);
        });

        // Update nutrition info
        document.getElementById('nutritionInfo').textContent = recipe.nutrition;

        // Update chef's tips
        document.getElementById('chefTips').textContent = recipe.tips;

        // Show recipe display
        recipeDisplay.style.display = 'block';
        errorMessage.style.display = 'none';

        // Scroll to recipe
        recipeDisplay.scrollIntoView({ behavior: 'smooth' });
    }

    // Recipe action buttons
    document.querySelector('.save-btn').addEventListener('click', function() {
        alert('Recipe saved! (This would save to user favorites in a full implementation)');
    });

    document.querySelector('.share-btn').addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: document.getElementById('recipeTitle').textContent,
                text: 'Check out this amazing recipe I generated!',
                url: window.location.href
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            const recipeTitle = document.getElementById('recipeTitle').textContent;
            const shareText = `Check out this amazing recipe: ${recipeTitle}`;
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Recipe link copied to clipboard!');
            });
        }
    });

    document.querySelector('.print-btn').addEventListener('click', function() {
        window.print();
    });

    // Utility function to get CSRF token
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // Create floating particles effect
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                pointer-events: none;
                animation: particleFloat ${Math.random() * 10 + 10}s infinite linear;
                left: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 10}s;
            `;
            particlesContainer.appendChild(particle);
        }

        // Add particle animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0% {
                    transform: translateY(100vh) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Add smooth scrolling for better UX
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add ingredient selection animation
    document.querySelectorAll('.ingredient-item').forEach(item => {
        item.addEventListener('click', function() {
            const checkbox = this.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;
            
            // Add selection animation
            if (checkbox.checked) {
                this.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            }
        });
    });
});
