import PropTypes from 'prop-types';
import styles from './UI.module.css';

// Reusable Button — demonstrates default props, expressions as props (className),
// and the `children` prop (composition pattern).
const Button = ({ children, variant = 'primary', onClick, type = 'button' }) => {
  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit']),
};

export default Button;
