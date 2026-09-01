import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../components/UI/SearchBar.jsx';
import RecipeFilter from '../components/Recipe/RecipeFilter.jsx';
import RecipeList from '../components/Recipe/RecipeList.jsx';
import Loading from '../components/UI/Loading.jsx';
import { CATEGORIES, CUISINES, DIFFICULTIES } from '../data/recipesData.js';
import styles from './Pages.module.css';

const RecipesPage = ({ recipes, favorites, onFavoriteToggle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ category: 'all', cuisine: 'all', difficulty: 'all' });
  const [isLoading, setIsLoading] = useState(true);

  // Simulated data-loading effect — demonstrates a loading state via useEffect.
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ category: 'all', cuisine: 'all', difficulty: 'all' });
    setSearchTerm('');
  };

  // Function called within JSX for data transformation (filtering)
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filters.category === 'all' || recipe.category === filters.category;
    const matchesCuisine = filters.cuisine === 'all' || recipe.cuisine === filters.cuisine;
    const matchesDifficulty = filters.difficulty === 'all' || recipe.difficulty === filters.difficulty;
    return matchesSearch && matchesCategory && matchesCuisine && matchesDifficulty;
  });

  return (
    <div>
      <h1>All Recipes</h1>
      <SearchBar value={searchTerm} onChange={setSearchTerm} onSubmit={setSearchTerm} />
      <RecipeFilter
        categories={CATEGORIES}
        cuisines={CUISINES}
        difficulties={DIFFICULTIES}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClear={handleClearFilters}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {filteredRecipes.length === 0 && <p className={styles.errorText}>No recipes match your filters.</p>}
          <RecipeList
            recipes={filteredRecipes}
            favorites={favorites}
            onFavoriteToggle={onFavoriteToggle}
            emptyMessage="Try adjusting your search or filters."
          />
        </>
      )}
    </div>
  );
};

RecipesPage.propTypes = {
  recipes: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
};

export default RecipesPage;
