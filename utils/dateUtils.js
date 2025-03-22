/**
 * Check if today is Sunday
 * @returns {boolean} true if today is Sunday
 */
const isSunday = () => {
    const today = new Date();
    return today.getDay() === 0; // 0 is Sunday in JavaScript
  };
  
  /**
   * Get the start of today (midnight)
   * @returns {Date} Date object set to today at 00:00:00
   */
  const getStartOfDay = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };
  
  /**
   * Format date to ISO string without milliseconds
   * @param {Date} date - Date to format
   * @returns {string} Formatted date string
   */
  const formatDate = (date = new Date()) => {
    return date.toISOString().split('.')[0] + 'Z';
  };
  
  module.exports = {
    isSunday,
    getStartOfDay,
    formatDate
  };
  