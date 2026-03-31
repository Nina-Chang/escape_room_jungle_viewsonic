import StoryProloguePageStyle from './StoryProloguePage.module.css'
import useClickAnimation from '../../hooks/useClickAnimation';
import useSendGameMessage from "../../hooks/useSendGameMessage"
import { useEffect,useState } from 'react';

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const StoryProloguePage = ({ navigateTo, backgroundImage }) => {
  const { sendMessage }=useSendGameMessage()
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const { buttonScale,setButtonScale, handleClickAnimation }=useClickAnimation(()=>navigateTo('gameStart'))

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

  // 找出 sceneId 為 2 的所有 Assets
  const pageAssets = cfg.assets?.filter(asset => asset.sceneId === 2) || [];

  // 建立一個產生 Style 的 function
  const getAssetStyle = (asset) => ({
    position: 'absolute',
    left: asset.position.x,
    top: asset.position.y,
    width:asset.textWidth,
    height:asset.textHeight,
    fontFamily: asset.fontFamily,
    textAlign:asset.textAlign,
    fontSize:asset.fontSize,
    color: asset.color,
    fontWeight: asset.fontWeight,
    fontStyle: asset.fontStyle,
    textDecoration: asset.textDecoration,
    pointerEvents: 'none', // 如果只是裝飾文字，防止擋住按鈕點擊
    zIndex:"99"
  });

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
        <div style={cfg.strings.previousStoryConversation.style}>
          {cfg.strings.previousStoryConversation.text}
        </div>
        {/* <div className={StoryProloguePageStyle.conversationText}>
            {cfg.strings.previousStoryConversation || "[Team Member]:Hello? Can anyone hear me? We're lost...battery dying!"}
        </div> */}
        {pageAssets.map((asset, index) => (
          <div key={index} style={getAssetStyle(asset)}>
            {asset.text}
          </div>
        ))}
    </div>
  )
}
