import PropTypes from 'prop-types';
import DayCard from './DayCard.jsx';
import Button from '../UI/Button.jsx';
import { DAYS_OF_WEEK } from '../../data/recipesData.js';
import styles from './MealPlanner.module.css';

// Main meal planner container — maps over the week's days, rendering a DayCard for each.
const MealPlanner = ({ mealPlan, recipes, onAddMeal, onRemoveMeal, onClearWeek }) => {
  return (
    <div>
      <div className={styles.header}>
        <h2>Weekly Meal Plan</h2>
        <Button variant="danger" onClick={onClearWeek}>Clear Week</Button>
      </div>
      <div className={styles.grid}>
        {DAYS_OF_WEEK.map((day) => (
          <DayCard
            key={day}
            day={day}
            meals={mealPlan[day]}
            recipes={recipes}
            onAddMeal={onAddMeal}
            onRemoveMeal={onRemoveMeal}
          />
        ))}
      </div>
    </div>
  );
};

MealPlanner.propTypes = {
  mealPlan: PropTypes.object.isRequired,
  recipes: PropTypes.array.isRequired,
  onAddMeal: PropTypes.func.isRequired,
  onRemoveMeal: PropTypes.func.isRequired,
  onClearWeek: PropTypes.func.isRequired,
};

export default MealPlanner;
