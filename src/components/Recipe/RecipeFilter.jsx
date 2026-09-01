import PropTypes from 'prop-types';
import Button from '../UI/Button.jsx';
import { capitalize } from '../../utils/helpers.js';
import styles from './Recipe.module.css';

// Filter controls for category, cuisine and difficulty. Demonstrates onChange
// events on <select> elements plus a "clear filters" click handler.
const RecipeFilter = ({ categories, cuisines, difficulties, filters, onFilterChange, onClear }) => {
  return (
    <div className={styles.filterBar}>
      <select
        value={filters.category}
        onChange={(e) => onFilterChange('category', e.target.value)}
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{capitalize(cat)}</option>
        ))}
      </select>

      <select
        value={filters.cuisine}
        onChange={(e) => onFilterChange('cuisine', e.target.value)}
      >
        <option value="all">All Cuisines</option>
        {cuisines.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        value={filters.difficulty}
        onChange={(e) => onFilterChange('difficulty', e.target.value)}
      >
        <option value="all">All Difficulties</option>
        {difficulties.map((d) => (
          <option key={d} value={d}>{capitalize(d)}</option>
        ))}
      </select>

      <Button variant="danger" onClick={onClear}>Clear Filters</Button>
    </div>
  );
};

RecipeFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  cuisines: PropTypes.arrayOf(PropTypes.string).isRequired,
  difficulties: PropTypes.arrayOf(PropTypes.string).isRequired,
  filters: PropTypes.shape({
    category: PropTypes.string,
    cuisine: PropTypes.string,
    difficulty: PropTypes.string,
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default RecipeFilter;
