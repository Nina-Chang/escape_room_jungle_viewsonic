import WrongPathPageStyle from './WrongPathPage.module.css'
import useClickAnimation from '../../hooks/useClickAnimation';
import useSendGameMessage from '../../hooks/useSendGameMessage';
import { useEffect } from 'react';

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const WrongPathPage = ({ navigateTo, backgroundImage,backTo,setCurrentProblemIndex }) => {
    const reset=()=>{
      navigateTo(backTo.page)
      setCurrentProblemIndex(backTo.problemIndex)
    }
    const { buttonScale,setButtonScale, handleClickAnimation }=useClickAnimation(reset)
    const { sendMessage }=useSendGameMessage()

    useEffect(() => {
      // 當這一頁載入時，立刻通知外層
      sendMessage({ sceneId: 5});
    }, [sendMessage]);

    const pageStyle = { 
      backgroundImage: `url(${backgroundImage})`,
      width:'1920px',
      height:'1080px',
      loading:'eager'
    };

    // 找出 sceneId 為 5 的所有 Assets
    const pageAssets = cfg.assets?.filter(asset => asset.sceneId === 5) || [];

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
        <div className={WrongPathPageStyle.titleText}>
            You've lost your way in the jungle...
        </div>
        <button className={WrongPathPageStyle.imageButton} 
         onMouseEnter={() => setButtonScale(1.1)}
         onMouseLeave={() => setButtonScale(1)}
         style={{transform: `translateX(-50%) scale(${buttonScale})`}}
         onClick={handleClickAnimation}>
            <img src='./images/object/jungle_escape_again_button.png' alt="Return to Map"  loading="lazy" decoding="async"/>
        </button>
        {pageAssets.map((asset, index) => (
          <div key={index} style={getAssetStyle(asset)}>
            {asset.text}
          </div>
        ))}
    </div>
  )
}
