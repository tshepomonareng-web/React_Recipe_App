import styles from './common.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <p>&copy; {new Date().getFullYear()} RecipeHub — Built with React for the Recipe Discovery capstone.</p>
  </footer>
);

export default Footer;
