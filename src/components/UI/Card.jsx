import PropTypes from 'prop-types';
import styles from './UI.module.css';

// Generic container — demonstrates the `children` prop / composition pattern.
const Card = ({ children, hoverable = true }) => {
  return (
    <div className={`${styles.card} ${hoverable ? styles.cardHoverable : ''}`}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  hoverable: PropTypes.bool,
};

export default Card;
