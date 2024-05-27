import { useEffect } from 'react';

const scrollOnCondition = (condition, targetSelector) => {
  useEffect(() => {
    if (condition) {
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [condition, targetSelector]);
};

export default scrollOnCondition
