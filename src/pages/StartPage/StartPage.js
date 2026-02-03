import { useState } from 'react';
import StartPageStyle from "./StartPage.module.css"

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const StartPage = ({navigateTo,backgroundImage,onStartGame}) => {
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
    onStartGame();

  }


  return (
    <div className='page-container' style={pageStyle}>
      <h1 className={StartPageStyle.title}>{cfg.strings.startTitle || 'Into the Jungle'}</h1>
      <h3 className={StartPageStyle.subTitle}>{cfg.strings.startSubtitle || 'The Missing Expedition'}</h3>
      <button className={StartPageStyle.imageButton} 
        onMouseEnter={() => setButtonScale(1.1)}
        onMouseLeave={() => setButtonScale(1)}
        style={{transform: `translate(-50%, -50%) scale(${buttonScale})`}}
        onClick={handleClick}>
        <img src='./images/object/jungle_escape_start_button.png' alt="Start Button" loading="lazy" decoding="async" />
        <span className={StartPageStyle.btnText}>Start</span>
      </button>
    </div>
  )
}
