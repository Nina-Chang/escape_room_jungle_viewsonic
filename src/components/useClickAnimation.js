import { useState } from 'react';

const useClickAnimation = (onComplete, delay = 300) => {
  const [buttonScale, setButtonScale] = useState(1);

  const handleClickAnimation = async () => {
    setButtonScale(0.9);
    await new Promise((resolve) => setTimeout(resolve, 100));
    setButtonScale(1);
    
    if (onComplete) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      onComplete();
    }
  };

  return { buttonScale,setButtonScale, handleClickAnimation };
};

export default useClickAnimation;
