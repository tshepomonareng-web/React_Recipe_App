// Small pure helper functions used across components (data transformation).

// Formats total minutes into a friendly "Xh Ym" / "Xm" string.
export function formatCookTime(minutes) {
  if (!minutes || minutes <= 0) return 'N/A';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

// Builds an empty meal plan object: { monday: { breakfast: null, ... }, ... }
export function createEmptyMealPlan(days, slots) {
  return days.reduce((plan, day) => {
    plan[day] = slots.reduce((slotsObj, slot) => {
      slotsObj[slot] = null;
      return slotsObj;
    }, {});
    return plan;
  }, {});
}

// Capitalizes the first letter of a string (used for display labels).
export function capitalize(word) {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
}
