import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Navbar.module.css';

// Sticky navigation with active-route styling and a mobile hamburger toggle.
const Navbar = ({ favoritesCount }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/recipes', label: 'Recipes' },
    { to: '/meal-planner', label: 'Meal Planner' },
    { to: '/favorites', label: `Favorites (${favoritesCount})` },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.navInner}>
        <Link to="/" className={styles.brand}>🍳 RecipeHub</Link>

        <button
          className={styles.hamburger}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          &#9776;
        </button>

        <div className={`${styles.links} ${isOpen ? styles.linksOpen : ''}`}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={isActive(link.to) ? styles.active : ''}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  favoritesCount: PropTypes.number.isRequired,
};

export default Navbar;
