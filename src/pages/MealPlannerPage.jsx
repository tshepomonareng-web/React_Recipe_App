import PropTypes from 'prop-types';
import MealPlanner from '../components/MealPlanner/MealPlanner.jsx';

const MealPlannerPage = ({ mealPlan, recipes, onAddMeal, onRemoveMeal, onClearWeek }) => {
  return (
    <MealPlanner
      mealPlan={mealPlan}
      recipes={recipes}
      onAddMeal={onAddMeal}
      onRemoveMeal={onRemoveMeal}
      onClearWeek={onClearWeek}
    />
  );
};

MealPlannerPage.propTypes = {
  mealPlan: PropTypes.object.isRequired,
  recipes: PropTypes.array.isRequired,
  onAddMeal: PropTypes.func.isRequired,
  onRemoveMeal: PropTypes.func.isRequired,
  onClearWeek: PropTypes.func.isRequired,
};

export default MealPlannerPage;
