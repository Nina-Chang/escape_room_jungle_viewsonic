import StartPageStyle from "./StartPage.module.css"
import useSendGameMessage from "../../hooks/useSendGameMessage"
import useClickAnimation from '../../hooks/useClickAnimation'
import usePageAssets from '../../hooks/usePageAssets'
import { useEffect } from "react";

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const StartPage = ({navigateTo,backgroundImage,onStartGame}) => {
  const { buttonScale,setButtonScale, handleClickAnimation } = useClickAnimation(onStartGame);
  const { sendMessage }=useSendGameMessage()
  const pageAssets = usePageAssets(cfg.assets, 1);

  const pageStyle = { 
    backgroundImage: `url(${backgroundImage})`,
    width:'1920px',
    height:'1080px',
    loading:'eager'
  };

  useEffect(() => {
    // 當這一頁載入時，立刻通知外層：我現在是第 1 號場景
    sendMessage({ sceneId: 1});
  }, [sendMessage]);

  return (
    <div className='page-container' style={pageStyle}>
      <div className={StartPageStyle.title} style={cfg.strings.startTitle.style}>
        {cfg.strings.startTitle.text}
      </div>
      <div className={StartPageStyle.subTitle} style={cfg.strings.startSubtitle.style}>
        {cfg.strings.startSubtitle.text}
      </div>
      <button className={StartPageStyle.imageButton} 
        onMouseEnter={() => setButtonScale(1.1)}
        onMouseLeave={() => setButtonScale(1)}
        style={{transform: `translate(-50%, -50%) scale(${buttonScale})`}}
        onClick={handleClickAnimation}>
        <img src='./images/object/jungle_escape_start_button.png' alt="Start Button" loading="lazy" decoding="async" />
        <span className={StartPageStyle.btnText}>Start</span>
      </button>
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
