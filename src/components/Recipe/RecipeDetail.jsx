import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import VideoPlayer from '../Media/VideoPlayer.jsx';
import Button from '../UI/Button.jsx';
import Modal from '../UI/Modal.jsx';
import styles from './Recipe.module.css';

// Full recipe view. Uses the :id route param (dynamic route) and
// programmatic navigation via useNavigate.
const RecipeDetail = ({ recipes, favorites, onFavoriteToggle }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const recipe = recipes.find((r) => r.id === parseInt(id, 10));
  const isFavorite = recipe ? favorites.some((fav) => fav.id === recipe.id) : false;

  // Conditional rendering: entire section swapped when recipe isn't found
  if (!recipe) {
    return (
      <div className={styles.notFoundInline}>
        <h2>Recipe not found</h2>
        <Button onClick={() => navigate('/recipes')}>Back to Recipes</Button>
      </div>
    );
  }

  return (
    <div className={styles.detailWrap}>
      <Button onClick={() => navigate('/recipes')}>&larr; Back to Recipes</Button>

      <h1>{recipe.title}</h1>
      <p className={styles.meta}>
        {recipe.cuisine} · {recipe.difficulty} · {recipe.cookTime} minutes · Serves {recipe.servings || 4}
      </p>

      <img
        src={recipe.image}
        alt={recipe.title}
        className={styles.detailImage}
        onError={(e) => { e.target.src = 'https://placehold.co/600x350?text=Recipe'; }}
      />

      <div className={styles.detailActions}>
        <Button variant={isFavorite ? 'danger' : 'primary'} onClick={() => onFavoriteToggle(recipe.id)}>
          {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
        </Button>
        <Button variant="secondary" onClick={() => setShowModal(true)}>View Ingredients</Button>
      </div>

      <h2>Instructions</h2>
      <ol>
        {recipe.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      <VideoPlayer videoUrl={recipe.videoUrl} title={`${recipe.title} — Tutorial`} />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Ingredients">
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </Modal>
    </div>
  );
};

RecipeDetail.propTypes = {
  recipes: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
};

export default RecipeDetail;
