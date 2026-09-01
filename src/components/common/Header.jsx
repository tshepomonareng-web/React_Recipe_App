import PropTypes from 'prop-types';
import styles from './common.module.css';

// Generic page header — demonstrates children prop composition on Home.
const Header = ({ title, subtitle, children }) => (
  <header className={styles.pageHeader}>
    <h1>{title}</h1>
    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    {children}
  </header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  children: PropTypes.node,
};

export default Header;
