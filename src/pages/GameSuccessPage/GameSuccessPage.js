import { useEffect, useState } from 'react';
import GameSuccessPageStyle from './GameSuccessPage.module.css'

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const GameSuccessPage = ({ navigateTo, backgroundImage,bgmAudio,setCurrentStepOnMap }) => {
    const [buttonScale, setButtonScale] = useState(1);

    const pageStyle = { 
        backgroundImage: `url(${backgroundImage})`,
        width:'1920px',
        height:'1080px',
        loading:'eager'
    };

    useEffect(()=>{
      if(bgmAudio) bgmAudio.pause()
      const audioPlayer=new Audio(cfg.sounds.gameSuccess || './sounds/gameSuccess.mp3')
      audioPlayer.play().catch((e)=>console.log('Audio Failed',e))
    },[])


    const handleReturnHome=()=>{
      navigateTo('start')
      setCurrentStepOnMap(1)
    }

    const handleClick=async()=>{
      setButtonScale(0.9);
      await new Promise(resolve => setTimeout(resolve, 100));
      setButtonScale(1);
      await new Promise(resolve => setTimeout(resolve, 300));
      handleReturnHome()
    }

  return (
    <div className="page-container" style={pageStyle}>
        <div className={GameSuccessPageStyle.explanationSection}>
            <div className={GameSuccessPageStyle.explanationText}>{cfg.strings.wholeGameCompletedExplanation || "Congratulations! Thanks to your efforts, the team is safe, and the ancient temple has been discovered!"}</div>
            <img src='./images/object/jungle_escape_clue_frame.png' style={{transform:'scale(1.3,1)'}} alt="jungle_escape_clue_frame" loading="lazy" decoding="async"/>
            <div className={GameSuccessPageStyle.returnButton}>
              <img
                onMouseEnter={() => setButtonScale(1.1)}
                onMouseLeave={() => setButtonScale(1)}
                style={{transform: `scale(${buttonScale})`}}
                src='./images/object/jungle_escape_home_button.png' alt="jungle_escape_clue_frame" 
                onClick={()=>handleClick()} loading="lazy" decoding="async"/>
            </div>
        </div>
    </div>
  )
}
