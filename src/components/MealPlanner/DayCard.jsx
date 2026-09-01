import { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '../UI/Card.jsx';
import Button from '../UI/Button.jsx';
import Modal from '../UI/Modal.jsx';
import { capitalize } from '../../utils/helpers.js';
import styles from './MealPlanner.module.css';

// One day's meal slots. Rendered 7 times (Mon-Sun) by MealPlanner — a reusable component.
const DayCard = ({ day, meals, recipes, onAddMeal, onRemoveMeal }) => {
  const [activeSlot, setActiveSlot] = useState(null); // which slot the picker modal is for

  const handlePick = (recipe) => {
    onAddMeal(day, activeSlot, recipe);
    setActiveSlot(null);
  };

  return (
    <Card hoverable={false}>
      <h3>{capitalize(day)}</h3>
      {Object.keys(meals).map((slot) => (
        <div key={slot} className={styles.slot}>
          <span className={styles.slotLabel}>{capitalize(slot)}:</span>
          {meals[slot] ? (
            <div className={styles.slotFilled}>
              <span>{meals[slot].title}</span>
              <button className={styles.removeBtn} onClick={() => onRemoveMeal(day, slot)}>&times;</button>
            </div>
          ) : (
            <Button variant="secondary" onClick={() => setActiveSlot(slot)}>+ Add</Button>
          )}
        </div>
      ))}

      <Modal
        isOpen={activeSlot !== null}
        onClose={() => setActiveSlot(null)}
        title={`Choose a recipe for ${capitalize(day)} ${activeSlot || ''}`}
      >
        <div className={styles.pickerList}>
          {recipes.map((recipe) => (
            <button key={recipe.id} className={styles.pickerItem} onClick={() => handlePick(recipe)}>
              {recipe.title}
            </button>
          ))}
        </div>
      </Modal>
    </Card>
  );
};

DayCard.propTypes = {
  day: PropTypes.string.isRequired,
  meals: PropTypes.object.isRequired,
  recipes: PropTypes.array.isRequired,
  onAddMeal: PropTypes.func.isRequired,
  onRemoveMeal: PropTypes.func.isRequired,
};

export default DayCard;
