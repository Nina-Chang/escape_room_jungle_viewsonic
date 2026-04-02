import GameStartPageStyle from './GameStartPage.module.css'
import useClickAnimation from '../../hooks/useClickAnimation';
import useSendGameMessage from '../../hooks/useSendGameMessage';
import usePageAssets from '../../hooks/usePageAssets';
import { useEffect } from 'react';

const cfg = (typeof window !== 'undefined' && window.gameConfig) ? window.gameConfig : {};

export const GameStartPage = ({ navigateTo, backgroundImage }) => {
    const { sendMessage }=useSendGameMessage()
    const { buttonScale,setButtonScale, handleClickAnimation }=useClickAnimation(()=>navigateTo('map'))
    const pageAssets = usePageAssets(cfg.assets, 3);

    useEffect(() => {
        // 當這一頁載入時，立刻通知外層
        sendMessage({ sceneId: 3});
    }, [sendMessage]);
    
    const pageStyle = { 
        backgroundImage: `url(${backgroundImage})`,
        width:'1920px',
        height:'1080px',
        loading:'eager'
    };
    
  return (
    <div className="page-container" style={pageStyle}>
        <div className={GameStartPageStyle.explanationSection}>
            <div className={GameStartPageStyle.avatarsSection}>
                <img className={GameStartPageStyle.avatarsIcon} src='./images/object/jungle_escape_avatars_icon.png' alt="jungle_escape_team_avatars" loading="lazy" decoding="async"/>
            </div>
            <div 
                className={GameStartPageStyle.explanationText} 
                style={cfg.strings.startGameExplanationText.style} 
                dangerouslySetInnerHTML={{
                    __html: (cfg.strings.startGameExplanationText.text || '').replace(/\r\n/g, '<br />')
                }}
                >
            </div>
        </div>
        <button className={GameStartPageStyle.imageButton} 
         onMouseEnter={() => setButtonScale(1.1)}
         onMouseLeave={() => setButtonScale(1)}
         style={{transform: `translate(-50%, -50%) scale(${buttonScale})`}}
         onClick={handleClickAnimation}>
            <img src='./images/object/jungle_escape_mission_button.png' alt="Continue" loading="lazy" decoding="async"/>
            <div className={GameStartPageStyle.btnText}>Start Mission</div>
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
