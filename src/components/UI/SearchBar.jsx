import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './UI.module.css';

// Controlled search input. Demonstrates onChange, onFocus/onBlur events,
// and a form onSubmit handler.
const SearchBar = ({ value, onChange, onSubmit, placeholder = 'Search recipes...' }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        type="text"
        className={`${styles.searchInput} ${isFocused ? styles.searchInputFocused : ''}`}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <button type="submit" className={styles.searchButton}>Search</button>
    </form>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
};

export default SearchBar;
