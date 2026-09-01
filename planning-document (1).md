# Planning Document — Recipe Discovery & Meal Planning App

## Component Hierarchy

```
App (routes, top-level state: recipes, favorites, mealPlan)
├── Navbar (common)
├── Home (page)
│   ├── AudioPlayer (Media)
│   └── Card x3 (UI, featured recipes)
│       └── RecipeCard (Recipe)
├── RecipesPage (page)
│   ├── SearchBar (UI)
│   ├── RecipeFilter (Recipe)
│   ├── Loading (UI) — conditional
│   └── RecipeList (Recipe)
│       └── RecipeCard (Recipe) [x N] — reusable
│           └── Button (UI)
├── RecipeDetailPage → RecipeDetail (Recipe) [dynamic route /recipes/:id]
│   ├── VideoPlayer (Media)
│   ├── Button (UI)
│   └── Modal (UI) — conditional, children prop
├── MealPlannerPage (page)
│   └── MealPlanner (MealPlanner)
│       └── DayCard (MealPlanner) [x7, reusable — Mon-Sun]
│           └── Modal (UI) — recipe picker, children prop
├── FavoritesPage (page)
│   └── RecipeList (Recipe, reused)
│       └── RecipeCard (Recipe, reused)
└── NotFound (page, catch-all route)
```
3+ levels of nesting (App > RecipesPage > RecipeList > RecipeCard > Button) and 6 reusable components (RecipeCard, Button, Card, DayCard, Modal, Loading).

## Data Flow Diagram

```
recipesData.js (static source)
   → App.jsx: useState(recipes), useState(favorites), useState(mealPlan)
        ↓ props down                          ↑ callbacks up
   RecipesPage → RecipeList → RecipeCard   onFavoriteToggle(id)
   MealPlannerPage → MealPlanner → DayCard  onAddMeal(day, slot, recipe)
        ↓                                    onRemoveMeal(day, slot)
   FavoritesPage → RecipeList (shared, sibling of RecipesPage via App state)
        ↓
   localStorage ⇄ useEffect (persist favorites & mealPlan on change)
```
- **Lifting state up:** `favorites` and `mealPlan` live in `App.jsx` so `RecipesPage`/`FavoritesPage` and `MealPlannerPage` can read/update the same data (sibling communication through the parent).
- **Data transformation before passing down:** `App` derives `favoriteRecipes` for `FavoritesPage`; `RecipesPage` computes `filteredRecipes` before passing to `RecipeList`.

## Key Components
- **Navbar** — active-route styling, responsive hamburger menu
- **RecipeCard/RecipeList** — reused across Home, Recipes, Favorites
- **RecipeDetail** — uses `:id` route param, ingredients modal, embedded video
- **MealPlanner/DayCard** — 7 reusable day cards, each with a recipe-picker modal
- **Button/Card/Modal/Loading** — reusable UI primitives using `children`/callback props

## State Management Strategy
- **Local UI state** (search text, filters, modal visibility) stays in the component that owns that UI.
- **Shared state** (`recipes`, `favorites`, `mealPlan`) is lifted into `App.jsx` and passed down via props, with callback props bubbling changes back up — keeping the tree shallow (max 3 levels to any consumer) rather than prop-drilling.
- **Persistence:** `useEffect` reads `favorites`/`mealPlan` from `localStorage` on mount and writes on every change.
- **Derived state:** loading/empty states are computed from `recipes.length` and `isLoading`, not duplicated.
