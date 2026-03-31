import { useState } from 'react';

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

const useClickAnimation = (onComplete,haveSound=true, delay = 300) => {
  const [buttonScale, setButtonScale] = useState(1);

  const handleClickAnimation = async () => {
    setButtonScale(0.9);
    await new Promise((resolve) => setTimeout(resolve, 100));
    setButtonScale(1);

    if(haveSound){
      const audioPlayer =new Audio(cfg.sounds?.buttonClick || './sounds/button_click.mp3');
      audioPlayer.volume = 0.316; 
      audioPlayer.loop = false;
      audioPlayer.play().catch((error)=>{console.log("Audio failed",error)});
    }
    
    if (onComplete) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      onComplete();
    }
  };

  return { buttonScale,setButtonScale, handleClickAnimation };
};

export default useClickAnimation;
