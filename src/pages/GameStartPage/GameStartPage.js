import React, { useState } from 'react';
import GameStartPageStyle from './GameStartPage.module.css'

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const GameStartPage = ({ navigateTo, backgroundImage }) => {
    const [buttonScale, setButtonScale] = useState(1);
    
    const pageStyle = { 
        backgroundImage: `url(${backgroundImage})`,
        width:'1920px',
        height:'1080px',
        loading:'eager'
    };

    const handleClick=async()=>{
        setButtonScale(0.9);
        await new Promise(resolve => setTimeout(resolve, 100));
        setButtonScale(1);
        await new Promise(resolve => setTimeout(resolve, 300));
        navigateTo('map');
    }


  return (
    <div className="page-container" style={pageStyle}>
        <div className={GameStartPageStyle.explanationSection}>
            <div className={GameStartPageStyle.avatarsSection}>
                <img className={GameStartPageStyle.avatarsIcon} src='./images/object/jungle_escape_avatars_icon.png' alt="jungle_escape_team_avatars" loading="lazy" decoding="async"/>
            </div>
            <div dangerouslySetInnerHTML={{__html:cfg.strings.startGameExplanationText || `[Headquarters]: That's the last we heard. The missing team needs your help. To rescue them,you'll have to solve challenging puzzles and collect vital clues hidden deep within the jungle. Time is running out. Good luck, adventurer.`}} className={GameStartPageStyle.explanationText}>
            </div>
        </div>
        <button className={GameStartPageStyle.imageButton} 
         onMouseEnter={() => setButtonScale(1.1)}
         onMouseLeave={() => setButtonScale(1)}
         style={{transform: `translate(-50%, -50%) scale(${buttonScale})`}}
         onClick={handleClick}>
            <img src='./images/object/jungle_escape_mission_button.png' alt="Continue" loading="lazy" decoding="async"/>
            <div className={GameStartPageStyle.btnText}>Start Mission</div>
        </button>
    </div>
  )
}
