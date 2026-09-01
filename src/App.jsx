import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar.jsx';
import Footer from './components/common/Footer.jsx';
import Home from './pages/Home.jsx';
import RecipesPage from './pages/RecipesPage.jsx';
import RecipeDetail from './components/Recipe/RecipeDetail.jsx';
import MealPlannerPage from './pages/MealPlannerPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import NotFound from './pages/NotFound.jsx';
import { recipesData, DAYS_OF_WEEK, MEAL_SLOTS } from './data/recipesData.js';
import { createEmptyMealPlan } from './utils/helpers.js';
import './App.css';

function App() {
  // Top-level state, lifted up so multiple pages/siblings can share it.
  const [recipes] = useState(recipesData);
  const [favorites, setFavorites] = useState([]);
  const [mealPlan, setMealPlan] = useState(() => createEmptyMealPlan(DAYS_OF_WEEK, MEAL_SLOTS));

  // Load favorites & meal plan from localStorage on mount.
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));

    const savedPlan = localStorage.getItem('mealPlan');
    if (savedPlan) setMealPlan(JSON.parse(savedPlan));
  }, []);

  // Persist favorites whenever they change.
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Persist meal plan whenever it changes.
  useEffect(() => {
    localStorage.setItem('mealPlan', JSON.stringify(mealPlan));
  }, [mealPlan]);

  // Child-to-parent callback: toggle a recipe's favorite status.
  const handleFavoriteToggle = (recipeId) => {
    setFavorites((prev) => {
      const exists = prev.some((r) => r.id === recipeId);
      if (exists) {
        return prev.filter((r) => r.id !== recipeId);
      }
      const recipe = recipes.find((r) => r.id === recipeId);
      return recipe ? [...prev, recipe] : prev;
    });
  };

  // Child-to-parent callback: add a recipe into a specific day/slot.
  const handleAddMeal = (day, slot, recipe) => {
    setMealPlan((prev) => ({
      ...prev,
      [day]: { ...prev[day], [slot]: recipe },
    }));
  };

  // Child-to-parent callback: remove a recipe from a day/slot.
  const handleRemoveMeal = (day, slot) => {
    setMealPlan((prev) => ({
      ...prev,
      [day]: { ...prev[day], [slot]: null },
    }));
  };

  const handleClearWeek = () => {
    setMealPlan(createEmptyMealPlan(DAYS_OF_WEEK, MEAL_SLOTS));
  };

  return (
    <div className="app-shell">
      <Navbar favoritesCount={favorites.length} />

      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={<Home recipes={recipes} favorites={favorites} onFavoriteToggle={handleFavoriteToggle} />}
          />
          <Route
            path="/recipes"
            element={<RecipesPage recipes={recipes} favorites={favorites} onFavoriteToggle={handleFavoriteToggle} />}
          />
          <Route
            path="/recipes/:id"
            element={<RecipeDetail recipes={recipes} favorites={favorites} onFavoriteToggle={handleFavoriteToggle} />}
          />
          <Route
            path="/meal-planner"
            element={
              <MealPlannerPage
                mealPlan={mealPlan}
                recipes={recipes}
                onAddMeal={handleAddMeal}
                onRemoveMeal={handleRemoveMeal}
                onClearWeek={handleClearWeek}
              />
            }
          />
          <Route
            path="/favorites"
            element={<FavoritesPage favorites={favorites} onFavoriteToggle={handleFavoriteToggle} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
