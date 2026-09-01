import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '../UI/Card.jsx';
import Button from '../UI/Button.jsx';
import { formatCookTime } from '../../utils/helpers.js';
import styles from './Recipe.module.css';

// Displays a recipe summary. Reused on RecipesPage, FavoritesPage, and Home.
const RecipeCard = ({ recipe, isFavorite, onFavoriteToggle }) => {
  // Expression as prop / ternary for conditional emoji + conditional class name
  const difficultyIcon = recipe.difficulty === 'easy' ? '🟢' : recipe.difficulty === 'medium' ? '🟡' : '🔴';

  return (
    <Card>
      <div className={styles.cardImageWrap}>
        <img
          src={recipe.image}
          alt={recipe.title}
          className={styles.cardImage}
          onError={(e) => { e.target.src = 'https://placehold.co/300x200?text=Recipe'; }}
        />
        <button
          className={`${styles.favBtn} ${isFavorite ? styles.favActive : ''}`}
          onClick={() => onFavoriteToggle(recipe.id)}
          aria-label="Toggle favorite"
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <h3>{recipe.title}</h3>
      <p className={styles.meta}>
        {difficultyIcon} {recipe.cuisine} · {formatCookTime(recipe.cookTime)} · Serves {recipe.servings || 4}
      </p>
      <Link to={`/recipes/${recipe.id}`}>
        <Button variant="secondary">View Recipe</Button>
      </Link>
    </Card>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    cookTime: PropTypes.number,
    cuisine: PropTypes.string,
    difficulty: PropTypes.string,
    servings: PropTypes.number,
  }).isRequired,
  isFavorite: PropTypes.bool,
  onFavoriteToggle: PropTypes.func.isRequired,
};

export default RecipeCard;
