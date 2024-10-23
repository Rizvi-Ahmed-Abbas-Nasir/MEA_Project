import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const Celebration = () => {
  // State to control when the confetti should be active
  const [isConfettiActive, setIsConfettiActive] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // This ensures the code only runs in the browser
    if (typeof window !== 'undefined') {
      // Set initial dimensions
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Stop the confetti after 5 seconds (or any time you prefer)
    const timer = setTimeout(() => {
      setIsConfettiActive(false);
    }, 5000); // Confetti runs for 5 seconds

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  // Update window dimensions on resize
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener('resize', handleResize);

      // Cleanup event listener on unmount
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div>
      {isConfettiActive && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
        />
      )}
    </div>
  );
};

export default Celebration;
