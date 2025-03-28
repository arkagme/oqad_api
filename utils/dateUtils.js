const isSunday = () => {
    const today = new Date();
    return today.getDay() === 0; // 0 is Sunday in JavaScript
  };
  
  const getStartOfDay = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };
  
  const formatDate = (date = new Date()) => {
    return date.toISOString().split('.')[0];
  };
  
  module.exports = {
    isSunday,
    getStartOfDay,
    formatDate
  };
  