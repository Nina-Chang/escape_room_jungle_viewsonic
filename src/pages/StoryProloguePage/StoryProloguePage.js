import { useState } from 'react';
import StoryProloguePageStyle from './StoryProloguePage.module.css'
const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const StoryProloguePage = ({ navigateTo, backgroundImage }) => {
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

    setTimeout(()=>{
      navigateTo('gameStart');
    },300)
  }


  return (
    <div className="page-container" style={pageStyle}>
        <span className={StoryProloguePageStyle.signalText}>Weak signal...</span>
        <div className={StoryProloguePageStyle.coordinatesText}>3°28'26.6"S<br/>62°12'12.7"W</div>
        <button className={StoryProloguePageStyle.imageButton}
         onMouseEnter={() => setButtonScale(1.1)}
         onMouseLeave={() => setButtonScale(1)}
         style={{transform: `translate(-50%, -50%) scale(${buttonScale})`}}
         onClick={handleClick}>
            <img src='./images/object/jungle_escape_nect_button.png' alt="Continue" loading="lazy" decoding="async"/>
        </button>
        <div className={StoryProloguePageStyle.conversationText}>
            {cfg.strings.previousStoryConversation || "[Team Member]:Hello? Can anyone hear me? We're lost...battery dying!"}
        </div>
    </div>
  )
}
