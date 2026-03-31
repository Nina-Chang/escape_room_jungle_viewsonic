import { useEffect } from 'react';
import GameSuccessPageStyle from './GameSuccessPage.module.css'
import useSendGameMessage from '../../hooks/useSendGameMessage';
import useClickAnimation from '../../hooks/useClickAnimation';
import usePageAssets from '../../hooks/usePageAssets';

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const GameSuccessPage = ({ navigateTo, backgroundImage,bgmAudio,setCurrentStepOnMap }) => {
    const handleReturnHome=()=>{
      navigateTo('start')
      setCurrentStepOnMap(1)
    }
    const { buttonScale,setButtonScale, handleClickAnimation }=useClickAnimation(handleReturnHome)
    const { sendMessage }=useSendGameMessage()
    const pageAssets = usePageAssets(cfg.assets, 13);
    
    const pageStyle = { 
      backgroundImage: `url(${backgroundImage})`,
      width:'1920px',
      height:'1080px',
      loading:'eager'
    };
    
    useEffect(() => {
      // 當這一頁載入時，立刻通知外層
      sendMessage({ sceneId: 13});
    }, [sendMessage]);

    useEffect(()=>{
      if(bgmAudio) bgmAudio.pause()
      const audioPlayer=new Audio(cfg.sounds.gameSuccess || './sounds/gameSuccess.mp3')
      audioPlayer.volume=0.316;
      audioPlayer.play().catch((e)=>console.log('Audio Failed',e))
    },[])

  return (
    <div className="page-container" style={pageStyle}>
      <div className={GameSuccessPageStyle.explanationSection}>
          <div style={cfg.strings.wholeGameCompletedExplanation.style}>
            {cfg.strings.wholeGameCompletedExplanation.text}
          </div>
          {/* <div className={GameSuccessPageStyle.explanationText}>{cfg.strings.wholeGameCompletedExplanation || "Congratulations! Thanks to your efforts, the team is safe, and the ancient temple has been discovered!"}</div> */}
          <img src='./images/object/jungle_escape_clue_frame.png' style={{transform:'scale(1.3,1)'}} alt="jungle_escape_clue_frame" loading="lazy" decoding="async"/>
          <div className={GameSuccessPageStyle.returnButton}>
            <img
              onMouseEnter={() => setButtonScale(1.1)}
              onMouseLeave={() => setButtonScale(1)}
              style={{transform: `scale(${buttonScale})`}}
              src='./images/object/jungle_escape_home_button.png' alt="jungle_escape_clue_frame" 
              onClick={()=>handleClickAnimation()} loading="lazy" decoding="async"/>
          </div>
      </div>
      {pageAssets.map((asset, index) => (
          <div key={asset.id || index} style={asset.style}>
          {asset.text}
          </div>
      ))}
    </div>
  )
}
