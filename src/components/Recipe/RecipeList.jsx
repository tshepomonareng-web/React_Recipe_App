import PropTypes from 'prop-types';
import RecipeCard from './RecipeCard.jsx';
import styles from './Recipe.module.css';

// Renders an array of RecipeCards. Demonstrates map() for lists and an empty state.
const RecipeList = ({ recipes, favorites, onFavoriteToggle, emptyMessage = 'No recipes found.' }) => {
  if (recipes.length === 0) {
    return <p className={styles.emptyState}>{emptyMessage}</p>;
  }

  return (
    <div className={styles.grid}>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isFavorite={favorites.some((fav) => fav.id === recipe.id)}
          onFavoriteToggle={onFavoriteToggle}
        />
      ))}
    </div>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
  emptyMessage: PropTypes.string,
};

export default RecipeList;
