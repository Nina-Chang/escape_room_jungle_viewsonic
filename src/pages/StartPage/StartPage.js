import StartPageStyle from "./StartPage.module.css"
import useSendGameMessage from "../../hooks/useSendGameMessage"
import useClickAnimation from '../../hooks/useClickAnimation'
import { useEffect } from "react";

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const StartPage = ({navigateTo,backgroundImage,onStartGame}) => {
  const { buttonScale,setButtonScale, handleClickAnimation } = useClickAnimation(onStartGame);
  const { sendMessage }=useSendGameMessage()

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

  // 找出 sceneId 為 1 的所有 Assets
  const pageAssets = cfg.assets?.filter(asset => asset.sceneId === 1) || [];

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
    <div className='page-container' style={pageStyle}>
      <div style={cfg.strings.startTitle.style}>
        {cfg.strings.startTitle.text}
      </div>
      <div style={cfg.strings.startSubtitle.style}>
        {cfg.strings.startSubtitle.text}
      </div>
      {/* <h1 className={StartPageStyle.title}>{cfg.strings.startTitle || 'Into the Jungle'}</h1> */}
      {/* <h3 className={StartPageStyle.subTitle}>{cfg.strings.startSubtitle || 'The Missing Expedition'}</h3> */}
      <button className={StartPageStyle.imageButton} 
        onMouseEnter={() => setButtonScale(1.1)}
        onMouseLeave={() => setButtonScale(1)}
        style={{transform: `translate(-50%, -50%) scale(${buttonScale})`}}
        onClick={handleClickAnimation}>
        <img src='./images/object/jungle_escape_start_button.png' alt="Start Button" loading="lazy" decoding="async" />
        <span className={StartPageStyle.btnText}>Start</span>
      </button>
      {pageAssets.map((asset, index) => (
        <div key={index} style={getAssetStyle(asset)}>
          {asset.text}
        </div>
      ))}
    </div>
  )
}
