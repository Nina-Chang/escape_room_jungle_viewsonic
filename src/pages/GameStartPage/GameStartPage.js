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
            {/* <div dangerouslySetInnerHTML={{__html:cfg.strings.startGameExplanationText || `[Headquarters]: That's the last we heard. The missing team needs your help. To rescue them,you'll have to solve challenging puzzles and collect vital clues hidden deep within the jungle. Time is running out. Good luck, adventurer.`}} className={GameStartPageStyle.explanationText}>
            </div> */}
            {cfg.strings.startGameExplanationText.map((content, index) => (
                <div key={index} style={content.style}>
                    {content.text}
                </div>
            ))}
        </div>
        <button className={GameStartPageStyle.imageButton} 
         onMouseEnter={() => setButtonScale(1.1)}
         onMouseLeave={() => setButtonScale(1)}
         style={{transform: `translate(-50%, -50%) scale(${buttonScale})`}}
         onClick={handleClickAnimation}>
            <img src='./images/object/jungle_escape_mission_button.png' alt="Continue" loading="lazy" decoding="async"/>
            <div className={GameStartPageStyle.btnText}>Start Mission</div>
        </button>
        {pageAssets.map((asset, index) => (
            <div key={asset.id || index} style={asset.style}>
            {asset.text}
            </div>
        ))}
    </div>
  )
}
