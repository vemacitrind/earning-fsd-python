from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import openai
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path='/home/master/Documents/DJango/.env')

openai.api_key = os.getenv('OPENAI_API_KEY')

@login_required
def home(req):
    ingredients = [
        'Chicken', 'Beef', 'Pork', 'Fish', 'Shrimp', 'Eggs', 'Tofu',
        'Rice', 'Pasta', 'Bread', 'Potatoes', 'Quinoa',
        'Tomatoes', 'Onions', 'Garlic', 'Carrots', 'Broccoli', 'Spinach',
        'Bell Peppers', 'Mushrooms', 'Zucchini', 'Cucumber',
        'Cheese', 'Milk', 'Butter', 'Yogurt',
        'Olive Oil', 'Salt', 'Pepper', 'Herbs', 'Spices'
    ]
    
    diet_preferences = [
        'No Preference', 'Vegetarian', 'Vegan', 'Gluten-Free', 
        'Keto', 'Paleo', 'Low-Carb', 'Mediterranean'
    ]
    
    course_types = [
        'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Appetizer'
    ]
    
    cuisines = [
        'Italian', 'Chinese', 'Mexican', 'Indian', 'Thai', 'Japanese',
        'French', 'Mediterranean', 'American', 'Korean', 'Greek'
    ]
    
    context = {
        'user': req.user,
        'ingredients': ingredients,
        'diet_preferences': diet_preferences,
        'course_types': course_types,
        'cuisines': cuisines
    }
    return render(req, "index.html", context)

def signupaccount(req):
    if req.method == "GET":
        return render(req, 'signup.html')
    if req.POST["password1"] == req.POST["password2"]:
        try:
            user = User.objects.create_user(
                req.POST["username"],
                password=req.POST["password1"]
            )
            user.save()
            login(req, user)
            return redirect('home')
        except IntegrityError:
            return render(req, 'signup.html', {'error': 'Username already taken. Choose a new username.'})
    else: 
        return render(req, 'signup.html', {'error': 'Passwords don\'t match'})
    
def signinaccount(req):
    if req.method == "GET":
        return render(req, 'login.html')
    else:
        user = authenticate(req, username=req.POST['username'], password=req.POST['password'])
        if user is None:
            return render(req, 'login.html', {'error': 'Username or password don\'t match'})
        login(req, user)
        return redirect('home')

@login_required
def signoutaccount(req):
    logout(req)
    return redirect('signin')

@login_required
@csrf_exempt
def generate_recipe(req):
    if req.method == 'POST':
        try:
            data = json.loads(req.body)
            ingredients = data.get('ingredients', [])
            diet_preference = data.get('diet_preference', 'No Preference')
            course_type = data.get('course_type', 'Dinner')
            cuisine = data.get('cuisine', 'Italian')
            
            if not ingredients:
                return JsonResponse({'error': 'Please select at least one ingredient'}, status=400)
            
            prompt = f"""
            Create a detailed recipe using these ingredients: {', '.join(ingredients)}
            
            Requirements:
            - Diet preference: {diet_preference}
            - Course type: {course_type}
            - Cuisine style: {cuisine}
            
            Please provide the response in this exact JSON format:
            {{
                "title": "Recipe Name",
                "prep_time": "X minutes",
                "cook_time": "X minutes",
                "servings": "X servings",
                "ingredients": ["ingredient 1", "ingredient 2", ...],
                "instructions": ["step 1", "step 2", ...],
                "nutrition": "Brief nutrition information",
                "tips": "Chef's tips and suggestions"
            }}
            
            Make sure the recipe is practical, delicious, and follows the specified dietary requirements.
            """
            
            # Call OpenAI API
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a professional chef and recipe creator. Always respond with valid JSON format."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=1000,
                temperature=0.7
            )
            
            recipe_text = response.choices[0].message.content.strip()
            
            # Try to parse the JSON response
            try:
                recipe_data = json.loads(recipe_text)
                return JsonResponse(recipe_data)
            except json.JSONDecodeError:
                # If JSON parsing fails, create a structured response
                return JsonResponse({
                    'title': f'{cuisine} {course_type} Recipe',
                    'prep_time': '15 minutes',
                    'cook_time': '30 minutes',
                    'servings': '4 servings',
                    'ingredients': ingredients,
                    'instructions': ['Recipe generation failed, but here are your selected ingredients to work with.'],
                    'nutrition': 'Nutrition information not available',
                    'tips': 'Try combining these ingredients with basic cooking techniques.'
                })
                
        except Exception as e:
            return JsonResponse({'error': f'Failed to generate recipe: {str(e)}'}, status=500)
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)    