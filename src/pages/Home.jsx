import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/common/Header.jsx';
import AudioPlayer from '../components/Media/AudioPlayer.jsx';
import RecipeCard from '../components/Recipe/RecipeCard.jsx';
import Button from '../components/UI/Button.jsx';
import styles from './Pages.module.css';

const Home = ({ recipes, favorites, onFavoriteToggle }) => {
  // Data transformation before passing to child: take first 3 recipes as "featured"
  const featured = recipes.slice(0, 3);

  return (
    <div>
      <Header
        title="Discover, Plan, Cook."
        subtitle="Browse recipes, plan your week, and save your favorites — all in one place."
      >
        <Link to="/recipes">
          <Button variant="secondary">Browse Recipes</Button>
        </Link>
      </Header>

      <AudioPlayer audioUrl="/assets/audio/sample-tip.mp3" title="🎧 Cooking Tip: Knife Skills 101" />

      <h2>Featured Recipes</h2>
      <div className={styles.grid}>
        {featured.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            isFavorite={favorites.some((fav) => fav.id === recipe.id)}
            onFavoriteToggle={onFavoriteToggle}
          />
        ))}
      </div>
    </div>
  );
};

Home.propTypes = {
  recipes: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  onFavoriteToggle: PropTypes.func.isRequired,
};

export default Home;
