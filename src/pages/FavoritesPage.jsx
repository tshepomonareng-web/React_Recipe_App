import PropTypes from 'prop-types';
import RecipeList from '../components/Recipe/RecipeList.jsx';

// Favorites page — reuses RecipeList/RecipeCard (sibling communication via App state).
const FavoritesPage = ({ favorites, onFavoriteToggle }) => {
  return (
    <div>
      <h1>Your Favorites</h1>
      {favorites.length > 0 ? (
        <RecipeList recipes={favorites} favorites={favorites} onFavoriteToggle={onFavoriteToggle} />
      ) : (
        <p>No favorites yet. Start adding recipes! ❤️</p>
      )}
    </div>
  );
};

FavoritesPage.propTypes = {
  favorites: PropTypes.array.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
};

export default FavoritesPage;
