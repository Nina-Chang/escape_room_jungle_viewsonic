import StoryProloguePageStyle from './StoryProloguePage.module.css'
import useClickAnimation from '../../hooks/useClickAnimation';
import useSendGameMessage from "../../hooks/useSendGameMessage"
import usePageAssets from "../../hooks/usePageAssets"
import { useEffect,useState } from 'react';

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const StoryProloguePage = ({ navigateTo, backgroundImage }) => {
  const { sendMessage }=useSendGameMessage()
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const { buttonScale,setButtonScale, handleClickAnimation }=useClickAnimation(()=>navigateTo('gameStart'))
  const pageAssets = usePageAssets(cfg.assets, 2);

  useEffect(() => {
    // 當這一頁載入時，立刻通知外層
    sendMessage({ sceneId: 2});
  }, [sendMessage]);

  useEffect(()=>{
    const handleEnded = () => setButtonDisabled(false);
    const audioPlayer=new Audio(cfg.sounds.signalInterference || './sounds/signal_interference.mp3')
    audioPlayer.volume=0.316;
    audioPlayer.play().catch((e)=>console.log('Audio Failed',e))
    audioPlayer.addEventListener('ended',handleEnded)

    return () => {
      audioPlayer.removeEventListener('ended',handleEnded);
      audioPlayer.pause();
      audioPlayer.src = ""; // 釋放記憶體
    };
  },[])
  
  const pageStyle = { 
    backgroundImage: `url(${backgroundImage})`,
    width:'1920px',
    height:'1080px',
    loading:'eager'
  };

  return (
    <div className="page-container" style={pageStyle}>
        <span className={StoryProloguePageStyle.signalText}>Weak signal...</span>
        <div className={StoryProloguePageStyle.coordinatesText}>3°28'26.6"S<br/>62°12'12.7"W</div>
        <button className={`${StoryProloguePageStyle.imageButton} ${buttonDisabled&&StoryProloguePageStyle.buttonDisabled}`} 
          disabled={buttonDisabled}
          onMouseEnter={() => setButtonScale(1.1)}
          onMouseLeave={() => setButtonScale(1)}
          style={{transform: `translate(-50%, -50%) scale(${buttonScale})`}}
          onClick={handleClickAnimation}>
            <img src='./images/object/jungle_escape_nect_button.png' alt="Continue" loading="lazy" decoding="async"/>
        </button>
        <div className={StoryProloguePageStyle.conversationText} style={cfg.strings.previousStoryConversation.style}>
          {cfg.strings.previousStoryConversation.text}
        </div>
        {/* <div className={StoryProloguePageStyle.conversationText}>
            {cfg.strings.previousStoryConversation || "[Team Member]:Hello? Can anyone hear me? We're lost...battery dying!"}
        </div> */}
        {pageAssets.map((asset) => (
          <div key={asset.RawId || asset.id} style={asset.style}>
              {asset.Type === 'Text' ? 
              (
                  asset.displayContent
              ) 
              : (
                  <img 
                      src={asset.displayContent} 
                      alt="game-asset" 
                      style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'contain',
                          display: 'block' 
                      }} 
                  />
              )}
          </div>
        ))}
    </div>
  )
}
