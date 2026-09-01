# RecipeHub — Recipe Discovery & Meal Planning App

## Project Overview
RecipeHub is a React single-page app for a local cooking school, letting
users browse recipes, watch cooking tutorials, plan a weekly menu, and save
favorites. Built as a capstone demonstrating functional components, hooks,
props, routing, and multimedia integration.

## Features
- Browse and search 19 sample recipes by title
- Filter by category, cuisine, and difficulty
- View full recipe details with step-by-step instructions and an ingredients modal
- Embedded video tutorials and audio cooking tips (sample media included)
- Real recipe photos loaded dynamically via LoremFlickr
- Add/remove recipes to a Monday–Sunday meal planner (breakfast/lunch/dinner slots)
- Mark/unmark recipes as favorites, with a live count in the navbar
- Favorites and meal plan persist across sessions via `localStorage`
- Fully responsive layout (mobile, tablet, desktop) with a hamburger nav on mobile
- Custom 404 page for unmatched routes

## Technologies Used
- React 18 (functional components + hooks only)
- React Router DOM v6 (routing, dynamic routes, programmatic navigation)
- PropTypes (runtime prop validation)
- CSS Modules (scoped component styling)
- Vite (build tooling)

## Component Architecture
```
App (top-level state: recipes, favorites, mealPlan)
├── Navbar
├── Home           → Header, AudioPlayer, RecipeCard
├── RecipesPage     → SearchBar, RecipeFilter, Loading, RecipeList → RecipeCard
├── RecipeDetail    → VideoPlayer, Modal (dynamic route /recipes/:id)
├── MealPlannerPage → MealPlanner → DayCard (×7) → Modal
├── FavoritesPage   → RecipeList → RecipeCard
├── NotFound
└── Footer
```
See `planning-document.md` for the full component hierarchy and data-flow diagrams.

## Installation Instructions
```bash
npm install
npm start
```
The app runs at `http://localhost:5173` by default (Vite dev server).

## Media Assets
Sample video/audio live under `public/assets/`:
- `videos/sample-tutorial.mp4` — tutorial video (every Recipe Detail page)
- `audio/sample-tip.mp3` — cooking tip audio (Home page)

Recipe photos load dynamically from LoremFlickr (a free real-photo service)
rather than local files, via URLs in `src/data/recipesData.js`.

## Project Structure
```
src/
├── components/    # Reusable building blocks, grouped by domain
│   ├── Navigation/  Navbar
│   ├── Recipe/      RecipeCard, RecipeList, RecipeDetail, RecipeFilter
│   ├── MealPlanner/ MealPlanner, DayCard
│   ├── Media/       VideoPlayer, AudioPlayer
│   ├── UI/          Button, Card, SearchBar, Loading, Modal
│   └── common/      Header, Footer
├── pages/         # Route-level components
├── data/          # Static sample recipe data
├── utils/         # Pure helper functions
├── App.jsx        # Routes + top-level (lifted) state
└── main.jsx       # Entry point, wraps App in BrowserRouter
```

## Component Descriptions
- **Navbar** — sticky nav with active-route highlighting and mobile hamburger menu.
- **RecipeCard/RecipeList** — recipe summaries; reused on Home, Recipes, Favorites.
- **RecipeDetail** — full recipe view via `:id` route param, ingredients modal, embedded video.
- **RecipeFilter/SearchBar** — controlled inputs driving the recipes filter.
- **MealPlanner/DayCard** — 7 reusable day cards, each with a recipe-picker modal.
- **VideoPlayer/AudioPlayer** — wrappers around native `<video>`/`<audio>` with fallback text.
- **Button/Card/Modal/Loading** — small reusable UI primitives used throughout.

## State Management
Shared state (`recipes`, `favorites`, `mealPlan`) is lifted into `App.jsx`
and passed down as props, with callback props (`onFavoriteToggle`,
`onAddMeal`, `onRemoveMeal`) bubbling changes back up. `favorites` and
`mealPlan` sync to `localStorage` via `useEffect` so they survive a page
refresh. Local UI state stays in the component that owns it.

## Routing
| Route | Component | Notes |
|---|---|---|
| `/` | Home | Featured recipes + audio tip |
| `/recipes` | RecipesPage | Search + filter + list |
| `/recipes/:id` | RecipeDetail | Dynamic route param |
| `/meal-planner` | MealPlannerPage | Weekly planner |
| `/favorites` | FavoritesPage | Saved recipes |
| `*` | NotFound | 404 page |

## Future Enhancements
- Connect to a real recipe API instead of static sample data
- Drag-and-drop recipes onto meal planner slots
- User accounts so favorites/meal plans sync across devices
- Nutrition info and shopping-list generation
- Recipe ratings and reviews

## Screenshots
See the `screenshots/` folder for Home, Recipes (with filters), Recipe Detail
(with video), Meal Planner, Favorites, and a mobile responsive view.

| Page | File |
|---|---|
| Home | `screenshots/home.png` |
| Recipes (filtered) | `screenshots/recipes.png` |
| Recipe Detail (video) | `screenshots/recipe-detail.png` |
| Meal Planner | `screenshots/meal-planner.png` |
| Favorites | `screenshots/favorites.png` |
| Mobile view | `screenshots/mobile.png` |